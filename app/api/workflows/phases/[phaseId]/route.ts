// app/api/workflows/phases/[phaseId]/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
	req: Request,
	{ params }: { params: { phaseId: string } }
) {
	try {
		const { phaseId } = params;

		const { userId } = auth();
		if (!userId) {
			return NextResponse.json(
				{ error: "not authenticated" },
				{ status: 401 }
			);
		}

		const phase = await prisma.executionPhase.findUnique({
			where: {
				id: phaseId,
				execution: {
					userId,
				},
			},
			include: {
				logs: {
					orderBy: {
						timestamp: "asc",
					},
				},
			},
		});

		if (!phase) {
			return NextResponse.json({ error: "not found" }, { status: 404 });
		}

		return NextResponse.json(phase, { status: 200 });
	} catch (error: any) {
		console.error("GET /api/workflows/phases/[phaseId] error:", error);
		return NextResponse.json(
			{ error: "Failed to load phase details" },
			{ status: 500 }
		);
	}
}
