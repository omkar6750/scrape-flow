"server only";
import { ExecutionEnviroment } from "@/types/executor";
import { ExtractDataWithAITask } from "../task/ExtractDataWithAI";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";

export async function ExtractDataWithAiExecutor(
	enviroment: ExecutionEnviroment<typeof ExtractDataWithAITask>
): Promise<boolean> {
	try {
		const content = enviroment.getInput("Content");
		if (!content) {
			enviroment.log.error("input-> content not defined");
		}
		const credentials = enviroment.getInput("Credentials");
		if (!credentials) {
			enviroment.log.error("input-> credentials not defined");
		}
		const prompt = enviroment.getInput("Prompt");
		if (!prompt) {
			enviroment.log.error("input-> prompt not defined");
		}

		//get credential from db
		const credential = await prisma.credential.findUnique({
			where: { id: credentials },
		});

		if (!credential) {
			enviroment.log.error("credentials not found");
			return false;
		}

		const plainCredentialValue = symmetricDecrypt(credential.value);
		if (!plainCredentialValue) {
			enviroment.log.error("cannot decrypt credential");
			return false;
		}

		const genAI = new GoogleGenerativeAI(plainCredentialValue);

		// 2. Configure the model
		const model = genAI.getGenerativeModel({
			model: "gemini-2.5-flash",
		});

		// 3. Set generation config to force JSON output
		const generationConfig: GenerationConfig = {
			responseMimeType: "application/json",
			temperature: 0.7, // Even lower temp for more predictable JSON
		};

		// 4. Construct the full prompt for Gemini
		const fullPrompt = `
            You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text,

            REQUEST:
            ${prompt}

            CONTENT:
            ${content}
        `;

		enviroment.log.info("Calling Gemini AI (gemini-2.5-flash)...");

		// 5. Call the AI
		const result = await model.generateContent({
			contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
			generationConfig: generationConfig, // Apply the JSON config here
		});

		const aiResponse = result.response.text();

		if (!aiResponse) {
			enviroment.log.error("AI did not return a valid response.");
			return false;
		}
		const usage = result.response.usageMetadata;
		if (usage) {
			enviroment.log.info(
				`Token Usage: ${usage.totalTokenCount} total tokens`
			);
			enviroment.log.info(`- Prompt Tokens: ${usage.promptTokenCount}`);
			enviroment.log.info(
				`- Response Tokens: ${usage.candidatesTokenCount}`
			);
		}

		// 6. Set the AI's JSON string as the output
		enviroment.setOutput("Extracted data", aiResponse);

		enviroment.log.info("Successfully extracted data with Gemini AI.");

		// TODO: make a single ai instance for all the calls in a workflow execution
		return true;
	} catch (error: any) {
		enviroment.log.error(error.message);
		return false;
	}
}
