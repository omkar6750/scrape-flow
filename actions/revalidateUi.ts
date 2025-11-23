"use server";

import { revalidatePath } from "next/cache";

export async function revalidateUI(path: string) {
	try {
		revalidatePath(path);
		return { ok: true };
	} catch (err) {
		console.error("Failed to revalidate", err);
		return { ok: false };
	}
}
