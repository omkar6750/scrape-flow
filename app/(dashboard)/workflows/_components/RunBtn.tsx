"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function RunBtn({ workflowId }: { workflowId: string }) {
	const mutation = useMutation({
		mutationFn: async (values: { workflowId: string }) => {
			const res = await fetch("/api/workflows/run", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			if (!res.ok) throw new Error("Failed to run workflow");

			return await res.json();
		},

		onSuccess: (data) => {
			toast.success("workflow started", { id: workflowId });
			if (data.redirectUrl) {
				window.location.href = data.redirectUrl;
			}
		},

		onError: () => {
			toast.error("Something went wrong", { id: workflowId });
		},
	});

	return (
		<Button
			variant={"outline"}
			size={"sm"}
			className="flex items-center gap-2"
			disabled={mutation.isPending}
			onClick={() => {
				toast.loading("scheduling run...", { id: workflowId });
				mutation.mutate({
					workflowId,
				});
			}}
		>
			<PlayIcon size={16} />
			Run
		</Button>
	);
}
