import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
	const adapter = new PrismaLibSql({
		url: process.env.DATABASE_TURSO_DATABASE_URL!,
		authToken: process.env.DATABASE_TURSO_AUTH_TOKEN!,
	});

	return new PrismaClient({ adapter });
};

// Prevent multiple instances of Prisma Client in development
declare global {
	var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
