require("../data/dbConnection");
const mongoose = require("mongoose");

const Games = mongoose.model("Game");

module.exports.getAllGames = function (req, res) {
    console.log("GET all games request");
    var offset = 0, count = 6,maxCount = 9;
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
    console.log("GET one game request");
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
                    console.log("Found game");
                    res.status(200).json(game);
                }
            }

        });
    }
};