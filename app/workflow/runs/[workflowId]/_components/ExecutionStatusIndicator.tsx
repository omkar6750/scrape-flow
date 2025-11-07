import type { FC } from "react";

import { WorkflowExecutionStatus } from "@/types/workflow";

import { cn } from "@/lib/utils";

type Props = { status: string };

const indicatorColors: Record<WorkflowExecutionStatus, string> = {
	[WorkflowExecutionStatus.PENDING]: "bg-slate-500",
	[WorkflowExecutionStatus.RUNNING]: "bg-yellow-500",
	[WorkflowExecutionStatus.COMPLETED]: "bg-emerald-500",
	[WorkflowExecutionStatus.FAILED]: "bg-red-500",
};
export default function ExecutionStatusIndicator({
	status,
}: {
	status: WorkflowExecutionStatus;
}) {
	return (
		<div
			className={cn(
				"h-2 w-2 rounded-full",
				indicatorColors[status as WorkflowExecutionStatus]
			)}
		/>
	);
}

const labelColors: Record<WorkflowExecutionStatus, string> = {
	[WorkflowExecutionStatus.PENDING]: "text-slate-500",
	[WorkflowExecutionStatus.RUNNING]: "text-yellow-500",
	[WorkflowExecutionStatus.COMPLETED]: "text-emerald-500",
	[WorkflowExecutionStatus.FAILED]: "text-red-500",
};
export function ExecutionStatusLabel({
	status,
}: {
	status: WorkflowExecutionStatus;
}) {
	return (
		<span className={cn("lowercase", labelColors[status])}>{status}</span>
	);
}
