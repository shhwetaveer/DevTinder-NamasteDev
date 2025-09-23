const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const { isStrongPassword } = require('validator');
app.use(express.json());

app.post("/signup", async (req, res) => {
    //Validating the data
    try {
        const { fisrtName, lastName, emailId, password } = req.body;
        validateSignUpData(req);
        //Encrytion
        const passwordHash = await bcrypt.hash(password, 10);

        //Creating a new instance of the user model
        const user = new User({
            fisrtName, 
            lastName, 
            emailId, 
            password: passwordHash
        });
        await user.save();
        res.send("User Added Successfully ");
    } catch (err) {
        res.status(400).send("ERROR: ", err.message);
    }
});

app.post("/login", async (req, res) => {
    try{
        const { emailId, password } = req.body;
        
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            res.send("Login Successful");
        }
        else{
            throw new Error("Invalid Credentials");
        }
    }        catch (err) {
        res.status(400).send("Error:"+ err.message);
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

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoURL", "skills", "about"];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k));

        if (!isUpdateAllowed) {
            return res.status(400).send("Invalid updates");
        }

        if (data?.skills.length > 5) {
            throw new Error("Skills cannot be more than 5");
        }
        const updatedUser = await User.findByIdAndUpdate(userId, data, {
            new: true,
            runValidators: true,
            strict: false
        });
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.send(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(400).send("Something went wrong: " + err.message);
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


