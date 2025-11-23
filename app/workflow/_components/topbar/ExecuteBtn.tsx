"use client";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
	const generate = useExecutionPlan();

	const { toObject } = useReactFlow();
	const mutation = useMutation({
		mutationFn: async (values: {
			workflowId: string;
			flowDefinition: string;
		}) => {
			const res = await fetch("/api/workflows/run", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			if (!res.ok) throw new Error("Failed to run workflow");

			return await res.json();
		},

		onSuccess: (data) => {
			toast.success("Execution started", { id: "flow-execution" });
			if (data.redirectUrl) {
				window.location.href = data.redirectUrl;
			}
		},

		onError: () => {
			toast.error(" something went wrong", { id: "flow-execution" });
		},
	});

	return (
		<div>
			<Button
				variant={"outline"}
				className="flex items-center gap-2"
				disabled={mutation.isPending}
				onClick={() => {
					const plan = generate();
					if (!plan) {
						// client side validation!
						return;
					}
					mutation.mutate({
						workflowId: workflowId,
						flowDefinition: JSON.stringify(toObject()),
					});
				}}
			>
				<PlayIcon size={16} className="stroke-orange-400 " />
				Execute
			</Button>
		</div>
	);
}
