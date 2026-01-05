const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validateSignUpData} = require('../utils/validation');

authRouter.post("/signup", async (req, res) => {
    //Validating the data
    try {
        const { firstName, lastName, emailId, password, age } = req.body;
        validateSignUpData(req);
        //Encrytion
        const passwordHash = await bcrypt.hash(password, 10);

        //Creating a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            age
        });
        await user.save();
        res.send("User Added Successfully ");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {

            const token = await user.getJWT();

            res.cookie("token", token,{
                expires: new Date(Date.now() + 8 * 3600000)
            });
            res.send("Login Successful");
        }
        else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }
});

authRouter.post("/logout", async(req,res) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful");
});
   
module.exports = authRouter;