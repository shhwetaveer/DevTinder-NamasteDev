const mongoose = require("mongoose");

const connectDB = async () => {
    return mongoose.connect(process.env.MONGO_DB);
};

module.exports = connectDB;
