// app/api/credentials/delete/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
	try {
		const { name } = await req.json();

		const { userId } = auth();
		if (!userId) {
			return NextResponse.json(
				{ error: "unauthenticated" },
				{ status: 401 }
			);
		}

		await prisma.credential.delete({
			where: {
				userId_name: {
					userId,
					name,
				},
			},
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		console.error("POST /api/credentials/delete error:", error);
		return NextResponse.json(
			{ error: "Failed to delete credential" },
			{ status: 500 }
		);
	}
}
