

import { User } from "../../models/user.model.js";


//@desc Delete User
//@route  DELETE/api/user/
export const DelteUser = async (req, res, next) => {

    try {
        const { password } = req.body
        const user = req.user
        if (!user) {
            return handleResponse(res, 404, _, new Error("User not found"), next);

        }
        const userPassword = user.password;
        console.log(userPassword)

        if (comparePassword(password, userPassword)) {

            const DelteUser = await User.findByIdAndDelete(user._id);
            return handleResponse(res, 200, DelteUser, _, next);
        }
         else 
         {
            return handleResponse(res, 401, _, new Error("Invalid password"), next);
        }
    }
    catch (error) {
        return handleResponse(res, 500, _, error, next);
    }
}