import "reflect-metadata"
import connectDB from "./database"
import express from 'express'
import router from './router'

connectDB().then( () => console.log("Connected to database!"))

const app = express()

app.use(express.json())

app.use(router)

export default app