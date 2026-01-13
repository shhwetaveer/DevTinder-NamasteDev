const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            throw new Error("No token found");
        }
        const decodedObj = await jwt.verify(token, "Shweta@12345");
        const user = await User.findById(decodedObj.id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).send("Error: " + err.message);
    }
};

module.exports = { userAuth };
