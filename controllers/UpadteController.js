import { comparePassword } from "../utils/HandlePassword.js";
import { User } from "../models/user.models.js";

//@desc Update Password
//@route PUT/api/user/password/
export const UpdatePassword = async (req, res, next) => {
    const { email, password, oldpassword } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        const error = new Error("User not found")
        error.status = 404
        return next(error)
    }
    const userPassword = user.password
    console.log(userPassword)
    try {
        if (comparePassword(oldpassword, userPassword)) {

            const UpdateUser = await User.findByIdAndUpdate(user.email,
                {
                    updatedAt: new Date,

                    password: password
                }, {
                new: true,
                runValidators: true
            })

            res.status(200).json(UpdateUser)
        }
        else {
            const error = new Error("Real and given old password are not matching")
            error.status = 401
            return next(error)
        }
    }
    catch (err) {
        const error = new Error(err.message)
        error.status = 500
        return next(error)
    }

}


//@desc Update Username
//@route  PUT/api/user/username
export const UpdateName = async (req, res, next) => {
    const { username } = req.body

    try {
        const UpdateUser = await User.findByIdAndUpdate(username,
            {
                updatedAt: new Date,
                username: username,
            }, {
            new: true,
            runValidators: true
        })

        if (!UpdateUser) {
            const error = new Error("User not found")
            error.status = 404
            return next(error)
        }

        res.json(UpdateUser)

    }
    catch (err) {
        const error = new Error(err.message)
        error.status = 500
        return next(error)
    }

}

//@desc Update Email
//@route  PUT/api/user/email/:id
export const UpdateEmail = async (req, res, next) => {
    
    const { email } = req.body

    try {
        const UpdateUser = await User.findByIdAndUpdate(email,
            {
                updatedAt: new Date,

                email: email
            }, {
            new: true,
            runValidators: true
        })

        if (!UpdateUser) {
            const error = new Error("User not found")
            error.status = 404
            return next(error)
        }

        res.json(UpdateUser)

    }
    catch (err) {
        const error = new Error(err.message)
        error.status = 500
        return next(error)
    }

}
