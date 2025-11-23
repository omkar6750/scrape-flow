"use client";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
	createWorkflowSchema,
	createWorkflowSchemaType,
} from "@/schema/workflow";
import { Layers2Icon, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreateWorkflowDialog({ triggerText }: { triggerText?: String }) {
	const queryClient = useQueryClient();

	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useForm<createWorkflowSchemaType>({
		resolver: zodResolver(createWorkflowSchema),
		defaultValues: {},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: createWorkflowSchemaType) => {
			const res = await fetch("/api/workflows", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			if (!res.ok) throw new Error("Failed to create workflow");

			const result = await res.json(); // SAME shape as before
			return result;
		},

		onSuccess: (result) => {
			toast.success("Workflow Created", { id: "create-workflow" });
			router.push(`/workflow/editor/${result.id}`); // unchanged
			queryClient.invalidateQueries({
				queryKey: ["workflows"],
			});
		},

		onError: (e) => {
			console.error(e);
			toast.error("Failed to create workflow", { id: "create-workflow" });
		},
	});

	const onSubmit = useCallback(
		(values: createWorkflowSchemaType) => {
			toast.loading("creating workflow...", { id: "create-workflow" });
			mutate(values);
		},
		[mutate]
	);

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				form.reset();
				setOpen(open);
			}}
		>
			<DialogTrigger asChild>
				<Button>{triggerText ?? "Create workflow"}</Button>
			</DialogTrigger>
			<DialogContent>
				<CustomDialogHeader
					icon={Layers2Icon}
					title="Create Workflow"
					subTitle="Start building your workflow"
				/>
				<div
					className="p-6
                "
				>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8 w-full"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="">
											Name
											<p className="text-xs text-primary">
												(required)
											</p>
										</FormLabel>
										<FormControl>
											<Input {...field}></Input>
										</FormControl>
										<FormDescription>
											Choose a descriptive and unique name
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex gap-1 items-center">
											Description
											<p className="text-xs text-muted-foreground ">
												(optional)
											</p>
										</FormLabel>
										<FormControl>
											<Textarea
												className="resize-none"
												{...field}
											></Textarea>
										</FormControl>
										<FormDescription>
											Provide a brief description of what
											your workflow does. <br />
											This is optional but can help you
											remember the workflow&apos;s purpose
										</FormDescription>
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								disabled={isPending}
								className="w-full"
							>
								{!isPending && "Proceed"}
								{isPending && (
									<Loader2 className="animate-spin" />
								)}
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default CreateWorkflowDialog;
