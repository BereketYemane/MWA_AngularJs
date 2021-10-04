const express = require("express");
const router = express.Router();
const games = require("../controllers/games.controller");
const publisher = require("../controllers/publisher.controller");

router.route("/games").get(games.getAllGames)
.post(games.addOneGame);

router.route("/games/:gameID").get(games.getOneGame)
.delete(games.deleteOneGame)
.put(games.updateOneGame);

router.route("/games/:gameID/publisher").get(publisher.getGamePublisher)
.post(publisher.addGamePublisher)
.put(publisher.updateGamePublisher)
.delete(publisher.deleteGamePublisher);

module.exports = router;