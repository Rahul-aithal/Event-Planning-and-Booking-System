import { comparePassword } from "../../utils/HandlePassword.js";
import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";


export const generateAccessTokenAndRefreshToken = async (userID) => {
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
            return handleResponse(res,404,_,new Error("User not found"),next);
        }
        const userPassword = user.password
        if (!comparePassword(password, userPassword)) {
            return handleResponse(res,403,_,new Error("Enter correct Password"),next);
            
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true,
            path:"/",
            sameSite: 'None',
        };

        res.status(200).
            cookie("accessToken", accessToken, options).
            cookie("refreshToken", refreshToken, options).
            json({ message: "Success in Login", accessToken: accessToken });


    } catch (error) {
        return handleResponse(res,500,_,error,next);
    }
}


export const LogOut = async (req, res, next) => {

    const userId = req.user._id
    // Find the user document by ID
    const user = await User.findById(userId);

    // Update the user document fields
    user.refreshToken = undefined; // Clear refreshToken
    user.updatedAt = Date.now(); // Update updatedAt field

    // Save the updated user document
    const updatedUser = await user.save();


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
        return handleResponse(res,404,_,new Error("Unautherized Request  "),next);
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return handleResponse(res,405,_,new Error("Invalid Referesh Token"),next);

        }

        if (incomingRefreshToken !== user.refreshToken) {
            return handleResponse(res,405,_,new Error(" Referesh Token is Expired or invalid"),next);
        }

        const options = {
            httpOnly: true,
            secure: true
        };
        const { accessToken, newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id);
        res.status(200).
            cookie("acessToken", accessToken,options).
            cookie("refreshToken", newRefreshToken,options).
            json({ message: "Sucess in Accessing new Tokenes", "AccessToken": accessToken })

    } catch (error) {
        return handleResponse(res,500,_,error,next);

    }
}   