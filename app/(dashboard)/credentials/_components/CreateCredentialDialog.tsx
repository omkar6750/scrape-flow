"use client";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Loader2, ShieldEllipsis } from "lucide-react";
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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	createCredentialSchema,
	createCredentialSchemaType,
} from "@/schema/credential";
import { createCredential } from "@/actions/credentials/createCredential";

function CreateCredentialDialog({ triggerText }: { triggerText?: String }) {
	const [open, setOpen] = useState(false);

	const form = useForm<createCredentialSchemaType>({
		resolver: zodResolver(createCredentialSchema),
		defaultValues: {},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: createCredential,
		onSuccess: () => {
			toast.success("Credential created", { id: "create-credential" });
			setOpen(false);
			form.reset();
		},
		onError: () => {
			toast.error("Failed to create error", { id: "create-credential" });
		},
	});
	const onSubmit = useCallback(
		(values: createCredentialSchemaType) => {
			toast.loading("creating credential...", {
				id: "create-credential",
			});
			mutate(values);
		},
		[mutate]
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{triggerText ?? "Create credential"}</Button>
			</DialogTrigger>
			<DialogContent>
				<CustomDialogHeader
					icon={ShieldEllipsis}
					title="Create credential"
					subTitle="Start building your credential"
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
											Enter a unique and descriptive name
											for credential <br />
											This name will be used to identify
											the credential
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="value"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex gap-1 items-center">
											Value
											<p className="text-xs text-primary ">
												(required)
											</p>
										</FormLabel>
										<FormControl>
											<Textarea
												className="resize-none"
												{...field}
											></Textarea>
										</FormControl>
										<FormDescription>
											Enter the value associated with this
											credential <br />
											This value will be securely
											encrypted and stored
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

export default CreateCredentialDialog;
