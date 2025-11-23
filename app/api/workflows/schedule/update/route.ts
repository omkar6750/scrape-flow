// app/api/workflows/schedule/update/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CronExpressionParser } from "cron-parser";

export async function POST(req: Request) {
	try {
		const { id, cron } = await req.json();

		const { userId } = auth();
		if (!userId) {
			return NextResponse.json(
				{ error: "unauthenticated" },
				{ status: 401 }
			);
		}

		try {
			const interval = CronExpressionParser.parse(cron);

			await prisma.workflow.update({
				where: {
					id,
					userId,
				},
				data: {
					cron,
					nextRunAt: interval.next().toDate(),
				},
			});

			return NextResponse.json({ success: true }, { status: 200 });
		} catch (e) {
			return NextResponse.json(
				{ error: "invalid cron expression" },
				{ status: 400 }
			);
		}
	} catch (error: any) {
		console.error("POST /api/workflows/schedule/update error:", error);
		return NextResponse.json(
			{ error: "Failed to update workflow cron" },
			{ status: 500 }
		);
	}
}
