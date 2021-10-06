require("../data/dbConnection");
const { response } = require("express");
const mongoose = require("mongoose");

const Games = mongoose.model("Game");

module.exports.getAllGames = function (req, res) {
    console.log("GET all games request");
    var offset = 0, count = 6,maxCount=9;
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
        console.log("Offset", offset);
    }
    if (req.query.count) {
        var tempCount = parseInt(req.query.count);
        if(tempCount>maxCount){
            res.status(404).send(`You cannot retrieve more than ${maxCount} games at a time`);
            return;
        }
        else{
            count = tempCount;
            console.log("Count", count);
        }
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(404).json({ "Messge": "QueryString offset and count should be numbers" });
        return;
    }
    else {
        Games.find().skip(offset).limit(count).exec(function (err, games) {
            if (err) {
                console.log("Error finding games");
                res.status(500).json({ "Message": "Sorry! ... Error finding games" });
                return
            }
            else {
                console.log("Games found");
                res.status(200).json(games);
            }
        });
    }
};
module.exports.getOneGame = function(req,res){
    const gameID = req.params.gameID;
    console.log("GET one game request",gameID);

    if(!mongoose.isValidObjectId(gameID)){
        console.log("Invalid game ID");
        res.status(404).json({"Message":"Invalid game ID"});
        return;
    }
    else{
        Games.findById(gameID).exec(function(err,game){
            if(err){
                console.log("Error finding game");
                res.status(500).json({"Message":"Sorry! ... Error finding game"})
                return;
            }
            else{
                if(!game){
                    console.log("Game ID doesn't exist");
                    res.status(404).json({"Message":"Game ID doesn't exist"});
                    return;
                }
                else{
                    console.log("Found game");
                    res.status(200).json(game);
                }
            }

        });
    }
};
module.exports.addOneGame = function(req,res){
    console.log("POST a game request");
    const newGame = req.body;
    Games.create(newGame, function (err, addedGame) {
        if (err) {
            console.log("Error creating a game");
            res.status(500).json({"Message":"Error creating a game"});
        }
        else {
            console.log("Game created!");
            res.status(201).json({"Message":"Game successfully added",addedGame});
        }
    });
};

module.exports.deleteOneGame = function(req,res){
    const gameID = req.params.gameID;
    console.log("DELETE a game request",gameID);
    if(!mongoose.isValidObjectId(gameID)){
        console.log("Invalid game ID");
        res.status(404).json({"Message":"Invalid game ID"});
        return;
    }
    else{
        Games.findByIdAndRemove(gameID).exec(function(err,deletedGame){
            console.log("DeletedGame",deletedGame);
            if(err){
                console.log("Error finding a game");
                res.status(500).json({"Message":"Error finding a game"});
            }
            else if(!deletedGame){
                console.log("Game id not found");
                res.status(404).json({"Message":"Game id not found"});
            }
            else{
                res.status(200).json({"Message":"Game successfully deleted",deletedGame});
                // res.status(response.status).json(response.message);
            }
        });
    } 
};
module.exports.updateOneGame = function(req,res){
    console.log("PUT a game request(Full update");
    const gameID = req.params.gameID;
    if(!mongoose.isValidObjectId(gameID)){
        console.log("Invalid game ID");
        res.status(404).json({"Message":"Invalid game ID"});
        return;
    }
    else{
        Games.findById(gameID).exec(function(err,game){
            if(err){
                console.log("Error finding game");
                res.status(500).json({"Message":"Sorry! ... Error finding game"})
                return;
            }
            else{
                if(!game){
                    console.log("Game ID doesn't exist");
                    res.status(404).json({"Message":"Game ID doesn't exist"});
                    return;
                }
                else{
                    game.title=req.body.title,
                    game.rate=req.body.rate,
                    game.price=req.body.price,
                    game.minAge=req.body.minAge,
                    game.designers=req.body.designers,
                    game.publisher=req.body.publisher
                    game.save(function(err,updatedGame){
                        if(err){
                            console.log("Error updating the game");
                            res.status(500).json({"Message":"Error updating the game"});
                        }
                        else{
                            res.status(200).json({"Message":"Game successfully updated",updatedGame});
                        }
                    });
                }
            }

        });
    }

}
