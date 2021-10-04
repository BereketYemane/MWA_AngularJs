const mongoose = require("mongoose");


const publisherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
});

const gameSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        min:0,
        max:5,
        "default":0
    },
    price:Number,
    minAge: Number,
    designers:[String],
    publisher: {
        type:publisherSchema
    }
});

mongoose.model("Game",gameSchema,"games");