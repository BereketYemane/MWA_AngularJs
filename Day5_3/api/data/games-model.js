const mongoose = require("mongoose");


const publisherSchema = new mongoose.Schema({
    name:String
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
    publisher: publisherSchema,
});

mongoose.model("Game",gameSchema,"games");