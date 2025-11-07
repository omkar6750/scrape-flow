import { ExecutionEnviroment } from "@/types/executor";
import { ClickElementTask } from "../task/ClickElement";
import { DeliverViaWebhookTask } from "../task/DeliverViaWebhook";

export async function DeliverViaWebhookExecutor(
	enviroment: ExecutionEnviroment<typeof DeliverViaWebhookTask>
): Promise<boolean> {
	try {
		const targetUrl = enviroment.getInput("Target Url");
		if (!targetUrl) {
			enviroment.log.error("input-> targetUrl not defined");
		}

		const body = enviroment.getInput("Body");
		if (!body) {
			enviroment.log.error("input-> body not defined");
		}

		const response = await fetch(targetUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		const statusCode = response.status;
		if (statusCode !== 200) {
			enviroment.log.error(`statuscode: ${statusCode}`);
			return false;
		}
		const responseBody = await response.json();
		enviroment.log.info(JSON.stringify(responseBody, null, 4));
		return true;
	} catch (error: any) {
		enviroment.log.error(error.message);
		return false;
	}
}
