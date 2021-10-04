const express = require("express");
const router = express.Router();
const students = require("../contollers/students.controller");
const studentCourses = require("../contollers/courses.controller");

router.route("/students").get(students.getAllStudents);

router.route("/students/:studentID").get(students.getOneStudent);

router.route("/students/:studentID/courses").get(studentCourses.getAllStudentCourses);
router.route("/students/:studentID/courses/:courseID").get(studentCourses.getStudentCourse);

module.exports = router;