// app/api/workflows/executions/[executionId]/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
	req: Request,
	{ params }: { params: { executionId: string } }
) {
	try {
		const { executionId } = params;

		const { userId } = auth();
		if (!userId) {
			return NextResponse.json(
				{ error: "unauthenticated" },
				{ status: 401 }
			);
		}

		const execution = await prisma.workflowExecution.findUnique({
			where: {
				id: executionId,
				userId,
			},
			include: {
				phases: {
					orderBy: {
						number: "asc",
					},
				},
			},
		});

		if (!execution) {
			return NextResponse.json({ error: "not found" }, { status: 404 });
		}

		return NextResponse.json(execution, { status: 200 });
	} catch (error: any) {
		console.error(
			"GET /api/workflows/executions/[executionId] error:",
			error
		);
		return NextResponse.json({ error: "server error" }, { status: 500 });
	}
}
