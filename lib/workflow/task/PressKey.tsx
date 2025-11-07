import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { Keyboard, LucideProps, MousePointer, TextIcon } from "lucide-react";

export const PressKeyTask = {
	type: TaskType.PRESS_KEY,
	label: "Press Key",
	icon: (props: LucideProps) => (
		<Keyboard className="stroke-orange-400 " {...props} />
	),
	isEntryPoint: false,
	credits: 1,
	inputs: [
		{
			name: "Web Page",
			type: TaskParamType.BROWSER_INSTANCE,
			required: true,
		},
		{
			name: "Key",
			type: TaskParamType.STRING,
			required: true,
		},
	] as const,
	outputs: [
		{
			name: "Web Page",
			type: TaskParamType.BROWSER_INSTANCE,
		},
	] as const,
} satisfies WorkflowTask;
