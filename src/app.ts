import express from 'express'
import 'express-async-errors'
import "reflect-metadata"
import connectDB from "./database"
import ErrorHandlingMiddleware from './middlewares/ErrorHandlingMiddleware'
import router from './router'

connectDB().then( () => console.log("Connected to database!"))

const app = express()

app.use(express.json())

app.use(router)

app.use(ErrorHandlingMiddleware)

export default app