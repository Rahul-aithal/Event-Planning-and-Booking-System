import { User } from "../models/user.models.js";



//@desc GET all Users
//@route  GET/api/user
export const GetUsers = async (req, res, next) => {
    try {
        const user = await User.find().select("-password -refreshToken")
        res.json(user);
    }
    catch (err) {
        const error = new Error(err.message)
        error.status = 500
        return next(error)
    }
}


//@desc GET  User
//@route  GET/api/user/:id
export const Getuser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await User.findById(id).select("-password -refreshToken")
        if (!user) {
            const error = new Error("User Not found")
            error.status = 404;
            return next(error)
        }
        res.json(user);
    }
    catch (err) {
        const error = new Error(err.message)
        error.status = 500
        return next(error)
    }
}







