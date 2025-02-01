import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

console.log("INITIALISING CLIENT....");


const client = globalThis.prisma || new PrismaClient();

console.log("INITIALISING CLIENT done ....");


if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = client;
}

export default client;