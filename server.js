
import express from 'express';
import dbconnect from './config/db.config.js';
import UserRouter from './Routers/user.router.js';
import LoginRouter from './Routers/login.router.js';
import errorhandler from './middlewares/errorhandel.js';
import 'dotenv/config';
const app = express();
const port =process.env.PORT ||8000;

dbconnect();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/user/",UserRouter);
app.use("/api/auth/",LoginRouter);

app.use((req,res,next)=>{
    const  error = new Error("Page not found");
    error.status= 404;
    next(error);
});

app.use(errorhandler);

app.listen(port, () => console.log(`The port is listening at ${port} `));