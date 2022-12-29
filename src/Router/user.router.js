const express=require("express");
const UserModel=require("../Modal/user.modal")
const userRouter = express.Router();
const bcrypt=require("bcrypt")

userRouter.post("/signup",async(req,res)=>{
    try{ 
    const {name,email,password}=req.body
    let user = new UserModel({name,email, password });
    user = await user.save();
    res.send(user)
    }
    catch(e){
        
        res.status(401).send({ message: "Signup Failed",error:e })
    }
})


userRouter.post("/login",async (req,res)=>{
    try{ const { email, password } = req.body;
     const u = await UserModel.findOne({ email, password });
     res.send(u)
     }catch(e){
         res.status(401).send({ message: "Login Failed",error:e })
     }
 })
 
   



 
module.exports=userRouter;