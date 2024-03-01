const mongoose = require("mongoose");

const Fan_theories=new mongoose.Schema({
    username:{
        type:String,
    required:true},
    movie:{
        type:String,
    required:true
    },
    year:{
        type:Number,
    required:true
    },
    fan_theory:{
        type:String
    },
    likes:{
        type:Number
    }
});

module.exports=mongoose.model("Fan_theories",Fan_theories)
