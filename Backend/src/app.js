const express = require("express");
require("dotenv").config();

const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", //Whitelisting 
    credentials: true
}));



const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(4444, () => {
            console.log('Running the server on port 4444');
        });
    })
    .catch((err) => {
        console.error("Error connecting to the database", err);
    });
