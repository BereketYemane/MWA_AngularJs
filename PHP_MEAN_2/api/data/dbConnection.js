const mongoose = require("mongoose");
require("dotenv").config({"path":".env"})

const dbName = process.env.DATABASE_NAME;
const dbURL = process.env.DATABASE_URL+dbName;
require("./team-model");

mongoose.connect(dbURL);

mongoose.connection.on("connected",function(){
    console.log("Mongoose connected to",dbName);
});

mongoose.connection.on("disconnected",function(){
console.log("Mongoose disconnected");
});

mongoose.connection.on("error",function(){
console.log("Mongoose connection error",err);
});

process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termination");
        process.exit(0);
    });
});

process.on("SIGTERM",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termination");
        process.exit(0);
    });
});

// process.on("SIGUSR2",function(){
//     mongoose.connection.close(function(){
//         console.log("Mongoose disconnected by app restart");
//         process.kill(process.pid,"SIGUSR2");
//     })
// })