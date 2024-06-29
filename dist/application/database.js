"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const logging_1 = require("./logging");
exports.prismaClient = new client_1.PrismaClient({
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
});
// prisma agar listen ke event error
exports.prismaClient.$on("error", (err) => {
    logging_1.logger.error(err);
});
// prisma agar listen ke event warn
exports.prismaClient.$on("warn", (warn) => {
    logging_1.logger.warn(warn);
});
// prisma agar listen ke event info
exports.prismaClient.$on("info", (info) => {
    logging_1.logger.info(info);
});
// prisma agar listen ke event query
exports.prismaClient.$on("query", (q) => {
    logging_1.logger.info(q);
});
