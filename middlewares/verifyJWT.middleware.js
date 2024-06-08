import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js"
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.accesstoken;
        if (!token) {
            const error = new Error("Unotherized Request")
            error.status = 404
            return (next)
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findByID(decodedToken?.id).select("-password -refreshToken")

        if (!user) {
            const error = new Error("Invalid Access token");
            error.status = 401
            return (next)
        }
        req.user = user;
        next()
    } catch (error) {
        const err = new Error(error.message || "Error in verifying Token");
        err.status = 500;
        return (next);
    }

}