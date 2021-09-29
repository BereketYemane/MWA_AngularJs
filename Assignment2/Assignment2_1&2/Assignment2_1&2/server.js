const express = require("express");
const path = require("path");

const app = express();
app.set("port",5353);

app.use(express.static(path.join(__dirname,"public")));


var server = app.listen(app.get("port"),function(){
    var port = server.address().port;
    console.log("Listening to port "+port);
});


