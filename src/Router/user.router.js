const express=require("express");
const UserModel=require("../Modal/user.modal")
const userRouter = express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

userRouter.post("/signup",async(req,res)=>{
    const {email,password,age}=req.body;
    try{
        const user= await UserModel.findOne({email,password})
  if(user){
   return res.status(404).send("user already exist")
  }
  let newUser= new UserModel({email,password,age,role:"user"});
 newUser.save();

return res.status(200).send("user created successfully",user)
    }
    catch(e){
        return res.status(404).send("user cant be created")
    }
})

userRouter.post("/login",async(req,res)=>{
    const { email, password} = req.body;
    const user =await  UserModel.findOne({ email,password });
   if(!user){
    return res.send("Invalid credentials");
   }
   const token=jwt.sign(
    {
        id:user._id,
        email:user.email,
        role:user.role},
    "SECRET1234",
    {
        expiresIn:"1 hr"
    }
    )
    const refreshtoken=jwt.sign({},
        "REFRESHSECRET1234",
        {
            expiresIn:"7 days"
        }
    )
    
   res.send({message:"Login successful",token,refreshtoken});
    }
   )



 
module.exports=userRouter;