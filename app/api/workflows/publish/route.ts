// app/api/workflows/publish/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { CalculateWorkflowCost } from "@/lib/workflow/helpers";
import { WorkflowStatus } from "@/types/workflow";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { id, flowDefinition } = body;

		const { userId } = auth();
		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthenticated" },
				{ status: 401 }
			);
		}

		// Find workflow
		const workflow = await prisma.workflow.findUnique({
			where: {
				id,
				userId,
			},
		});

		if (!workflow) {
			return NextResponse.json(
				{ error: "workflow not found" },
				{ status: 404 }
			);
		}

		if (workflow.status !== WorkflowStatus.DRAFT) {
			return NextResponse.json(
				{ error: "workflow is not a draft" },
				{ status: 400 }
			);
		}

		// Parse definition + generate execution plan
		const flow = JSON.parse(flowDefinition);
		const result = FlowToExecutionPlan(flow.nodes, flow.edges);

		if (result.error) {
			return NextResponse.json(
				{ error: "flow definition not valid" },
				{ status: 400 }
			);
		}

		if (!result.executionPlan) {
			return NextResponse.json(
				{ error: "no execution plan generated" },
				{ status: 400 }
			);
		}

		const creditsCost = CalculateWorkflowCost(flow.nodes);

		await prisma.workflow.update({
			where: { id, userId },
			data: {
				definition: flowDefinition,
				executionPlan: JSON.stringify(result.executionPlan),
				creditsCost,
				status: WorkflowStatus.PUBLISHED,
			},
		});

		// Return success — React Query handles the UI refresh
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		console.error("POST /api/workflows/publish error:", error);
		return NextResponse.json(
			{ error: "Failed to publish workflow" },
			{ status: 500 }
		);
	}
}
