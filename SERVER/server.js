
import express from 'express';
import dbconnect from './config/db.config.js';
import errorRespose from './middlewares/errorRespose.middleware.js';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { handleResponse } from './utils/HnadleResponse.js';

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
import EevntRouter from './Routers/event.router.js';
import BookingRouter from './Routers/booking.router.js';



// routes
app.use("/api/v1/users/", UserRouter);
app.use("/api/v1/events/",EevntRouter);
app.use("/api/v1/booking/",BookingRouter);


app.use(( req, res, next) => {
    return handleResponse(res,500,null,new Error("Page Not Found"),next);
});

app.use(errorRespose);

app.listen(port, () => console.log(`The port is listening at ${port} `));