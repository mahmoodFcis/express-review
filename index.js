const express=require("express");
const config=require("config");
const userRouter=require("./routes/user.route");
const app=express();
const mongoose=require("mongoose");

mongoose.connect(config.get("dbConnection")).then(()=>{
console.log("connected to mongo successfully");

}).catch((e)=>{
    console.log("an error occurred while connecting to mongo")
})

app.use(express.json());

// middleware


//
app.use("/api/users/",userRouter);
app.listen(config.get("port")|| 4000,()=>{

    console.log(`app is listening on port ${config.get("port")}`)
});

