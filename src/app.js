const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.post("/signup", async (req,res) => {
    //Creating a new instance of the user model
    const user = new User({
        fisrtName :"Sonali",
        LastName : "Veer",
        emailId : "sona@gmail.com",
        password: "sona@123"
    });

    await user.save();
    res.send("User Added Successfully 2");
})

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(4444, () => {
    console.log('Running the server on port 4444');
});
    })
    .catch((err) => {
        console.error("Error connecting to the database");
    });


