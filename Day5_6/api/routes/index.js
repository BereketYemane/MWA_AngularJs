const express = require("express");
const router = express.Router();
const students = require("../contollers/students.controller");
const studentCourses = require("../contollers/courses.controller");

router.route("/students").get(students.getAllStudents)
.post(students.addOneStudent);

router.route("/students/:studentID").get(students.getOneStudent)
.put(students.updateOneStudent)
.delete(students.deleteOnseStudent);

router.route("/students/:studentID/courses").get(studentCourses.getAllStudentCourses)
.post(studentCourses.addStudentCourse);
router.route("/students/:studentID/courses/:courseID").get(studentCourses.getStudentCourse)
.put(studentCourses.updateStudentCourse)
.delete(studentCourses.deleteStudentCourse);

module.exports = router;