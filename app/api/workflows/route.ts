// app/api/workflows/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import {
	createWorkflowSchema,
	createWorkflowSchemaType,
} from "@/schema/workflow";

import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { AppNode } from "@/types/appNode";
import { Edge } from "@xyflow/react";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";

// ─────────────────────────────────────────────
// POST /api/workflows  → CreateWorkflow
// expects: createWorkflowSchemaType
// returns: workflow result (same as before)
// ─────────────────────────────────────────────
export async function POST(req: Request) {
	try {
		const body: createWorkflowSchemaType = await req.json();

		// zod validation (unchanged)
		const { success, data } = createWorkflowSchema.safeParse(body);
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

		// Build initialFlow (exact same logic)
		const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
			nodes: [],
			edges: [],
		};

		initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

		// Prisma create
		const result = await prisma.workflow.create({
			data: {
				userId,
				status: WorkflowStatus.DRAFT,
				definition: JSON.stringify(initialFlow),
				...data,
			},
		});

		if (!result) {
			return NextResponse.json(
				{ error: "failed to create workflow" },
				{ status: 500 }
			);
		}

		return NextResponse.json(result, { status: 201 });
		// ⬆️ IMPORTANT: returning `result` directly so client receives { id, name, ... }
	} catch (error: any) {
		console.error("Error creating workflow:", error);
		return NextResponse.json(
			{ error: "Failed to create workflow" },
			{ status: 500 }
		);
	}
}

// DELETE /api/workflows  → DeleteWorkflow
// expects: { id: string }
export async function DELETE(req: Request) {
	try {
		const { userId } = auth();
		if (!userId) {
			return NextResponse.json(
				{ error: "unauthenticated" },
				{ status: 401 }
			);
		}

		const { id } = await req.json(); // id MUST match your old server action argument

		await prisma.workflow.delete({
			where: { id, userId },
		});

		// In route handlers we CANNOT call revalidatePath
		// Instead, client can manually refetch via React Query
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		console.error("DELETE /api/workflows error:", error);
		return NextResponse.json(
			{ error: "Failed to delete workflow" },
			{ status: 500 }
		);
	}
}
