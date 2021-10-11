require("dotenv").config({"path":".env"})
const express = require("express");
require("./api/data/dbConnection");
const path = require("path");
const route = require("./api/routes");

const app = express();

if(isNaN(process.env.PORT)){
    process.env.PORT = 6000;
}
process.env.PORT = process.env.PORT || 6000

app.set("port",process.env.PORT);

app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});
app.use("/node_modules",express.static(path.join(__dirname,"node_modules")));
app.use(express.static(path.join(__dirname,"public")));
app.use("/api",route)

const server = app.listen(app.get("port"),function(){
    var port = server.address().port;
    console.log("Server listening via port",port);
});