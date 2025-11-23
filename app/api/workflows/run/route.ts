// app/api/workflows/run/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegistry } from "@/lib/workflow/task/registry";

import {
	ExecutionPhaseStatus,
	WorkflowExecutionPlan,
	WorkflowExecutionStatus,
	workflowExecutionTrigger,
	WorkflowStatus,
} from "@/types/workflow";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { workflowId, flowDefinition } = body;

		const { userId } = auth();
		if (!userId) {
			return NextResponse.json(
				{ error: "unauthenticated" },
				{ status: 401 }
			);
		}

		if (!workflowId) {
			return NextResponse.json(
				{ error: "workflowId is required" },
				{ status: 400 }
			);
		}

		const workflow = await prisma.workflow.findUnique({
			where: {
				userId,
				id: workflowId,
			},
		});

		if (!workflow) {
			return NextResponse.json(
				{ error: "workflow not found" },
				{ status: 404 }
			);
		}

		let executionPlan: WorkflowExecutionPlan;
		let workflowDefinition = flowDefinition;

		// If already published — reuse saved execution plan
		if (workflow.status === WorkflowStatus.PUBLISHED) {
			if (!workflow.executionPlan) {
				return NextResponse.json(
					{ error: "no execution plan found" },
					{ status: 400 }
				);
			}
			executionPlan = JSON.parse(workflow.executionPlan);
			workflowDefinition = workflow.definition;
		} else {
			// Draft — requires a fresh flow definition
			if (!flowDefinition) {
				return NextResponse.json(
					{ error: "flow definition is not defined" },
					{ status: 400 }
				);
			}

			const parsed = JSON.parse(flowDefinition);
			const result = FlowToExecutionPlan(parsed.nodes, parsed.edges);

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

			executionPlan = result.executionPlan;
		}

		// Create workflow execution
		const execution = await prisma.workflowExecution.create({
			data: {
				workflowId,
				userId,
				status: WorkflowExecutionStatus.PENDING,
				startedAt: new Date(),
				trigger: workflowExecutionTrigger.MANUAL,
				definition: workflowDefinition,
				phases: {
					create: executionPlan.flatMap((phase) => {
						return phase.nodes.flatMap((node) => ({
							userId,
							status: ExecutionPhaseStatus.CREATED,
							number: phase.phase,
							node: JSON.stringify(node),
							name: TaskRegistry[node.data.type].label,
						}));
					}),
				},
			},
			select: {
				id: true,
				phases: true,
			},
		});

		if (!execution) {
			return NextResponse.json(
				{ error: "workflow execution not created" },
				{ status: 500 }
			);
		}

		// Fire the executor asynchronously (no await)
		ExecuteWorkflow(execution.id);

		// Return redirect URL for the client to push
		return NextResponse.json(
			{
				redirectUrl: `/workflow/runs/${workflowId}/${execution.id}`,
				executionId: execution.id,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("POST /api/workflows/run error:", error);
		return NextResponse.json(
			{ error: "Failed to run workflow" },
			{ status: 500 }
		);
	}
}
