
import { User } from "../models/user.models.js";
import { handleResponse } from "../utils/HnadleResponse.js";

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
            handleResponse(res, 409, null,new Error("User alerady exists"), next);
        }

        //save user
        const user = await User.create({
            username,
            email,
            password
        });

        const data = await User.findById(user.id);
        handleResponse(res, 200, data,null, next);

    } catch (error) {
        handleResponse(res, 500, error.data, error, next);

    }
}