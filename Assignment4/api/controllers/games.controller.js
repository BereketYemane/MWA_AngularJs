const dbConnection = require("../data/dbConnection");

module.exports.getAllGames = function (req, res) {
    console.log("GET all games request");

    const db = dbConnection.get();
    console.log("db is",db)

    const gamesCollection = db.collection("games");

    var offset = 0;
    var count = 6;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
        console.log("offset", offset);
    }
    if (req.query && req.query.count) {
        var tempCount= parseInt(req.query.count);
        if(tempCount>9){
            res.status(404).send("you cannot see more than 9 games at a time");
            return
        }
        else{
            count = tempCount;
            console.log("count", count);
        }
    }
    gamesCollection.find().skip(offset).limit(count).toArray(function(err,games){
        if(err){
            res.status(501).send(err);
            return
        }
        else{
            res.status(200).json(games);
        }
    })
};



