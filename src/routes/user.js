const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');


const USER_SAFE_DATA =" firstName lastName email skills about photoURL";
// get all the pending connection for the logged in user
userRouter.get("/request/recieved", userAuth, async (req, res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("formUserId", USER_SAFE_DATA);

        res.json({
            message: "Connection requests fetched successfully",
            data: connectionRequest
        });
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
}); 

userRouter.get("/request/sent", userAuth, async (req, res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {formUserId: loggedInUser._id, status:"accepted"}
            ],

        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        }); 

        res.json({ data});
    }
    catch(err){
        res.status(400).send({
            message: err.message
        })
    }

});

userRouter.get("/feed", userAuth, async (req, res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id}, 
                {fromUserId: loggedInUser._id}],
        }).select("fromUserId toUserId").populate("fromUserId", "firstName").populate("toUserId", "firstName");


        const hideUsersFromFeed = new Set();
        connectionRequest.forEach(req =>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
          $and: [
            {_id:{$nin: Array.from(hideUsersFromFeed)}},
            {_id: {$ne: loggedInUser._id}},
                ], 
        });



        res.send(connectionRequest);
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
});
module.exports = userRouter;  