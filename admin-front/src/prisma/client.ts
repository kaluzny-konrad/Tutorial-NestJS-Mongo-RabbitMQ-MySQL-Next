import { PrismaClient } from "@prisma/client";

const client: PrismaClient = globalThis["prisma"] || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis["prisma"] = client;

export default client;