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
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ro } from "date-fns/locale";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
	name: string;
}

function DeleteCredentialDialog({ name }: Props) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [open, setOpen] = useState(false);
	const [confirmText, setConfirmText] = useState("");

	const deleteMutation = useMutation({
		mutationFn: async (name: string) => {
			const res = await fetch("/api/credentials/delete", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name }),
			});

			if (!res.ok) {
				throw new Error("Failed to delete credential");
			}

			return await res.json();
		},

		onSuccess: () => {
			toast.success("Credential deleted successfully", { id: name });
			queryClient.invalidateQueries({
				queryKey: ["credentials-for-user"],
			});
			router.refresh();
		},
		onError: () => {
			toast.error("Something went wrong");
		},
	});
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant={"destructive"} size={"icon"}>
					<XIcon />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure</AlertDialogTitle>
					<AlertDialogDescription>
						If you delete this credential, you will not be abe to
						recover it
						<div className="flex flex-col py-4 gap-2">
							<p>
								If you are sure, enter <b>{name} </b> to confirm
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
							confirmText !== name || deleteMutation.isPending
						}
						onClick={() => {
							toast.loading("Deleting credential...", {
								id: name,
							});
							deleteMutation.mutate(name);
						}}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteCredentialDialog;
