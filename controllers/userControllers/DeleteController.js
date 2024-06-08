

import { User } from "../../models/user.models.js";


//@desc Delete User
//@route  DELETE/api/user/:id
export const DelteUser = async (req, res, next) => {
    const { _id } = req.params


    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return handleResponse(res, 404, _, new Error("User not found"), next);

        }
        const userPassword = user.password;
        console.log(userPassword)

        if (comparePassword(password, userPassword)) {

            const DelteUser = await User.findByIdAndDelete(_id);

            if (!DelteUser) {
                return handleResponse(res, 404, _, new Error("User Not found"), next);
            }

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