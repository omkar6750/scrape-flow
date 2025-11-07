import { ExecutionEnviroment } from "@/types/executor";
import { PressKeyTask } from "../task/PressKey";

function normalizeKeyName(key: string): string {
	const lowerKey = key.toLowerCase(); // <-- Always convert to lowercase for comparison

	switch (lowerKey) {
		case "enter":
			return "Enter";
		case "tab":
			return "Tab";
		case "escape":
			return "Escape";
		case "backspace":
			return "Backspace";
		case "arrowup":
			return "ArrowUp";
		case "arrowdown":
			return "ArrowDown";
		case "arrowleft":
			return "ArrowLeft";
		case "arrowright":
			return "ArrowRight";
		// For single characters, the original case is fine
		default:
			return key;
	}
}

export async function PressKeyExecutor(
	// This would be your new task type
	enviroment: ExecutionEnviroment<typeof PressKeyTask>
): Promise<boolean> {
	try {
		const rawKey = enviroment.getInput("Key");
		const normalizedKey = normalizeKeyName(rawKey);
		if (!normalizedKey) {
			enviroment.log.error("input-> key not defined");
			return false;
		}

		const page = enviroment.getPage()!;

		// Only wait for navigation on 'Enter'
		if (normalizedKey === "Enter") {
			await Promise.all([
				page.waitForNavigation({ waitUntil: "networkidle2" }),
				page.keyboard.press("Enter"),
			]);
		} else {
			// For other keys like 'Tab', just press them
			await page.keyboard.press(normalizedKey as any);
		}

		enviroment.log.info(`Pressed key: ${normalizedKey}`);
		return true;
	} catch (error: any) {
		enviroment.log.error(error.message);
		return false;
	}
}
