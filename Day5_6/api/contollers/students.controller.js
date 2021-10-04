require("../data/dbConnection");
const mongoose = require("mongoose");

const Students = mongoose.model("Student");

module.exports.getAllStudents = function(req,res){
    console.log("GET all students request");
    var offset = 0, count = 6,maxCount=9;
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
        console.log("Offset", offset);
    }
    if (req.query.count) {
        var tempCount = parseInt(req.query.count);
        if(tempCount>maxCount){
            res.status(404).send(`You cannot retrieve more than ${maxCount} students at a time`);
            return;
        }
        else{
            count = tempCount;
            console.log("Count", count);
        }
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(404).json({ "Messge": "QueryString offset and count should be numbers" });
        return;
    }
    else{
        Students.find().skip(offset).limit(count).exec(function(err,students){
            if(err){
                console.log("Erro finding student");
                res.status(500).json({"Message":"Sorry! ... Error finding students"});
            }
            else{
                console.log("Found students");
                res.status(200).json(students);
            }
        });
    }
};

module.exports.getOneStudent = function(req,res){
    console.log("GET one student request");
    if(!mongoose.isValidObjectId(req.params.studentID)){
        console.log("Invalid student ID");
        res.status(404).json({"Message":"Invalid student ID"});
        return;
    }
    else{
        const studentID = req.params.studentID;
        console.log("Id",studentID);
        Students.findById(studentID).exec(function(err,student){
            if(err){
                console.log("Error finding student");
                res.status(500).json({"Message":"Sorry! ... Error finding student"})
                return;
            }
            else{
                if(!student){
                    console.log("Student ID doesn't exist");
                    res.status(404).json({"Message":"Student ID doesn't exist"});
                    return;
                }
                else{
                    console.log("Found student");
                    res.status(200).json(student);
                }
            }
        });
    }
};

module.exports.addOneStudent = function(req,res){
    console.log("POST a student request");
    const newStudent = req.body;
    console.log(req.body);
    Students.create(newStudent, function (err, addedStudent) {
        if (err) {
            console.log("Error creating a student");
            res.status(500).json({"Message":"Error creating a student"});
        }
        else {
            console.log("Student created!");
            res.status(200).json({"Message":"Student successfully added",addedStudent});
        }
    });
};
module.exports.deleteOnseStudent = function(req,res){
    console.log("DELETE a student request");
    const studentID = req.params.studentID;
    if(!mongoose.isValidObjectId(studentID)){
        console.log("Invalid student ID");
        res.status(404).json({"Message":"Invalid student ID"});
    }
    else{
        Students.findByIdAndRemove(studentID).exec(function(err,student){
            if(err){
                console.log("Error deleting game");
                res.status(500).json({"Message":"Error deleting game"});
            }
            else if(!student){
                console.log("Student id not found");
                res.status(404).json({"Message":"Student id not found"});
            }
            else{
                console.log("Student successfully deleted");
                res.status(200).json({"Message":"Student successfully deleted",student});
            }
        });
    }
};
module.exports.updateOneStudent = function(req,res){
    console.log("PUT a student request");
    const studentID = req.params.studentID;
    if(!mongoose.isValidObjectId(studentID)){
        console.log("Invalid student ID");
        res.status(404).json({"Message":"Invalid student ID"});
    }
    else{
        Students.findById(studentID).exec(function(err,student){
            if(err){
                console.log("Error finding student");
                res.status(500).json({"Message":"Error finding student"});
            }
            else if (!student){
                console.log("Student ID not found");
                res.status(404).json({"Message":"Student ID not found"});
            }
            else{
                student.GPA = req.body.GPA;
                student.name = req.body.name;
                student.courses = req.body.courses;
                student.save(function(err,updatedStudent){
                    if(err){
                        console.log("Error updating student");
                        res.status(500).json({"Message":"Error updating student"});
                    }
                    else{
                        console.log("Student successfully updated");
                        res.status(200).json({"Message":"Student successfully update",updatedStudent});
                    }
                })
            }
        });
    }
};