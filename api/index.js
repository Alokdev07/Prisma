import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/',(req,res) => {
    return res.json({"message" : "hello world"})
})

app.listen(process.env.PORT,() => {
    console.log(`server is listening in ${process.env.PORT}`)
})