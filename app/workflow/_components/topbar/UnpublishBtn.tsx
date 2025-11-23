"use client";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useReactFlow } from "@xyflow/react";
import { DownloadIcon, PlayIcon, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function UnpublishBtn({ workflowId }: { workflowId: string }) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const generate = useExecutionPlan();

	// const { toObject } = useReactFlow();
	const mutation = useMutation({
		mutationFn: async (workflowId: string) => {
			const res = await fetch("/api/workflows/unpublish", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: workflowId }),
			});

			if (!res.ok) {
				throw new Error("Failed to unpublish workflow");
			}

			return await res.json();
		},

		onSuccess: () => {
			toast.success("Workflow unpublished", { id: workflowId });
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
					toast.loading("Unpublishing workflow...", {
						id: workflowId,
					});
					mutation.mutate(workflowId);
				}}
			>
				<DownloadIcon size={16} className="stroke-orange-500 " />
				Unpublish
			</Button>
		</div>
	);
}
