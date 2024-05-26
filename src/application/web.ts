import express from "express"
import { publicRouter } from "../route/public-api"
import { errorMiddleware } from "../middleware/error-middleware"

export const web = express()

// agar smua body diparse ke json
web.use(express.json())

// public API
web.use(publicRouter)

// Authorized API

// Middleware to handle error
web.use(errorMiddleware)