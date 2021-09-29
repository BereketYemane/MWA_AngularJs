const child_process= require("child_process");
console.log("1: Start");
const newProcess= child_process.spawn("node",
["./fibonacci.js"], {stdio : "inherit"});
console.log("2: End");