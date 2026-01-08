const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');

// get all the pending connection for the logged in user
userRouter.get("/user/request/recieved", userAuth, async (req, res) =>{
    try{
        const loggedInUser = req.user;

        const ConnectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "recieved"
        });
    }
    catch(err){
        req.statusCode(400).send("ERROR: "+err.message);
    }
});

module.exports = userRouter;