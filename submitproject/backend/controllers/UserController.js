const User=require('../models/User');
const bcrypt = require("bcrypt");


const createUser=async(req,res)=>{
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            res.status(200).send({ message: "Username already exists choose a different one" });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
          username:req.body.username,
          email:req.body.email,
          name:req.body.name,
          role: "student",
          password: hashedPassword,
        });
        const status = await newUser.save();
        if (status) res.status(200).send({ message: "User created" });
        else return res.status(200).send({ message: "Error in creating" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });      
    }
}

const getUser=async(req,res)=>{
    const user= User.findOne({username:req.body.username})
    if(user){
        res.status(200).send({ message: "Username already exists choose a different one" });
    }
}

const loginValidation=async(req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user){
        res.status(200).send({ message: "User is not registered and cannot login" });
        return
        }
        console.log(user)
        console.log(req.body)
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        console.log(isPasswordValid)
        if(user.username==req.body.username && isPasswordValid){
        res.status(200).send({ message: "Loging successful" });
        return;
        }
        else{
        res.status(500).send({ message: "Loging unsuccessful" });
        return
        }
        } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });      
    }
}


module.exports = {createUser,getUser,loginValidation};
