const express = require("express");
const router = express.Router();
const allGames = require("../controllers/games.controller");

router.route("/games").get(allGames.getAllGames);
module.exports = router 