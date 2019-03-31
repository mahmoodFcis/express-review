const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const config=require("config");
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minlength:6,maxlength:10,
        lowercase:true,
        validate:{validator:function(){return  true;}},

       
    },
    email:String,
    password:String,
    isActive:Boolean
});

userSchema.methods.generateAuthToken=function(){
 let privateKey=config.get("JWT_PrivateKey");
 let token=jwt.sign({email:this.email,isActive:this.isActive},privateKey);
 return token;


}

module.exports=mongoose.model("User",userSchema);