import {hashedPassword} from "../middlewares/HandlePassword.js";
import { User } from "../models/user.models.js";

//@desc Add User
//@route  POST/api/user/:id
export const SignUp = async (req, res, next) => {
    try {
        const newUser = new User(req.body)
        let {password} = req.body
        newUser.password = await hashedPassword(password)
        const user = await newUser.save()
        res.json(user)
    } catch (err) {
        const error =new Error(err.message)
        error.status =500
        return next(error)
    }
}