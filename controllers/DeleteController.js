

import { User } from "../models/user.models.js"


//@desc Delete User
//@route  DELETE/api/user/:id
export const DelteUser = async (req, res, next) => {
    const { _id } = req.params

    try {
        const DelteUser = await User.findByIdAndDelete(_id)


        if (!DelteUser) {
            const error = new Error("User not found")
            error.status = 404
            return next(error)
        }
        res.json({ 
            "User": DelteUser, 
        message: "Deletion successfull"
     });
    }
    catch (err) {
        const error = new Error(err.message)
        error.status = 500
        return next(error)
    }
}