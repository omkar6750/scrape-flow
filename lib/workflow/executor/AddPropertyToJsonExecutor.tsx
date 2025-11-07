import { ExecutionEnviroment } from "@/types/executor";
import { AddPropertyToJsonTask } from "../task/AddPropertyToJson";

export async function AddPropertyToJsonExecutor(
	enviroment: ExecutionEnviroment<typeof AddPropertyToJsonTask>
): Promise<boolean> {
	try {
		const jsonData = enviroment.getInput("JSON");
		if (!jsonData) {
			enviroment.log.error("input-> json data not defined");
		}

		const propertyName = enviroment.getInput("Property name");
		if (!propertyName) {
			enviroment.log.error("input-> propert name not defined");
		}

		const propertyValue = enviroment.getInput("Property value");
		if (!propertyValue) {
			enviroment.log.error("input-> propert value 	not defined");
		}
		const json = JSON.parse(jsonData);

		json[propertyName] = propertyValue;

		enviroment.setOutput("Updated JSON", JSON.stringify(json));

		return true;
	} catch (error: any) {
		enviroment.log.error(error.message);
		return false;
	}
}
