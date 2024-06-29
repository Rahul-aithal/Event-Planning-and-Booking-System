
import { User } from "../../models/user.model.js";
import { handleResponse } from "../../utils/HandleResponse.js";
import {generateAccessTokenAndRefreshToken} from './LogController.js'

//@desc Add User
//@route  POST/api/v1/user/register

export const register = async (req, res, next) => {

    try {
        //get user details form fornt end

        // const newUser = new User(req.body);
        const { username, email, password } = req.body;
        //check if user alerady exisits

        const olduser = await User.findOne({ email });

        if (olduser) {
            return handleResponse(res, 409, null,new Error("User alerady exists"), next);
        }

        //save user
        const user = await User.create({
            username,
            email,
            password
        });


        const { accessToken, refreshToken }=await generateAccessTokenAndRefreshToken(user._id)
       
        const options = {
            httpOnly: true,
            secure: true,
            path:"/",
            sameSite: 'None',
        };

        return res.status(200).
            cookie("accessToken", accessToken, options).
            cookie("refreshToken", refreshToken, options).
            json({ message: "Success in Login", accessToken: accessToken });
        

    } catch (error) {
        return handleResponse(res, 500, error.data, error, next);

    }
}