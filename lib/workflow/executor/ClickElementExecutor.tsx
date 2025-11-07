import { ExecutionEnviroment } from "@/types/executor";
import { ClickElementTask } from "../task/ClickElement";

export async function ClickElementExecutor(
	enviroment: ExecutionEnviroment<typeof ClickElementTask>
): Promise<boolean> {
	try {
		const selector = enviroment.getInput("Selector");
		if (!selector) {
			enviroment.log.error("input-> selector not defined");
		}
		const page = enviroment.getPage()!;
		await Promise.all([
			page.waitForNavigation({ waitUntil: "networkidle2" }), // Wait for the new page to load
			page.click(selector), // Trigger the click
		]);

		return true;
	} catch (error: any) {
		enviroment.log.error(error.message);
		return false;
	}
}
