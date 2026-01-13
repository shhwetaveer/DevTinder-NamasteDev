const mongoose = require('mongoose');


const connectionRequestSchema = new mongoose.Schema(
    {
            formUserId: 
            { type:mongoose.Schema.Types.ObjectId,
                ref: "User", //refernce to the user collection
                required:true
            },
            toUserId:
            { type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required:true
            },
            status:
            { type: String,
                required:true,
                enum:{ 
                    values: ['interested','ignored', 'accepted', 'rejected'],
                    message: '{VALUE} is incorrect status type',},
            },
        },

    {
        timestamps: true
    });
  
connectionRequestSchema.index({formUserId:1,
    toUserId:1
});

connectionRequestSchema.pre("save", function(){
    const connectionRequest = this;
    // check if from is same as to 
    if(connectionRequest.formUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send connection request to yourself");
    } 
});

const connectionRequestModel = mongoose.model('ConnectionRequest', connectionRequestSchema);
module.exports = connectionRequestModel;