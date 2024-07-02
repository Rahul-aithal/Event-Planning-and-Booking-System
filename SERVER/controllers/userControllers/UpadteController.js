import { comparePassword } from "../../utils/HandlePassword.js";
import { User } from "../../models/user.model.js";
import { handleResponse } from "../../utils/HandleResponse.js";

//@desc Update Password
//@route PUT/api/user/password/
export const UpdatePassword = async (req, res, next) => {
    const {  email,password, oldpassword } = req.body;
    const user =req.user;
    if (!user) {
        return handleResponse(res, 404, null, new Error("User not found"), next);

    }
    if (email&&!password&&!oldpassword){
        return handleResponse(res,402,null,new Error("All Fields are requried"));
    }

    if(user.email===email){
        return handleResponse(res,404,null,new Error("Email is not verified"))
    }
    const userPassword = user.password;
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

            handleResponse(res, 200, UpdateUser, null, next);
        }
        else {
            return handleResponse(res, 401, null, new Error("Invaild old password"), next);
        }
    }
    catch (error) {
        return handleResponse(res, 500, null, error, next);

    }

}


//@desc Update Username
//@route  PUT/api/user/username
export const UpdateName = async (req, res, next) => {

    try {

        const { username,newUsername ,password } = req.body
        const user =req.user
        if (!user) {
            return handleResponse(res, 404, null, new Error("User not found"), next);

        }
        if(username!==user.username) return handleResponse(res, 404, null, new Error("Invalid username"), next);
        if(!newUsername&&!username&&!password) return handleResponse(res, 402, null, new Error("All Fileds are required"), next);
        const userPassword = user.password;


        if (comparePassword(password, userPassword)) {

            const UpdateUser = await User.findByIdAndUpdate(username,
                {
                    updatedAt: new Date,
                    username: newUsername,
                }, {
                new: true,
                runValidators: true
            })

            if (!UpdateUser) {
                return handleResponse(res, 404, null, new Error("User not found"), next);
            }
        }
        else {
            return handleResponse(res, 401, null, new Error("Invalid password"), next);
        }

        return handleResponse(res, 200, UpdateUser, null, next);


    }
    catch (error) {
        return handleResponse(res, 500, null, error, next);
    }

}

//@desc Update Email
//@route  PUT/api/user/email/
export const UpdateEmail = async (req, res, next) => {



    try {
        const { email,newEmail ,password } = req.body;
        const user =req.user;
        if(email!==user.email) return handleResponse(res, 404, null, new Error("Invalid email"), next);
        if (!user) {
            return handleResponse(res, 404, null, new Error("User not found"), next);

        }
        const userPassword = user.password;


        if (comparePassword(password, userPassword)) {

            const UpdateUser = await User.findByIdAndUpdate(email,
                {
                    updatedAt: new Date,

                    email: newEmail
                }, {
                new: true,
                runValidators: true
            })

            if (!UpdateUser) {
                return handleResponse(res, 404, null, new Error("User not found"), next);
            }
        }
        else {
            return handleResponse(res, 401, null, new Error("Invalid password"), next);
        }

        return handleResponse(res, 200, UpdateUser, null, next);

    }
    catch (error) {
        return handleResponse(res, 500, null, error, next);
    }

}
