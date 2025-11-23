"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function SaveBtn({ workflowId }: { workflowId: string }) {
	const { toObject } = useReactFlow();
	const saveMutation = useMutation({
		mutationFn: async (values: { id: string; definition: string }) => {
			const res = await fetch("/api/workflows/update", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			if (!res.ok) {
				throw new Error("Failed to update workflow");
			}

			return await res.json();
		},
		onSuccess: () => {
			toast.success("Flow saved successfully");
		},
		onError: () => {
			toast.error(" Something went wrong ", { id: "save-workflow" });
		},
	});
	return (
		<Button
			variant={"outline"}
			className="flex items-center gap-2 "
			onClick={() => {
				const workflowDefinition = JSON.stringify(toObject());
				if (saveMutation.isPending)
					toast.loading("saving workflow...", {
						id: "save-workflow",
					});
				saveMutation.mutate({
					id: workflowId,
					definition: workflowDefinition,
				});
			}}
		>
			<CheckIcon size={16} className="stroke-green-400" />
			Save
		</Button>
	);
}

export default SaveBtn;
