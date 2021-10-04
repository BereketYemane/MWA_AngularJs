require("../data/dbConnection");
const mongoose = require("mongoose");

const Students = mongoose.model("Student");

module.exports.getAllStudentCourses = function (req, res) {
    console.log("GET all student courses request");
    const studentID = req.params.studentID;
    if (!mongoose.isValidObjectId(studentID)) {
        console.log("Invalid student ID");
        res.status(404).json({ "Message": "Invalid student ID" });
        return;
    }
    else {
        Students.findById(studentID).select("courses").exec(function (err, studentCourses) {
            if (err) {
                console.log("Error finding courses");
                res.status(500).json({ "Message": "Sorry! ... Error finding courses" })
                return;
            }
            else {
                if (!studentCourses) {
                    console.log("Student ID doesn't exist");
                    res.status(404).json({ "Message": "Student ID doesn't exist" });
                    return;
                }
                else {
                    console.log("Found Courses");
                    res.status(200).json(studentCourses);
                }
            }
        });
    }

};

module.exports.getStudentCourse = function (req, res) {
    console.log("GET one student course");
    const studentID = req.params.studentID;
    const courseID = req.params.courseID;

    if(!mongoose.isValidObjectId(studentID)){
        console.log("Invalid student ID");
        res.status(404).json({ "Message": "Invalid student ID" });
        return;
    }
    if(!mongoose.isValidObjectId(courseID)){
        console.log("Invalid course ID");
        res.status(404).json({ "Message": "Invalid course ID" });
        return;
    }
    else{
        console.log("studentID",studentID);
        Students.findById(studentID).select("courses").exec(function(err,student){

            if(err){
                console.log("Error finding course");
                res.status(500).json({"Message":"Sorry! ... Error finding course"})
                return;
            }
            else{
                if(!student){
                    console.log("studentID doesn't exist");
                    res.status(404).json({"Message":"studentID doesn't exist"});
                    return;
                }
                else{
                    console.log("Found courses");
                    var courseFound = false;
                    for(let i=0;i<student.courses.length;i++){
                        console.log(student.courses[i]);
                        if(student.courses[i].id==courseID){
                            console.log("Course found");
                            courseFound=true;
                            res.status(200).json(student.courses[i]);
                            return;
                        }
                    }
                    if(!courseFound){
                        console.log("Course ID doesn't exist");
                        res.status(404).json({"Message":"Course ID doesn't exist"});
                        return;
                    }
                }
            }
        });
    }
};

module.exports.addStudentCourse = function (req, res) {
    console.log("POST student course request");
    const studentID = req.params.studentID;
    if (!mongoose.isValidObjectId(studentID)) {
        console.log("Invalid student ID");
        res.status(404).json({ "Message": "Invalid student ID" });
        return;
    }
    else {
        Students.findById(studentID).select("courses").exec(function (err, student) {
            if (err) {
                console.log("Error finding student");
                res.status(500).json({ "Message": "Error finding student" });
            }
            else if (!student) {
                console.log(("Student ID doesn't exist"));
                res.status(404).json({ "Message": "Student ID not found" });
            }
            else {
                const newCourse = req.body.course;
                    student.courses.push(newCourse);
                    student.save(function (err, addedCourse) {
                        if (err) {
                            console.log("Sorry! couldn't add course");
                            res.status(500).json({ "Message": "Sorry! couldn't add course" });
                        }
                        else {
                            console.log("course successfully added");
                            res.status(200).json({ "Message": "course successfully added", addedCourse});
                        }
                    }); 
            }
        });
    }
};
module.exports.deleteStudentCourse = function (req, res) {
    const studentID = req.params.studentID;
    const courseID = req.params.courseID;

    console.log("DELETE a student course request", courseID);
    if (!mongoose.isValidObjectId(studentID)) {
        console.log("Invalid student ID");
        res.status(404).json({ "Message": "Invalid student ID" });
        return;
    }
    else if (!mongoose.isValidObjectId(courseID)) {
        console.log("Invalid course ID ID");
        res.status(404).json({ "Message": "Invalid course ID" });
        return;
    }
    else {
        Students.findById(studentID).select("courses").exec(function (err, student) {
            if (err) {
                console.log("Error finding a student");
                res.status(500).json({ "Message": "Error finding a student" });
            }
            else if (!student) {
                console.log("Student id not found");
                res.status(404).json({ "Message": "Student id not found" });
            }
            else {
                console.log(student);
                console.log("Found Courses");
                var courseFound = false;
                for (let i = 0; i < student.courses.length; i++) {
                    if (student.courses[i].id == courseID) {
                        console.log("Course found");
                        courseFound = true;
                        student.courses[i].remove();
                        student.save(function (err, deletedCourse) {
                            if (err) {
                                console.log("Error deleting course");
                                res.status(500).json({ "Message": "Sorry! ... Error deleting course" });
                            }
                            else {
                                res.status(200).json({ "Message": "Student course successfully deleted",deletedCourse});
                            }
                        });
                    }
                }
                if (!courseFound) {
                    console.log("course ID doesn't exist");
                    res.status(404).json({ "Message": "course ID doesn't exist" });
                    return;
                }

            }
        });
    }
};
module.exports.updateStudentCourse = function (req, res) {
    console.log("Put a student course request");
    const studentID = req.params.studentID;
    const courseID = req.params.courseID;
    if (!mongoose.isValidObjectId(studentID)) {
        console.log("Invalid student ID");
        res.status(404).json({ "Message": "Invalid student ID" });
        return;
    }
    else if (!mongoose.isValidObjectId(courseID)) {
        console.log("Invalid course ID");
        res.status(404).json({ "Message": "Invalid course ID" });
        return;
    }
    else {
        Students.findById(studentID).select("courses").exec(function (err, student) {
            if (err) {
                console.log("Error finding a student");
                res.status(500).json({ "Message": "Sorry! ... Error finding a student" });
                return;
            }
            else if(!student){
                console.log(("Student ID doesn't exist"));
                res.status(404).json({"Message":"Student ID not found"});
            }
            else {
                console.log("Found courses");
                var courseFound = false;
                for (let i = 0; i < student.courses.length; i++) {
                    if (student.courses[i].id == courseID) {
                        console.log("Course found");
                        courseFound = true;
                        student.courses[i]=req.body.course;
                        student.save(function (err, student) {
                            if (err) {
                                console.log("Error updating student course");
                                res.status(500).json({ "Message": "Sorry! ... Error updating student course" });
                            }
                            else {
                                res.status(200).json({ "Message": "Student course successfully updated", student });
                            }
                        });
                    }
                }
                if (!courseFound) {
                    console.log("Course ID doesn't exist");
                    res.status(404).json({ "Message": "Course ID doesn't exist" });
                    return;
                }
            }
        });
    }
};