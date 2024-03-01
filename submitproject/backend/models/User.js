const mongoose = require("mongoose");

const User=new mongoose.Schema({
    username:{
        type:String,
    required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
    },
});

module.exports = mongoose.model("Users",User);
