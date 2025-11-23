// app/api/workflows/schedule/remove/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

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

		await prisma.workflow.update({
			where: { id, userId },
			data: {
				cron: null,
				nextRunAt: null,
			},
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		console.error("POST /api/workflows/schedule/remove error:", error);
		return NextResponse.json(
			{ error: "Failed to remove schedule" },
			{ status: 500 }
		);
	}
}
