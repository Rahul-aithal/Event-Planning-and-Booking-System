
import express from 'express';
import dbconnect from './config/db.config.js';
import errorhandler from './middlewares/errorhandel.js';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config({
    path: "./env"

});

const port = process.env.PORT || 8000;

app.use(cors({
    origin: process.env.CORS_ORGIN,
    credentials: true
}));

dbconnect();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({
    extended: false,
    limit: "16kb"
}));
app.use(cookieParser());

//routes imports
import UserRouter from './Routers/user.router.js';
import LoginRouter from './Routers/login.router.js';


// routes
app.use("/api/v1/users/", UserRouter);
app.use("/api/v1/auth/", LoginRouter);
app.use((req, res, next) => {
    const error = new Error("Page not found");
    error.status = 404;
    next(error);
});

app.use(errorhandler);

app.listen(port, () => console.log(`The port is listening at ${port} `));