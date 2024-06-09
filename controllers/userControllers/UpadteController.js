import { comparePassword } from "../../utils/HandlePassword.js";
import { User } from "../../models/user.model.js";
import { handleResponse } from "../../utils/HnadleResponse.js";

//@desc Update Password
//@route PUT/api/user/password/
export const UpdatePassword = async (req, res, next) => {
    const {  password, oldpassword } = req.body;
    const user =req.user;
    if (!user) {
        return handleResponse(res, 404, _, new Error("User not found"), next);

    }

    const userPassword = user.password;
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

            handleResponse(res, 200, UpdateUser, _, next);
        }
        else {
            return handleResponse(res, 401, _, new Error("Invaild old password"), next);
        }
    }
    catch (error) {
        return handleResponse(res, 500, _, error, next);

    }

}


//@desc Update Username
//@route  PUT/api/user/username
export const UpdateName = async (req, res, next) => {

    try {

        const { username, password } = req.body
        const user =req.user
        if (!user) {
            return handleResponse(res, 404, _, new Error("User not found"), next);

        }
        if(username!==user.username) return handleResponse(res, 404, _, new Error("Invalid username"), next);
        const userPassword = user.password;
        console.log(userPassword);

        if (comparePassword(password, userPassword)) {

            const UpdateUser = await User.findByIdAndUpdate(username,
                {
                    updatedAt: new Date,
                    username: username,
                }, {
                new: true,
                runValidators: true
            })

            if (!UpdateUser) {
                return handleResponse(res, 404, _, new Error("User not found"), next);
            }
        }
        else {
            return handleResponse(res, 401, _, new Error("Invalid password"), next);
        }

        return handleResponse(res, 200, UpdateUser, _, next);


    }
    catch (error) {
        return handleResponse(res, 500, _, error, next);
    }

}

//@desc Update Email
//@route  PUT/api/user/email/
export const UpdateEmail = async (req, res, next) => {



    try {
        const { email, password } = req.body;
        const user =req.user;
        if(email!==user.email) return handleResponse(res, 404, _, new Error("Invalid email"), next);
        if (!user) {
            return handleResponse(res, 404, _, new Error("User not found"), next);

        }
        const userPassword = user.password;
        console.log(userPassword);

        if (comparePassword(password, userPassword)) {

            const UpdateUser = await User.findByIdAndUpdate(email,
                {
                    updatedAt: new Date,

                    email: email
                }, {
                new: true,
                runValidators: true
            })

            if (!UpdateUser) {
                return handleResponse(res, 404, _, new Error("User not found"), next);
            }
        }
        else {
            return handleResponse(res, 401, _, new Error("Invalid password"), next);
        }

        return handleResponse(res, 200, UpdateUser, _, next);

    }
    catch (error) {
        return handleResponse(res, 500, _, error, next);
    }

}
