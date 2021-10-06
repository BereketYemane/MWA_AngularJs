const express = require("express");
const router = express.Router();
const games = require("../controllers/games.controller");
const publisher = require("../controllers/publisher.controller");
const reviews = require("../controllers/reviews.controller");

router.route("/games").get(games.getAllGames)
.post(games.addOneGame);

router.route("/games/:gameID").get(games.getOneGame)
.delete(games.deleteOneGame)
.put(games.updateOneGame);

router.route("/games/:gameID/publisher").get(publisher.getGamePublisher)
.post(publisher.addGamePublisher)
.put(publisher.updateGamePublisher)
.delete(publisher.deleteGamePublisher);

router.route("/games/:gameID/reviews").get(reviews.getAllGameReviews)
.post(reviews.addGameReview);

router.route("/games/:gameID/reviews/:reviewID").get(reviews.getOneGameReview)
.put(reviews.updateGameReview)  
.delete(reviews.deleteOneGameReview);

module.exports = router;