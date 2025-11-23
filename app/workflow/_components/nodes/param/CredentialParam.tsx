"use client";

import { ParamProps } from "@/types/appNode";
import React, { useId } from "react";

import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

function CredentialParam({
	param,
	value,
	updateNodeParamValue,
	disabled,
}: ParamProps) {
	const id = useId();
	const query = useQuery({
		queryKey: ["credentials-for-user"],
		queryFn: async () => {
			const res = await fetch("/api/credentials/list");
			const data = await res.json();

			return data.map((cred: any) => ({
				...cred,
				createdAt: new Date(cred.createdAt),
			}));
		},

		refetchInterval: 10000,
	});
	return (
		<div className="flex flex-col gap-1 w-full">
			<Label htmlFor={id} className="text-muted-foreground text-xs flex ">
				{param.name}
				{param.required && <p className="text-red-400 px-2">*</p>}
			</Label>
			<Select
				onValueChange={(value) => updateNodeParamValue(value)}
				defaultValue={value}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select an option" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Credentials</SelectLabel>
						{query.data?.map((credential: any) => (
							<SelectItem
								value={credential.id}
								key={credential.id}
							>
								{credential.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}

export default CredentialParam;
