const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
    title:String,
    price:Number
});

mongoose.model("Game",gameSchema,"games");