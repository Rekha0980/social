const express=require("express")
require("dotenv").config()

const {connection}=require("./configs/db")

const {registerRoutes}=require("./routes/register.routes")
const {postRoutes}=require("./routes/post.routes")
const { authenticte}=require("./middlewares/Auth.middleware")

const app=express()
app.use(express.json())
//app.use(cors())

app.get("/",(req,res)=>{
    res.send("home page")
})

app.use("/users",registerRoutes)

app.use(authenticte)

app.use("/posts",postRoutes)
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(err){
console.log(err)
    }
})