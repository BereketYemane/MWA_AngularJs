require("../data/dbConnection");
const mongoose = require("mongoose");
const users = mongoose.model("user");
const bcrypt = require("bcrypt");

module.exports.addUser = function (req, res) {
    console.log("POST a user request");
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            console.log("bcrypt salt generation error");
        } else {
            bcrypt.hash(req.body.password, salt, function (err, hashPasswd) {
                if (err) {
                    console.log('Bcrypt hash generation error');
                    res.status(500).json(err)
                } else {
                    const newUser = {
                        userName: req.body.userName,
                        password: hashPasswd,
                        name: req.body.name
                    }
                    users.create(newUser, function (err, user) {
                        if (err) {
                            console.log("Error creating name");
                        }
                        else {
                            console.log("user successfully added");
                            res.status(200).json(user)
                        }
                    });
                }
            });
        }
    });
}