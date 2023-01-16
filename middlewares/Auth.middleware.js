

const jwt=require("jsonwebtoken")
require("dotenv").config()

const authenticte=(req,res,next)=>{
    const token=req.headers.Authorization
    if(token){
        const decoded=jwt.verify(token,process.env.key)
        console.log(decoded)
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userID
            next()
        }
        else{
            res.send("login first")
        }
    }
    else{
        res.send("login first")
    }
}

module.exports={
    authenticte
}