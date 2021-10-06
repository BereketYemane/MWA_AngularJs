require("../data/dbConnection");
const mongoose = require("mongoose");

const Games = mongoose.model("Game");

module.exports.getGamePublisher = function(req,res){
    console.log("Get game publisher request");
    const gameID = req.params.gameID;

    if(!mongoose.isValidObjectId(gameID)){
        console.log("Invalid game ID");
        res.status(404).json({"Message":"Invalid game ID"});
        return;
    }
    else {
        Games.findById(gameID).select("publisher").exec(function (err, game) {
            if (err) {
                console.log("Error finding game publisher");
                res.status(500).json({ "Message": "Sorry! ... Error finding game publisher" })
                return;
            }
            else {
                if (!game) {
                    console.log("Game ID doesn't exist");
                    res.status(404).json({ "Message": "Game ID doesn't exist" });
                    return;
                }
                else {
                    console.log("Found Publisher");
                    res.status(200).json(game);
                }
            }
        });
    }   
};
module.exports.addGamePublisher = function(req,res){
    console.log("POST a game publisher request");
    const gameID = req.params.gameID;

    if(!mongoose.isValidObjectId(gameID)){
        console.log("Invalid game ID");
        res.status(404).json({"Message":"Invalid game ID"});
        return;
    }
    else{
       Games.findById(gameID).select("publisher").exec(function(err,game){
            if(err){
                console.log("Error finding game");
                res.status(500).json({"Message":"Error finding game"});
            }
            else if(!game){
                console.log(("Game ID doesn't exist"));
                res.status(404).json({"Message":"Game ID not found"});
            }
            else{
                const newPublisher = req.body.publisher;
                game.publisher=newPublisher;
                game.save(function(err,addedPublisher){
                    if(err){
                        console.log("Sorry! couldn't add publisher");
                        res.status(500).json({"Message":"Sorry! couldn't add publisher"});
                    }
                    else{
                        console.log("Publisher successfully added");
                        res.status(200).json({"Message":"Publisher successfully added",addedPublisher});
                    }
                });
            }
       });
    }
};
module.exports.updateGamePublisher = function(req,res){
    console.log("Put a game publisher request");
    const gameID = req.params.gameID;
    if(!mongoose.isValidObjectId(gameID)){
        console.log("Invalid game ID");
        res.status(404).json({"Message":"Invalid game ID"});
        return;
    }
    else{
        Games.findById(gameID).select("publisher").exec(function(err,game){
            if(err){
                console.log("Error finding game");
                res.status(500).json({"Message":"Sorry! ... Error finding game"});
                return;
            }
            else if(!game){
                console.log(("Game ID doesn't exist"));
                res.status(404).json({"Message":"Game ID not found"});
            }
            else{
                game.publisher.name = req.body.name;
                game.publisher.country = req.body.country
                game.save(function(err,updatedGamePublisher){
                    if(err){
                        console.log("Sorry! couldn't update game publisher");
                        res.status(500).json({"Message":"Sorry! couldn't update game publisher"})
                    }
                    else{
                        console.log("Game ublisher successfully updated");
                        res.status(200).json({"Message":"Game publisher successfully updated",updatedGamePublisher});
                    }
                });
            }
        });
    }
};

module.exports.deleteGamePublisher = function(req,res){
    const gameID = req.params.gameID;
    console.log("DELETE a game publisher request",gameID);
    if(!mongoose.isValidObjectId(gameID)){
        console.log("Invalid game ID");
        res.status(404).json({"Message":"Invalid game ID"});
        return;
    }
    else{
        Games.findById(gameID).select("publisher").exec(function(err,game){
            if(err){
                console.log("Error finding a game");
                res.status(500).json({"Message":"Error finding a game"});
            }
            else if(!game){
                console.log("Game id not found");
                res.status(404).json({"Message":"Game id not found"});
            }
            else{
                game.publisher.remove();
                game.save(function(err,deletedGamePublisher){
                    if(err){
                        console.log("Error deleting game publisher");
                        res.status(500).json({"Message":"Sorry! ... Error deleting game publisher"});
                    }
                    else{
                        res.status(200).json({"Message":"Game publisher successfully deleted",deletedGamePublisher});
                    }
                })
            }
        });
    } 
};