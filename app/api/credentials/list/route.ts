// app/api/credentials/list/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
	try {
		const { userId } = auth();
		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthenticated" },
				{ status: 401 }
			);
		}

		const credentials = await prisma.credential.findMany({
			where: { userId },
			orderBy: { name: "asc" },
		});

		return NextResponse.json(credentials, { status: 200 });
	} catch (err) {
		console.error("GET /api/credentials/list error:", err);
		return NextResponse.json(
			{ error: "Failed to load credentials" },
			{ status: 500 }
		);
	}
}
