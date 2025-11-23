// app/api/credentials/create/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { symmetricEncrypt } from "@/lib/encryption";
import { createCredentialSchema } from "@/schema/credential";

export async function POST(req: Request) {
	try {
		const json = await req.json();

		const parsed = createCredentialSchema.safeParse(json);
		if (!parsed.success) {
			return NextResponse.json(
				{ error: "Invalid form data" },
				{ status: 400 }
			);
		}

		const { name, value } = parsed.data;

		const { userId } = auth();
		if (!userId) {
			return NextResponse.json(
				{ error: "unauthenticated" },
				{ status: 401 }
			);
		}

		const encryptedValue = symmetricEncrypt(value);

		const result = await prisma.credential.create({
			data: {
				userId,
				name,
				value: encryptedValue,
			},
		});

		if (!result) {
			return NextResponse.json(
				{ error: "failed to create credential" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		console.error("POST /api/credentials/create error:", error);
		return NextResponse.json(
			{ error: "Failed to create credential" },
			{ status: 500 }
		);
	}
}
