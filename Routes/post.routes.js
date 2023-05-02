let express=require('express')
const { PostModel } = require('../Model/post.model')
let postRouter=express.Router()

postRouter.post("/create",async(req,res)=>{
    try{
        let post=new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"new post created"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
postRouter.get("/",async(req,res)=>{
    try{
        let post=await PostModel.find({authorID:req.body.authorID})
        res.status(200).send(post)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
postRouter.patch("/update/:postID",async(req,res)=>{
let {postID}=req.params
let post=await PostModel.findOne({_id:postID})
try{
    if(req.body.authorID!==post.authorID){
        res.status(200).send({"msg":"You are not Authorised"})
    }else{
        await PostModel.findByIdAndUpdate({_id:postID},req.body)
        res.status(200).send({"msg":"The post has been updated"})
    }
}catch(err){
    res.status(400).send({"msg":err.message})
}
})
postRouter.delete("/delete/:postID",async(req,res)=>{
    let {postID}=req.params
    let post=await PostModel.findOne({_id:postID})
    try{
        if(req.body.authorID!==post.authorID){
            res.status(200).send({"msg":"You are not Authorised"})
        }else{
            await PostModel.findByIdAndDelete({_id:postID},req.body)
            res.status(200).send({"msg":"The post has been deleted"})
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
    })


    module.exports={
        postRouter
    }