require("../data/dbConnection");
const mongoose = require("mongoose");

const Games = mongoose.model("Game");

module.exports.getAllGameReviews = function (req, res) {
    console.log("GET all game reviews request");
    const gameID = req.params.gameID;
    if (!mongoose.isValidObjectId(gameID)) {
        console.log("Invalid gameID");
        res.status(404).json({ "Message": "Invalid game ID" });
        return;
    }
    else {
        Games.findById(gameID).select("reviews").exec(function (err, game) {
            if (err) {
                console.log("Error finding game reviews");
                res.status(500).json({ "Message": "Sorry! couldn't find game reviews" });
                return;
            }
            else {
                if (!game) {
                    console.log("Game ID doesn't exist");
                    res.status(404).json({ "Message": "Game ID doesn't exist" });
                }
                else {
                    console.log("Found revies");
                    res.status(200).json(game);
                }
            }
        });
    }
};

module.exports.getOneGameReview = function (req, res) {
    console.log("GET one game review request");
    const gameID = req.params.gameID;
    const reviewID = req.params.reviewID;
    if (!mongoose.isValidObjectId(gameID)) {
        console.log("Invalid gameID");
        res.status(404).json({ "Message": "Invalid game ID" });
        return;
    }
    else if (!mongoose.isValidObjectId(reviewID)) {
        console.log("Invalid reviewID");
        res.status(404).json({ "Message": "Invalid review ID" });
        return;
    }
    else {
        Games.findById(gameID).select("reviews").exec(function (err, game) {
            if (err) {
                console.log("Error finding game reviews");
                res.status(500).json({ "Message": "Sorry! couldn't find game reviews" });
                return;
            }
            else {
                if (!game) {
                    console.log("Game ID doesn't exist");
                    res.status(404).json({ "Message": "Game ID doesn't exist" });
                }
                else {
                    const review = game.reviews.id(reviewID);
                    console.log("Review found");
                    res.status(200).json(review);
                }
            }
        });
    }
};
module.exports.addGameReviews = function (req, res) {
    console.log("POST a game review request");
    const gameID = req.params.gameID;
    if (!mongoose.isValidObjectId(gameID)) {
        console.log("Invalid game ID");
        res.status(404).json({ "Message": "Invalid game ID" });
        return;
    }
    else {
        Games.findById(gameID).select("reviews").exec(function (err, game) {
            if (err) {
                console.log("Error finding game");
                res.status(500).json({ "Message": "Error finding game" });
            }
            else if (!game) {
                console.log(("Game ID doesn't exist"));
                res.status(404).json({ "Message": "Game ID not found" });
            }
            else {
                const newReview = req.body;
                    game.reviews.push(newReview);
                    game.save(function (err, addedReviews) {
                        if (err) {
                            console.log("Sorry! couldn't add reviews");
                            res.status(500).json({ "Message": "Sorry! couldn't add reviews" });
                        }
                        else {
                            console.log("reviews successfully added");
                            res.status(200).json({ "Message": "reviews successfully added", addedReviews });
                        }
                    }); 
            }
        });
    }
};

module.exports.deleteOneGameReview = function (req, res) {
    const gameID = req.params.gameID;
    const reviewID = req.params.reviewID;

    console.log("DELETE a game review request", gameID);
    if (!mongoose.isValidObjectId(gameID)) {
        console.log("Invalid game ID");
        res.status(404).json({ "Message": "Invalid game ID" });
        return;
    }
    else if (!mongoose.isValidObjectId(reviewID)) {
        console.log("Invalid review ID ID");
        res.status(404).json({ "Message": "Invalid review ID" });
        return;
    }
    else {
        Games.findById(gameID).select("reviews").exec(function (err, game) {
            if (err) {
                console.log("Error finding a game");
                res.status(500).json({ "Message": "Error finding a game" });
            }
            else if (!game) {
                console.log("Game id not found");
                res.status(404).json({ "Message": "Game id not found" });
            }
            else {
                console.log(game);
                console.log("Found reviews");
                var reviewFound = false;
                for (let i = 0; i < game.reviews.length; i++) {
                    if (game.reviews[i].id == reviewID) {
                        console.log("Review found");
                        reviewFound = true;
                        game.reviews[i].remove();
                        game.save(function (err, game) {
                            if (err) {
                                console.log("Error deleting game review");
                                res.status(500).json({ "Message": "Sorry! ... Error deleting game review" });
                            }
                            else {
                                res.status(200).json({ "Message": "Game review successfully deleted", game });
                            }
                        });
                    }
                }
                if (!reviewFound) {
                    console.log("Review ID doesn't exist");
                    res.status(404).json({ "Message": "Review ID doesn't exist" });
                    return;
                }

            }
        });
    }
};

module.exports.updateGameReview = function (req, res) {
    console.log("Put a game review request");
    const gameID = req.params.gameID;
    const reviewID = req.params.reviewID;
    if (!mongoose.isValidObjectId(gameID)) {
        console.log("Invalid game ID");
        res.status(404).json({ "Message": "Invalid game ID" });
        return;
    }
    else if (!mongoose.isValidObjectId(reviewID)) {
        console.log("Invalid review ID");
        res.status(404).json({ "Message": "Invalid review ID" });
        return;
    }
    else {
        Games.findById(gameID).select("reviews").exec(function (err, game) {
            if (err) {
                console.log("Error finding a game");
                res.status(500).json({ "Message": "Sorry! ... Error finding a game" });
                return;
            }
            else if(!game){
                console.log(("Game ID doesn't exist"));
                res.status(404).json({"Message":"Game ID not found"});
            }
            else {
                console.log("Found reviews");
                var reviewFound = false;
                for (let i = 0; i < game.reviews.length; i++) {
                    if (game.reviews[i].id == reviewID) {
                        console.log("Review found");
                        reviewFound = true;
                        game.reviews[i]=req.body.review;
                        game.save(function (err, game) {
                            if (err) {
                                console.log("Error updating game review");
                                res.status(500).json({ "Message": "Sorry! ... Error updating game review" });
                            }
                            else {
                                res.status(200).json({ "Message": "Game review successfully updated", game });
                            }
                        });
                    }
                }
                if (!reviewFound) {
                    console.log("Review ID doesn't exist");
                    res.status(404).json({ "Message": "Review ID doesn't exist" });
                    return;
                }
            }
        });
    }
};