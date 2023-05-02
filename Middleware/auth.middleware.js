let jwt=require('jsonwebtoken')

let auth=(req,res,next)=>{
    let token=req.headers.authorization
    if(token){
        try{
            let decoded=jwt.verify(token.split(" ")[1],"masai");
            if(decoded){
                req.body.authorID=decoded.authorID
                req.body.author=decoded.author
                next()
            }else{
                res.send({"msg":"Please Login first"})
            }
        }catch(err){
            res.send({"msg":err.message})
        }
    }else{
        res.send({"msg":"please Login"})
    }
}

module.exports={
    auth
}