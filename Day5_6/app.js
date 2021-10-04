const { urlencoded } = require("express");
const express = require("express");
const route = require("./api/routes");
require("./api/data/dbConnection");

const app = express();
app.set("port",3000);

app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}))

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use("/api",route)

var server = app.listen(app.get("port"),function(){
    var port = server.address().port;
    console.log("App listening via port",port);
});
