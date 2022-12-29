const express=require("express");
const UserModel=require("../Modal/user.modal")
const userRouter = express.Router();
const bcrypt=require("bcrypt")

userRouter.post("/signup",async(req,res)=>{
    const {email,password,age}=req.body;
    try{
        const user= await UserModel.findOne({email,password})
  if(user){
   return res.status(404).send("user already exist")
  }
  let newUser= new UserModel({email,password,age});
newUser=await newUser.save();

return res.status(200).send("user created successfully",user)
    }
    catch(e){
        return res.status(404).send("user cant be created")
    }
})

userRouter.post("/login",async(req,res)=>{
    try{ 
        const { email, password } = req.body;
        console.log(email,password,"user")
    const u = await UserModel.findOne({ email, password });
    console.log(u,"user")
    res.send(u)
    }catch(e){
        res.status(401).send({ message: "Login Failed",error:e })
    }
}
   )



 
module.exports=userRouter;