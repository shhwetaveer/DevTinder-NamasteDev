const mongoose = require('mongoose');

// returns a promise 
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://veershweta2003_db_user:ql5qBeXTvCYxZlOF@devtycoon.bo5jvms.mongodb.net/devTinder");

}
module.exports = connectDB;



