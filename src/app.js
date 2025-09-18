const express = require('express');
const connectDB = require('./config/database');
const app = express();

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(4444, () => {
    console.log('Running the server on port 4444');
});
    })
    .catch((err) => {
        console.error("Error connecting to the database");
    });


