"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const public_api_1 = require("../route/public-api");
const error_middleware_1 = require("../middleware/error-middleware");
const api_1 = require("../route/api");
exports.web = (0, express_1.default)();
// agar smua body diparse ke json
exports.web.use(express_1.default.json());
// public API
exports.web.use(public_api_1.publicRouter);
// Authorized API
exports.web.use(api_1.apiRouter);
// Middleware to handle error
exports.web.use(error_middleware_1.errorMiddleware);
