const express = require("express");
const router = express.Router();

const teamsController = require("../controllers/teamsController");
const playerController = require("../controllers/playersController");
const userController = require("../controllers/usersController");

router.route("/teams").get(teamsController.getAllTeams)
    .post(teamsController.addOneTeam);

router.route("/teams/:teamID").get(teamsController.getOneTeam)
    .put(teamsController.updateOneTeam)
    .delete(teamsController.deleteOneTeam);

router.route("/teams/:teamID/players").get(playerController.getAllTeamPlayers)
.post(playerController.addTeamPlayer);


router.route("/teams/:teamID/players/:playerID").get(playerController.getOneTeamPlayer)
.put(playerController.updateTeamPlayer)
.delete(playerController.deleteTeamPlayer);

router.route("/users").post(userController.addUser);

module.exports = router;
