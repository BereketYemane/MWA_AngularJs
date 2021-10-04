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
                    var playerFound = false;
                    for (let i = 0; i < team.players.length; i++) {
                        if (team.players[i].id == playerID) {
                            console.log("player found");
                            playerFound = true;
                            res.status(200).json(team.players[i]);
                            return;
                        }
                    }
                    if (!playerFound) {
                        console.log("player ID doesn't exist");
                        res.status(404).json({ "Message": "player ID doesn't exist" });
                        return;
                    }
                }
            }
        });
    }
};

module.exports.addTeamPlayers = function (req, res) {
    console.log("POST a team player request");
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
                const newPlayer = req.body.player;
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