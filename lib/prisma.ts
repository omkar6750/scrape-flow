import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaLibSql({
	url: `${process.env.DATABASE_TURSO_DATABASE_URL}`,
	authToken: `${process.env.DATABASE_TURSO_AUTH_TOKEN}`,
});
const prisma = new PrismaClient({ adapter });
