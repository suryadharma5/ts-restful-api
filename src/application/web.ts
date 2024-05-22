import express from "express"

export const web = express()

// agar smua body diparse ke json
web.use(express.json())