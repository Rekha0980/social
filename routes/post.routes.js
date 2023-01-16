const express=require("express")
const { PostModel}=require("../models/post.model")

const postRoutes=express.Router()

postRoutes.get("/",async(req,res)=>{
    const post=await PostModel.find()
    res.send(post)
})

postRoutes.get("/:device",async(req,res)=>{
    let devi=req.query.device
    const post=await PostModel.find((el)=>el.device===devi)
    res.send(post)
})


postRoutes.post("/",async(req,res)=>{
    const paylod=req.body
    try{
        const post=new PostModel(paylod)
        await post.save()
        res.send("post created")
    }
    catch(err){
console.log({"err":"error while creating"})
console.log(err)
    }
   
})

postRoutes.patch("/update/:id",async(req,res)=>{
    const paylod=req.body
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id})
    const userid_note=post.userID
    const userid_rq=req.body.userID
    try{
        if(userid_rq!=userid_note){
            res.send("not auterised")
        }
        else{
            await PostModel.findByIdAndUpdate({"_id":id},paylod)
            res.send("note updated")
        }
    }
    catch(err){
console.log({"err":"error while creating"})
console.log(err)
    }
})

postRoutes.delete("/",async(req,res)=>{
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id})
    const userid_note=post.userID
    const userid_rq=req.body.userID
    try{
        if(userid_rq!=userid_note){
            res.send("not auterised")
        }
        else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("note deleted")
        }
    }
    catch(err){
console.log({"err":"error while creating"})
console.log(err)
    }
})

module.exports={
    postRoutes
}


// "title":"ramseeta",
// "body":"ram",
// "device":"pc"