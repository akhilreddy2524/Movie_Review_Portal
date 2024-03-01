const mongoose = require("mongoose");

const Review=new mongoose.Schema({
    username:{
        type:String,
    required:true
    },
    movie:{
        type:String,
    required:true
    },
    year:{
        type:Number,
    required:true
    },
    review:{
        type:String
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:10
    }
});

module.exports =mongoose.model("Reviews",Review)

