
import { User } from "../models/user.models.js";

//@desc Add User
//@route  POST/api/v1/user/
export const SignUp = async (req, res, next) => {
    try {
        //get user details form fornt end

        const newUser = new User(req.body);

        //check if user alerady exisits

        const olduser = await User.findOne({ email:newUser.email });

        if (olduser) {
            const error = new Error(err.message);
            error.status = 409;
            return next(error);
        }

        //save user
        
        const user = await newUser.save();

        //save 

        res.json(user);
    } catch (err) {
        console.log(err);
        const error = new Error(err.message);
        error.status = 500;
        return next(error);
    }
}