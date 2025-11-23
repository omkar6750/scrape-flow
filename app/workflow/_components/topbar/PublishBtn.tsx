"use client";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function PublishBtn({ workflowId }: { workflowId: string }) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const generate = useExecutionPlan();

	const { toObject } = useReactFlow();
	const mutation = useMutation({
		mutationFn: async (values: { id: string; flowDefinition: string }) => {
			const res = await fetch("/api/workflows/publish", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			if (!res.ok) {
				throw new Error("Failed to publish workflow");
			}

			return await res.json();
		},

		onSuccess: () => {
			toast.success("Workflow Published", { id: workflowId });
			queryClient.invalidateQueries({
				queryKey: ["workflow", workflowId],
			});
			queryClient.invalidateQueries({ queryKey: ["workflows"] });
			router.refresh();
		},

		onError: () => {
			toast.error("something went wrong", { id: "flow-execution" });
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
					toast.loading("Publishing workflow...", {
						id: workflowId,
					});
					mutation.mutate({
						id: workflowId,
						flowDefinition: JSON.stringify(toObject()),
					});
				}}
			>
				<UploadIcon size={16} className="stroke-green-500 " />
				Publish
			</Button>
		</div>
	);
}
