const express = require("express");
const router = express.Router();
const allGames = require("../constroller/games.controller");

router.route("/games").get(allGames.getAllGames);
router.route("/multiplication/:num1").get(allGames.getMultiplicationResult);
module.exports = router 