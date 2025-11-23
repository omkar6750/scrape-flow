// app/api/workflows/unpublish/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { WorkflowStatus } from "@/types/workflow";

export async function POST(req: Request) {
	try {
		const { id } = await req.json();

		const { userId } = auth();
		if (!userId) {
			return NextResponse.json(
				{ error: "unauthenticated" },
				{ status: 401 }
			);
		}

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

		if (workflow.status !== WorkflowStatus.PUBLISHED) {
			return NextResponse.json(
				{ error: "workflow is not published" },
				{ status: 400 }
			);
		}

		await prisma.workflow.update({
			where: {
				id,
				userId,
			},
			data: {
				status: WorkflowStatus.DRAFT,
				executionPlan: null,
				creditsCost: 0,
			},
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		console.error("POST /api/workflows/unpublish error:", error);
		return NextResponse.json(
			{ error: "Failed to unpublish workflow" },
			{ status: 500 }
		);
	}
}
