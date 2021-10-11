require("../data/dbConnection");
const mongoose = require("mongoose");

const teams = mongoose.model("team");

module.exports.getAllTeamPlayers = function (req, res) {
    console.log("GET all team players request");
    const teamID = req.params.teamID;
    if (!mongoose.isValidObjectId(teamID)) {
        console.log("Invalid teamID");
        res.status(404).json({ "Message": "Invalid team ID" });
        return;
    }
    else {
        teams.findById(teamID).select("players").exec(function (err, team) {
            if (err) {
                console.log("Error finding team players");
                res.status(500).json({ "Message": "Sorry! couldn't find team players" });
                return;
            }
            else {
                if (!team) {
                    console.log("Team ID doesn't exist");
                    res.status(404).json({ "Message": "Team ID doesn't exist" });
                }
                else {
                    console.log("Found team");
                    res.status(200).json(team);
                }
            }
        });
    }
};

module.exports.getOneTeamPlayer = function (req, res) {
    console.log("GET one team player request");
    const teamID = req.params.teamID;
    const playerID = req.params.playerID;
    if (!mongoose.isValidObjectId(teamID)) {
        console.log("Invalid teamID");
        res.status(404).json({ "Message": "Invalid team ID" });
        return;
    }
    else if (!mongoose.isValidObjectId(playerID)) {
        console.log("Invalid player ID");
        res.status(404).json({ "Message": "Invalid player ID" });
        return;
    }
    else {
        teams.findById(teamID).select("players").exec(function (err, team) {
            if (err) {
                console.log("Error finding team players");
                res.status(500).json({ "Message": "Sorry! couldn't find team players" });
                return;
            }
            else {
                if (!team) {
                    console.log("Team ID doesn't exist");
                    res.status(404).json({ "Message": "Game ID doesn't exist" });
                }
                else {
                    console.log("Found players");
                    res.status(200).json(team.players.id(playerID))
                }
            }
        });
    }
};

module.exports.addTeamPlayer = function (req, res) {
    console.log("POST a team player request");
    console.log(req.body);
    const teamID = req.params.teamID;
    if (!mongoose.isValidObjectId(teamID)) {
        console.log("Invalid team ID");
        res.status(404).json({ "Message": "Invalid team ID" });
        return;
    }
    else {
        teams.findById(teamID).select("players").exec(function (err, team) {
            if (err) {
                console.log("Error finding team");
                res.status(500).json({ "Message": "Error finding team" });
            }
            else if (!team) {
                console.log(("team ID doesn't exist"));
                res.status(404).json({ "Message": "team ID not found" });
            }
            else {
                // const newPlayer = req.body;
                const newPlayer = {
                    number:req.body.number,
                    name:req.body.name,
                    birthdate:req.body.birthdate,
                    height:req.body.height,
                    weight:req.body.weight
                }
                team.players.push(newPlayer);
                team.save(function (err, addedPlayer) {
                    if (err) {
                        console.log("Sorry! couldn't add player");
                        res.status(500).json({ "Message": "Sorry! couldn't add player" });
                    }
                    else {
                        console.log("player successfully added");
                        res.status(200).json({ "Message": "player successfully added", addedPlayer });
                    }
                });
            }
        });
    }
};

module.exports.updateTeamPlayer = function (req, res) {
    console.log("Put a team player request");
    const teamID = req.params.teamID;
    const playerID = req.params.playerID;
    if (!mongoose.isValidObjectId(teamID)) {
        console.log("Invalid team ID");
        res.status(404).json({ "Message": "Invalid team ID" });
        return;
    }
    else if (!mongoose.isValidObjectId(playerID)) {
        console.log("Invalid player ID");
        res.status(404).json({ "Message": "Invalid player ID" });
        return;
    }
    else {
        teams.findById(teamID).select("players").exec(function (err, team) {
            if (err) {
                console.log("Error finding a team");
                res.status(500).json({ "Message": "Sorry! ... Error finding a team" });
                return;
            }
            else if (!team) {
                console.log(("Team ID doesn't exist"));
                res.status(404).json({ "Message": "Team ID not found" });
            }
            else {
                team.players.id(playerID).number = req.body.number;
                team.players.id(playerID).name = req.body.name;
                team.players.id(playerID).birthdate = req.body.birthdate;
                team.players.id(playerID).height = req.body.height;
                team.players.id(playerID).weight = req.body.weight;
                team.save(function (err, team) {
                    if (err) {
                        console.log("Error updating team player");
                        res.status(500).json({ "Message": "Sorry! ... Error updating team player" });
                    }
                    else {
                        res.status(200).json({ "Message": "team player successfully updated", team });
                    }
                });

            }
        });
    }
};

module.exports.deleteTeamPlayer = function (req, res) {
    const teamID = req.params.teamID;
    const playerID = req.params.playerID;

    console.log("DELETE a team player request");
    if (!mongoose.isValidObjectId(teamID)) {
        console.log("Invalid team ID");
        res.status(404).json({ "Message": "Invalid team ID" });
        return;
    }
    else if (!mongoose.isValidObjectId(playerID)) {
        console.log("Invalid player ID");
        res.status(404).json({ "Message": "Invalid player ID" });
        return;
    }
    else {
        teams.findById(teamID).select("players").exec(function (err, team) {
            if (err) {
                console.log("Error finding a team");
                res.status(500).json({ "Message": "Error finding a team" });
            }
            else if (!team) {
                console.log("Team id not found");
                res.status(404).json({ "Message": "Team id not found" });
            }
            else {
                console.log("Found Players");
                team.players.id(playerID).remove();
                team.save(function (err, team) {
                    if (err) {
                        console.log("Error deleting team player");
                        res.status(500).json({ "Message": "Sorry! ... Error deleting team player" });
                    }
                    else {
                        res.status(200).json({ "Message": "team player successfully deleted", team});
                    }
                });
            }
        });
    }
};
