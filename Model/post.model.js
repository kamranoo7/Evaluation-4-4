let mongoose=require("mongoose")

let postSchema=mongoose.Schema({
   title: String,
body: String,
device: String,

})

let PostModel=mongoose.model("post",postSchema)
module.exports={
    PostModel
}