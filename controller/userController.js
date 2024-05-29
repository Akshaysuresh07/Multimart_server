const users=require('../model/userModel')
const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const Users = require('../model/userModel');
const jwt=require('jsonwebtoken')


exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
        return res.status(400).json("User already exists");
    }

   
   

    const newUser = new Users({
        name,
        email,
        password
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ newUser, token });
};


exports.login =async(req,res)=>{
    const {email,password}=req.body;
    const existingUser=await Users.findOne({email})
    if(existingUser && (await existingUser.matchPassword(password))){
    const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)  
    res.status(200).json({existingUser,token})
    }
    else{
        res.status(404).json("Invalid email or password")
    }
    
}