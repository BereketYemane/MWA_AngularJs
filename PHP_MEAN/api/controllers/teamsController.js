require("../data/dbConnection");
const mongoose = require("mongoose");
const teams = mongoose.model("team");

module.exports.addOneTeam = function (req, res) {
    console.log("POST a team request");
    const newTeam = req.body;
    teams.create(newTeam, function (err, addedTeam) {
        if (err) {
            console.log("Error creating a team");
            res.status(500).json({ "Message": "Error creating a team" });
        }
        else {
            console.log("Team Created");
            res.status(200).json({ "Message": "Team successfully added", addedTeam });
        }
    });
};
module.exports.getAllTeams = function (req, res) {
    console.log("GET all teams request");
    var offset = 0, count = 6, maxCount = 9;
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
        console.log("Offset", offset);
    }
    if (req.query.count) {
        var tempCount = parseInt(req.query.count);
        if (tempCount > maxCount) {
            res.status(404).send(`You cannot retrieve more than ${maxCount} teams at a time`);
            return;
        }
        else {
            count = tempCount;
            console.log("Count", count);
        }
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(404).json({ "Messge": "QueryString offset and count should be numbers" });
        return;
    }
    else {
        teams.find().skip(offset).limit(count).exec(function (err, teams) {
            if (err) {
                console.log("Error finding teams");
                res.status(500).json({ "Message": "Sorry! ... Error finding teams" });
                return
            }
            else {
                console.log("teams found");
                res.status(200).json(teams);
            }
        });
    }
};
module.exports.getOneTeam = function (req, res) {
    console.log("GET a team request");
    const teamID = req.params.teamID;
    if (!mongoose.isValidObjectId(teamID)) {
        console.log("Invalid team ID");
        res.status(404).json({ "Message": "Invalid team ID" });
        return;
    }
    else {
        teams.findById(teamID).exec(function (err, team) {
            if (err) {
                console.log("Error finding team");
                res.status(500).json({ "Message": "Sorry! ... Error finding team" })
            }
            else if (!team) {
                console.log("Team ID doesn't exist");
                res.status(404).json({ "Message": "Team ID doesn't exist" });
                return;
            }
            else {
                console.log("Found team");
                res.status(200).json(team);
            }
        });
    }
};
module.exports.updateOneTeam = function (req, res) {
    console.log("PUT a team request");
    const teamID = req.params.teamID;
    if (!mongoose.isValidObjectId(teamID)) {
        console.log("Invalid team ID");
        res.status(404).json({ "Message": "Invalid team ID" });
        return;
    }
    else {
        teams.findById(teamID).exec(function (err, team) {
            if (err) {
                console.log("Error finding team");
                res.status(500).json({ "Message": "Sorry! ... Error finding team" })
            }
            else if (!team) {
                console.log("Team ID doesn't exist");
                res.status(404).json({ "Message": "Team ID doesn't exist" });
                return;
            }
            else {
                team.country = req.body.country;
                team.dateStarted = req.body.dateStarted;
                team.save(function(err,updatedTeam){
                    if(err){
                        console.log("Error updating team");
                        res.status(500).json({"Message":"Error updating team"});
                    }
                    else{
                        console.log("Team successfully updated!");
                        res.status(200).json({"Message":"Team succesfully updated",updatedTeam});
                    }
                });
            }
        });
    }
}
module.exports.deleteOneTeam = function (req, res) {
    console.log("DELETE a team request");
    const teamID = req.params.teamID;
    if(!mongoose.isValidObjectId(teamID)){
        console.log("Invalid team ID");
        res.status(404).json({"Message":"Invalid team ID"});
    }
    else{
        teams.findByIdAndRemove(teamID).exec(function(err,team){
            if(err){
                console.log("Error deleting team");
                res.status(500).json({"Message":"Error deleting team"});
            }
            else if(!team){
                console.log("Team id not found");
                res.status(404).json({"Message":"Team id not found"});
            }
            else{
                console.log("Team successfully deleted");
                res.status(200).json({"Message":"Team successfully deleted",team});
            }
        });
    }
};
