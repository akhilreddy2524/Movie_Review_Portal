const mongoose = require("mongoose");

const Person=new mongoose.Schema({
    name:{
        type:String,
    required:true}
});

module.exports=mongoose.model("Persons",Person)