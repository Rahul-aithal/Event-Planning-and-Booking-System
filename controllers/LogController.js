import { comparePassword } from "../utils/HandlePassword.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";


const generateAccessTokenAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generaterefreshToken();

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    }
    catch (error) {
        throw new Error(error.message, "WHILE GENERATING TOKENS");


    }
}



export const Login = async (req, res, next) => {
    const { email, password } = req.body

    try {

        const user = await User.findOne({ email: email })
        if (!user) {
            const error = new Error(" Email is Inavalid")
            error.status = 401
            return next(error)
        }
        const userPassword = user.password
        if (!comparePassword(password, userPassword)) {
            const error = new Error("Enter correct Password")
            error.status = 401
            return next(error)
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true
        };

        res.status(200).
            cookie("accessToken", accessToken, options).
            cookie("refreshToken", refreshToken, options).
            json({ message: "Success in Login", accessToken: accessToken });


    } catch (error) {
        const err = new Error(error.message, "WHILE LOGING IN")
        err.status = 500
        return next(err)
    }
}


export const LogOut = async (req, res, next) => {

    const userId = req.user.id
    // Find the user document by ID
    const user = await User.findById(userId);

    // Update the user document fields
    user.refreshToken = undefined; // Clear refreshToken
    user.updatedAt = Date.now(); // Update updatedAt field

    // Save the updated user document
    const updatedUser = await user.save();

    console.log("Passed", updatedUser);

    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(200).
        clearCookie("accessToken", options).
        clearCookie("refreshToken", options).
        json({ message: "Success in LogOut", "USER": await User.findById(userId) })


}


export const refreshAccessToken = async (req, res, next) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        const error = new Error("Unautherized Request  ");
        error.status = 404;
        return (error);
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(decodedToken);

        const user = await User.findById(decodedToken?.id);

        if (!user) {
            const error = new Error("Invalid Referesh Token");
            error.stauts = 405;
            return error;
        }

        if (incomingRefreshToken !== user.refreshToken) {
            const error = new Error(" Referesh Token is Expired or invalid");
            error.stauts = 405;
            return error;
        }

        const options = {
            httpOnly: true,
            secure: true
        };
        const { accessToken, newRefreshToken } = await generateAccessTokenAndRefreshToken(user.id);
        res.status(200).
            cookie("acessToken", accessToken,options).
            cookie("refreshToken", newRefreshToken,options).
            json({ message: "Sucess in Accessing new Tokenes", "AccessToken": accessToken })

    } catch (error) {
        const err = new Error(error.message || " Error in Referesh Token ");
        err.stauts = 500;
        return err;
    }
}   