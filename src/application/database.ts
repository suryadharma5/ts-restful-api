import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

export const prismaClient = new PrismaClient({
    // agar prisma log ke winston
    log: [
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        }
    ]
})

// prisma agar listen ke event error
prismaClient.$on("error", (err) => {
    logger.error(err)
})

// prisma agar listen ke event warn
prismaClient.$on("warn", (warn) => {
    logger.warn(warn)
})

// prisma agar listen ke event info
prismaClient.$on("info", (info) => {
    logger.info(info)
})

// prisma agar listen ke event query
prismaClient.$on("query", (q) => {
    logger.info(q)
})