// app/api/workflows/update/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
	try {
		const { id, definition } = await req.json();

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

		if (workflow.status !== WorkflowStatus.DRAFT) {
			return NextResponse.json(
				{ error: "workflow is not a draft" },
				{ status: 400 }
			);
		}

		await prisma.workflow.update({
			data: { definition },
			where: { id, userId },
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		console.error("POST /api/workflows/update error:", error);
		return NextResponse.json(
			{ error: "Failed to update workflow" },
			{ status: 500 }
		);
	}
}
