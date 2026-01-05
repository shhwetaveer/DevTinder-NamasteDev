const express = require('express');
const connectDB = require('./config/database');
const app = express();
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());


const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);


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
