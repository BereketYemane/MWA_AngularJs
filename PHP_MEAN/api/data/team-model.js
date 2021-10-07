const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
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