const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {UserModel}=require("../model/user.model")


const userRouter=express.Router()

userRouter.post("/signup",async (req,res)=>{
    try {
    const {username,email,password}=req.body
        const isUserPresent=await UserModel.findOne({email})
        if(isUserPresent)
        {
            return res.send({msg:"user already present"})
        }

        const hashedPassword=bcrypt.hashSync(password,10)

        const user=new UserModel({username,email,password:hashedPassword})

        await user.save()
        res.send({status:"ok",data:user,msg:"registration successful"})

    } catch (error) {
        res.send({msg:"something went wrong"})
    }
})


userRouter.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body

        const isUserPresent=await UserModel.findOne({email})
        if(!isUserPresent)
        {
            return res.send({msg:"user not present"})
        }

        const isPasswordMatch=await bcrypt.compareSync(password,isUserPresent.password)
        if(!isPasswordMatch)
        {
            return res.send({msg:"wrong credentials"})
        }

        const token=jwt.sign({userId:isUserPresent._id},"omdb",{expiresIn:"4h"})
        res.send({status:"ok",msg:"Login Successful",token:token,user:isUserPresent})
    } catch (error) {
        res.send({msg:"something went wrong"}) 
    }
})


userRouter.get('/',async (req,res)=>{
    try {
        const users = await UserModel.find();
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching users.", error: error.message });
    }
})

module.exports={userRouter}