// app/api/workflows/duplicate/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import {
	duplicateWorkflowSchema,
	duplicateWorkflowSchemaType,
} from "@/schema/workflow";

import { WorkflowStatus } from "@/types/workflow";

export async function POST(req: Request) {
	try {
		const body: duplicateWorkflowSchemaType = await req.json();

		// validate input
		const { success, data } = duplicateWorkflowSchema.safeParse(body);
		if (!success) {
			return NextResponse.json(
				{ error: "invalid form data" },
				{ status: 400 }
			);
		}

		const { userId } = auth();
		if (!userId) {
			return NextResponse.json(
				{ error: "unauthenticated" },
				{ status: 401 }
			);
		}

		// find original workflow
		const sourceWorkflow = await prisma.workflow.findUnique({
			where: {
				id: data.workflowId,
				userId,
			},
		});

		if (!sourceWorkflow) {
			return NextResponse.json(
				{ error: "workflow not found" },
				{ status: 404 }
			);
		}

		// create the duplicate workflow
		const result = await prisma.workflow.create({
			data: {
				userId,
				name: data.name,
				description: data.description,
				status: WorkflowStatus.DRAFT,
				definition: sourceWorkflow.definition,
			},
		});

		if (!result) {
			return NextResponse.json(
				{ error: "failed to duplicate workflow" },
				{ status: 500 }
			);
		}

		// return duplicated workflow
		return NextResponse.json(result, { status: 201 });
	} catch (error: any) {
		console.error("POST /api/workflows/duplicate error:", error);
		return NextResponse.json(
			{ error: "Failed to duplicate workflow" },
			{ status: 500 }
		);
	}
}
