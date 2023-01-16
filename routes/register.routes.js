const express=require("express")
require("dotenv").config()
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")
const { UserModel}=require("../models/users.model")

const registerRoutes=express.Router()

registerRoutes.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
    try{
        bcrypt.hash(password, 5,async(err, secure_pass)=> {
            if(err){
                console.log(err)
            }
            else{
                const user=new UserModel({name,email,password:secure_pass,gender})
                await user.save()
                res.send("register")
            }
        })
        
    }
    catch(err){
        console.log("error while registering")
console.log(err)
    }
})



registerRoutes.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        const hassed=user[0].password
        if(user.length>0){
            bcrypt.compare(password,hassed,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"message":"login done","token":token})
                }
                else{
                    res.send("wrong credential")
                }
            })
        }
        else{
            res.send("wrong credential")
        }
        
    }
    catch(err){
        console.log("error while registering")
console.log(err)
    }
})

module.exports={
    registerRoutes
}


// "name":"ram",
// "email":"ram@gmail.com","gender":"male","password":"ram"