// app/api/workflows/[workflowId]/executions/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
	req: Request,
	{ params }: { params: { workflowId: string } }
) {
	try {
		const { workflowId } = params;
		const { userId } = auth();
		if (!userId)
			return NextResponse.json(
				{ error: "unauthorised" },
				{ status: 401 }
			);

		const executions = await prisma.workflowExecution.findMany({
			where: { workflowId, userId },
			orderBy: { createdAt: "desc" },
		});

		// return as plain array (same shape as old server action)
		return NextResponse.json(executions, { status: 200 });
	} catch (err: any) {
		console.error("GET /api/workflows/[id]/executions error:", err);
		return NextResponse.json(
			{ error: "Failed to fetch executions" },
			{ status: 500 }
		);
	}
}
