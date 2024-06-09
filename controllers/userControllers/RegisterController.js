
import { User } from "../../models/user.model.js";
import { handleResponse } from "../../utils/HnadleResponse.js";

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

       return handleResponse(res, 200, await User.findById(user.id),null, next);

    } catch (error) {
        return handleResponse(res, 500, error.data, error, next);

    }
}