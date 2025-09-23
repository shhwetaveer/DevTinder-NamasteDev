const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    fisrtName: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 25

    },
    lastName: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 25
    }, 
    emailId: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minLength: 8,
                    validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is not strong enough");
            }
        }

    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Such gender does not exist")
            }
        },
    },
    photoURL: {
        type: String,
        default: "Some random photo",
            validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo URL is invalid");
            }
        }
    },
    skills: {
        type: [String]
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;