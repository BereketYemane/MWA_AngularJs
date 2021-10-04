
const express = require("express");
require("./api/data/dbConnection");
const route = require("./api/routes");

const app = express();
app.set("port",3000);

app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use("/api",route)

const server = app.listen(app.get("port"),function(){
    var port = server.address().port;
    console.log("Server listening via port",port);
});