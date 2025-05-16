const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:Number,
    // gender:{
    //     type:String,
    //     enum:['male','female']
    // }
})

//basically jo neeche humne likha hai wo bhut imp hai kyuki ye jo schema humne banaya hai isko actual mein implement kerne ke liye help kerta hai aur jo isme argument humne pass kiya hai usme pehle wale argument ka mtlb hai ki model ka name kya hai aur dusre ka mtlb hai ki wo konse schema ka use karega

const userModel=mongoose.model('user',userSchema)

module.exports=userModel