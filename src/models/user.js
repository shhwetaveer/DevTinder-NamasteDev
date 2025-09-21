const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fisrtName: {
        type: String,
        unique: true,
        required: true,
        minLength: 25
    },
    lastName: {
        type: String,
        unique: true,
        required: true    },
    emailId: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minLength: 8

    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error ("Such gender does not exist")
            }
        },
    },
    photoURL:{
        type: String,
        default: "Some random photo"
    },
    Skills: {
        type: [String]
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;