import { waitFor } from "@/lib/helper/waitFor";
import { Enviroment, ExecutionEnviroment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
	enviroment: ExecutionEnviroment<typeof LaunchBrowserTask>
): Promise<boolean> {
	try {
		const websiteUrl = enviroment.getInput("Website Url");
		console.log("websiteUrl", websiteUrl);
		const browser = await puppeteer.launch({
			headless: false, //testing
		});
		enviroment.log.info("Browser started Successfully");

		enviroment.setBrowser(browser);
		const page = await browser.newPage();
		await page.goto(websiteUrl);
		enviroment.setPage(page);
		enviroment.log.info(`Opened page at : ${websiteUrl}`);
		return true;
	} catch (error: any) {
		enviroment.log.error(error.message);
		return false;
	}
}
