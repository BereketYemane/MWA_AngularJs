const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    number:Number,
    name:{
        type:String,
        required:true
    },
    birthdate:{
        type:Date,
        required:true
    },
    height:Number,
    weight:Number
});
const teamSchema = new mongoose.Schema({
    country:{
        type:String,
        required:true
    },
    dateStarted:{
        type:Date,
        required:true
    },
    players:[playerSchema]
});

mongoose.model("team",teamSchema,"teams");