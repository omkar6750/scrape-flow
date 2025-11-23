"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
	open: boolean;
	setOpen: (open: boolean) => void;
	workflowName: string;
	workflowId: string;
}

function DeleteWorkflowDialog({
	open,
	setOpen,
	workflowName,
	workflowId,
}: Props) {
	const queryClient = useQueryClient();

	const [confirmText, setConfirmText] = useState("");

	const deleteMutation = useMutation({
		mutationFn: async (workflowId: string) => {
			const res = await fetch("/api/workflows", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: workflowId }),
			});

			if (!res.ok) {
				throw new Error("Failed to delete workflow");
			}

			return true;
		},

		onSuccess: () => {
			toast.success("Workflow deleted successfully", { id: workflowId });
			queryClient.invalidateQueries({ queryKey: ["workflows"] });
		},

		onError: () => {
			toast.error("Something went wrong");
		},
	});
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure</AlertDialogTitle>
					<AlertDialogDescription>
						If you delete this workflow you will not be abe to
						recover it
						<div className="flex flex-col py-4 gap-2">
							<p>
								If you are sure, enter <b>{workflowName} </b> to
								confirm
							</p>
							<Input
								value={confirmText}
								onChange={(e) => setConfirmText(e.target.value)}
							/>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setConfirmText("")}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						className="text-destructive-foreground hover:bg-destructive/90 bg-destructive"
						disabled={
							confirmText !== workflowName ||
							deleteMutation.isPending
						}
						onClick={() => {
							toast.loading("Deleting workflow...", {
								id: workflowId,
							});
							deleteMutation.mutate(workflowId);
						}}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteWorkflowDialog;
