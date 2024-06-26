
import express from 'express';
import dbconnect from './config/db.config.js';
import errorResponse from './middlewares/errorResponse.middleware.js';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { handleResponse } from './utils/HandleResponse.js';

const app = express();
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 8000;

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

dbconnect();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(cookieParser());

// Routes imports
import UserRouter from './Routers/user.router.js';
import EventRouter from './Routers/event.router.js';
import BookingRouter from './Routers/booking.router.js';

app.use("/api/v1/users/", UserRouter);
app.use("/api/v1/events/", EventRouter);
app.use("/api/v1/booking/", BookingRouter);

// Add test route
// app.get("/test", (req, res) => {
//     console.log("OUTPUT");
//     res.send("Test route is working");
// });

app.use((req, res, next) => {
    return handleResponse(res, 500, null, new Error("Page Not Found"), next);
});

app.use(errorResponse);

app.listen(port, () => console.log(`Server is running on port ${port}`));
