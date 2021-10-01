require("./api/data/dbConnection").open();
const express = require("express");
const path = require("path");
const route = require("./api/routes");

const app = express();
app.set("port",5353);

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use(express.static(path.join(__dirname,"public")));
app.use(route);

var server = app.listen(app.get("port"),function(){
    var port = server.address().port;
    console.log("Listening to port "+port);
});