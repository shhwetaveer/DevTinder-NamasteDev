const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json());

app.post("/signup", async (req, res) => {
    //Creating a new instance of the user model
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User Added Successfully ");
    } catch (err) {
        res.status(500).send("Error adding user", err.messa);
    }
});
//getUser by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({ emailId: userEmail });
        if (user.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }

    }
    catch (err) {
        res.status(400).send("Something went Wrong");
    }
});

//Feed API- GET /feed- get allthe usres from the database
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.status(500).send("Error fetching users");
    }

});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User Deleted Successfully");
    }
    catch (err) {
        res.status(500).send("Error fetching users");
    }

})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate(userId, data, {
             returnDocument: 'after',
            runValidators: true
        });
        res.send("User Updated Successfully");
    }
    catch (err) {
        res.status(404).send("Something went wrong");
    }
});

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


