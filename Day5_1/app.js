require("dotenv").config({"path":".env"});
const express = require("express");
const path = require("path");
require("./api/data/dbConnection");
const route = require("./api/routes");

console.log("PORT from env is", process.env.PORT);
const app = express();

if(isNaN(process.env.PORT)){
    process.env.PORT=6000;
}
process.env.PORT = process.env.PORT || 6000
app.set("port",process.env.PORT);

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});
app.use(express.static(path.join(__dirname,"public")));
app.use("/api",route);

var server = app.listen(app.get("port"),function(){
    var port = server.address().port;
    console.log("App listing via port",port);
})

