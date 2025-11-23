"use client";

export async function callServerAction<T extends (...args: any[]) => any>(
	actionImport: () => Promise<{ default?: T } | Record<string, T>>,
	method: keyof Awaited<ReturnType<typeof actionImport>>,
	...args: Parameters<T>
): Promise<Awaited<ReturnType<T>>> {
	const mod = await actionImport();
	const fn = (mod[method] ?? mod.default) as T;

	if (typeof fn !== "function") {
		throw new Error(`Server action '${String(method)}' not found`);
	}

	return fn(...args);
}
