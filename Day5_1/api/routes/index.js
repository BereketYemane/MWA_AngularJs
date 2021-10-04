const express = require("express");
const router = express.Router();
const games = require("../controllers/games.controller");

router.route("/games").get(games.getAllGames);
router.route("/games/:gameID").get(games.getOneGame);

module.exports = router;