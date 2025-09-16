const express = require('express');
const app = express();

app.get("/apple",(req, res) =>{
    res.send("Apple is good for health");
});

app.get("/Hi",(req, res) =>{
    res.send("what do you want?");
});

app.use("/", (req, res) =>{
    res.send("Welcome to the Dashboard");
});

app.listen( 4444 ,() => {
    console.log('Running the server on port 4444');
});
