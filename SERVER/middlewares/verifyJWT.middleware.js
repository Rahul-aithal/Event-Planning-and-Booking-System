import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { handleResponse } from "../utils/HandleResponse.js";


export const verifyToken = async (req, res, next) => {
        const token = req.cookies.accessToken;


    
        if (token === undefined) {
            const error = new Error("Unotherized Request")
            error.status = 404
            return (next)
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


        const user = await User.findById(decodedToken.id).select("-password -refreshToken")




        if (!user) {
            const error = new Error("Invalid Access token");
            error.status = 401
            return (next)
        }
        req.user = user;
        try {
            
            next();
        }
        catch (err) {
handleResponse(res,500,_,err,next);
        }
 

}