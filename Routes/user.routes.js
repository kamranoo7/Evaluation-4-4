let express=require("express")
const { UserModel } = require("../Model/user.model")
let userRouter=express.Router()
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')

//Register
userRouter.post("/register",async(req,res)=>{
    let {name,email,gender,password}=req.body
    let user=await UserModel.findOne({email})
    if(user){
        res.status(200).send({"msg":"user already exist"})
    }else{
        try{
bcrypt.hash(password,5,async(err,hash)=>{
    let user=new UserModel({email,name,gender,password:hash})
    await user.save()
    res.status(200).send({"msg":"new user has been added"})
})
        }catch(err){
        res.status(400).send({"msg":err.message})
        }
    }

})
//Login
userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body
    try{
let user=await UserModel.findOne({email})
if(user){
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token=jwt.sign({authorID:user._id,author:userRouter.name},"masai")
            res.status(200).send({"msg":"Login Succesfully","toekn":token})
        }else{
            res.status(400).send({"msg":"wrong credential"})
        }
    })
}
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={
    userRouter
}