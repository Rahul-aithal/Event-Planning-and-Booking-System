import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyToken = async (req, res, next) => {
        const token = req.cookies.accessToken;
        //console.log(req.cookies);

    
        if (token === undefined) {
            const error = new Error("Unotherized Request")
            error.status = 404
            return (next)
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //console.log(decodedToken);


        const user = await User.findById(decodedToken.id).select("-password -refreshToken")
        //console.log(user);




        if (!user) {
            const error = new Error("Invalid Access token");
            error.status = 401
            return (next)
        }
        req.user = user;
        try {
            //console.log("Passed");
            next();
        }
        catch (err) {
            //console.log(err);
        }
 

}