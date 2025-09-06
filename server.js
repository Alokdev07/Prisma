import express from 'express'
import dotenv from 'dotenv'
import prisma from './database/db.config.js'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

app.get('/',(req,res) => {
    return res.send("hello world")
})
app.use(express.json())
app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)
app.use('/api/comments',commentRouter)



app.listen(PORT,() => {
    console.log(`app is running on port ${PORT}`)
})