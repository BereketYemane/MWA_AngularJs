const allGames = require("../data/games.json");
module.exports.getAllGames = function (req, res) {
    console.log("GET all games request");
    var offset = 0;
    var count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
        console.log("offset", offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
        console.log("count", count);
    }
    const pageGames = allGames.slice(offset, offset + count);
    res.status(200).json(pageGames);
};

module.exports.getMultiplicationResult = function (req, res) {
    console.log("GET multiplication result");
    const num1 = parseInt(req.params.num1);
    if (req.query.num2) {
        const num2 = parseInt(req.query.num2);
        const result = num1 * num2;
        res.status(200).send("The result of multiplying " + num1 + " and " + num2 + " is = " + result);
    }
    else {
        res.status(404).send("Please enter num2 as a query");
    }
};


