import { User } from "../../models/user.models.js";



//@desc GET all Users
//@route  POST/api/user
export const GetUsers = async (req, res, next) => {
    try {
        const user = await User.find().select("-password -refreshToken")
        return handleResponse(res,200,user,_,next);
    }
    catch (error) {
        return handleResponse(res,500,_,error,next);
    }
}


//@desc GET  User
//@route  GET/api/v1/user/
export const Getuser = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const { email, password } = req.body
    const user = await User.findOne({ email });
    if (!user) {
     return handleResponse(res,404,_,new Error("User not found"),next);
        
    }
    const userPassword = user.password;
    console.log(userPassword);
    
        if (comparePassword(password, userPassword)) {

        const user = await User.findById(id).select("-password -refreshToken")
        if (!user) {
            return handleResponse(res,404,_,new Error("User Not found"),next);
        }
        return handleResponse(res,200,user,_,next);
    }
    else {
        return handleResponse(res,401,_,new Error("Invalid password"),next);
    }
}
    catch (error) {
        return handleResponse(res,500,_,error,next);
    }
}







