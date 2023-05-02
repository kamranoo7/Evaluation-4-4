let express=require('express')
const {  connection } = require('./db')
let app=express()
let cors=require('cors')
const { userRouter } = require('./Routes/user.routes')
const { postRouter } = require('./Routes/post.routes')
const { auth } = require('./Middleware/auth.middleware')
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)
app.listen(process.env.port,async()=>{
    try{
await connection
console.log("connected to db")
    }catch(err){
console.log(err)
console.log("not connected to DB")
    }
    console.log("server is running at 8080")
})