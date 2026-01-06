const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const {connectRequestModel} = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post(
    "/request/send/:status/:toUserId", 
    userAuth, 
    async (req, res) => {
        try{
            const formUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;

            //Only One type of connection request 


            //User can't send request to themselves
            const toUser = await User.findById(toUserId);
            if(!toUser){
                return res.status(404).json({
                    message: "User not found",
                })
            }

            //2 users cannot send same request to each other 
            const existingConnectionRequest = await connectionRequest.findOne({

                // to-do
            })

            const connectionRequest = new connectionRequest({
                formUserId,
                toUserId,
                status,
            });


            const data = await connectionRequest.save();

            res.json({
                message: "Connection request sent successfully",
                data,
            });
        }
        catch(err){
            res.status(400).send("ERROR: "+ err.message);
        }
    
});

module.exports = requestRouter;