const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema(
    {
            formUserId: 
            { type:mongoose.Schema.Types.ObjectId,
                required:true
            },
            toUserId:
            { type: mongoose.Schema.Types.ObjectId,
                required:true
            },
            status:
            { type: String,
                enum:{ 
                    values: ['interested','ignored', 'accepted', 'rejected'],
                    message: '{VALUE} is incorrect status type'}
            },
        },

    {
        timestamps: true
    });

const connectRequestModel = mongoose.model('ConnectionRequest', connectionRequestSchema);
module.exports = connectRequestModel;
