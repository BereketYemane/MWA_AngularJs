const express = require("express");
const router = express.Router();
const games = require("../controllers/games.controller");

router.route("/games").get(games.getAllGames)
.post(games.addOneGame);
router.route("/games/:gameID").get(games.getOneGame)
.delete(games.deleteOneGame)
.put(games.updateOneGame);

module.exports = router;