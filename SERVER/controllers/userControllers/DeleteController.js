

import { User } from "../../models/user.model.js";
import { handleResponse } from "../../utils/HandleResponse.js";
import { comparePassword } from "../../utils/HandlePassword.js";
//@desc Delete User
//@route  DELETE/api/user/
export const DelteUser = async (req, res, next) => {

    try {
        const { username,email,password } = req.body
        const user = req.user
        if(!username&&!email&&!password){
            return handleResponse(res, 402,{ username,email,password } , new Error("All Feilds are compulsory"), next);

        }
        if (!user) {
            return handleResponse(res, 404, null, new Error("User not found"), next);

        }
        if(user.username!==username){
            return handleResponse(res, 404, null, new Error("Invaild username"), next);
        }
        if(user.email!==email){
            return handleResponse(res, 404, null, new Error("Invaild Email"), next);
        }
        const userPassword = user.password;

        if (comparePassword(password, userPassword)) {

            const DelteUser = await User.findByIdAndDelete(user.nullid);
            return handleResponse(res, 200, DelteUser, null, next);
        }
         else 
         {
            return handleResponse(res, 401, null, new Error("Invalid password"), next);
        }
    }
    catch (error) {
        return handleResponse(res, 500, null, error, next);
    }
}