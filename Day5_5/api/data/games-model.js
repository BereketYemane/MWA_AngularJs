const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    review:String,
    date:{
        type:Date,
        "default":Date.now
    }
});

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
    },
    reviews:[reviewSchema]

});

mongoose.model("Game",gameSchema,"games");