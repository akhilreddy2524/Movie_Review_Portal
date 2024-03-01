const mongoose = require("mongoose");

const movie=new mongoose.Schema({
    Title:{
        type:String,
        required:true,
    },
    Year:{
        type:Number,
    },
    Rated:{
        type: String,
    },
    Released:{
        type:String,
        required:true,
    },
    Runtime:{
        type:String,
        required:true
    },
    Genre:{
        type:String,
        required:true
    },
    Director: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persons'
    }],
    Writer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persons'
    }],
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persons'
    }],
    language:{
        type:String,
        required:true
    },
    Country:{
        type:String,
    },
    Released_Status:{
        type:String,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }],
    fan_theories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fan_theories'
    }],

})

module.exports=mongoose.model("movies",movie)