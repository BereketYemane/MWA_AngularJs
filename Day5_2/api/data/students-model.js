const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
        code:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        }
});
const  studentSchema = new mongoose.Schema({
    GPA:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    courses:[courseSchema]
});

mongoose.model("Student",studentSchema,"students");