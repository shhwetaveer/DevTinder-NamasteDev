const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25
    },
    emailId: {
        type: String,
        unique: true, //automatically creates index
        required: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
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
        default: "",
        validate(value) {
            if (!value) return true;
            return validator.isURL(value);
        }
    }
    ,
    skills: {
        type: [String]
    }
},
    {
        timestamps: true
    }
);

userSchema.methods.getJWT = async function () {
    //this keyword does not works with arrow function
    const user = this;
    const token = jwt.sign({ id: user._id }, "Shweta@12345", {
        expiresIn: "7d"
    });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid;
}

const User = mongoose.model('User', userSchema);
module.exports = User;