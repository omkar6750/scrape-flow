import { TaskType } from "@/types/task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { WorkflowTask } from "@/types/workflow";
import { ExecutionEnviroment } from "@/types/executor";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { FillInputExecutor } from "./FillInputExecutor";
import { ClickElementExecutor } from "./ClickElementExecutor";
import { WaitForExecutor } from "./WaitForElementExecutor";
import { DeliverViaWebhookExecutor } from "./DeliverViaWebhookExecutor";
import { ExtractDataWithAiExecutor } from "./ExtractDataWithAiExecutor";
import { ReadPropertyFromJsonExecutor } from "./ReadPropertyFromJson";
import { PressKeyTask } from "../task/PressKey";
import { PressKeyExecutor } from "./PressKeyExecutor";
import { AddPropertyToJsonExecutor } from "./AddPropertyToJsonExecutor";

type ExecutorFn<T extends WorkflowTask> = (
	enviroment: ExecutionEnviroment<T>
) => Promise<boolean>;

type RegistryType = {
	[K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};
export const ExecutorRegistry: RegistryType = {
	LAUNCH_BROWSER: LaunchBrowserExecutor,
	PAGE_TO_HTML: PageToHtmlExecutor,
	EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
	FILL_INPUT: FillInputExecutor,
	CLICK_ELEMENT: ClickElementExecutor,
	WAIT_FOR_ELEMENT: WaitForExecutor,
	DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
	EXTRACT_DATA_WITH_AI: ExtractDataWithAiExecutor,
	READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonExecutor,
	PRESS_KEY: PressKeyExecutor,
	ADD_PROPERTY_TO_JSON: AddPropertyToJsonExecutor,
};
