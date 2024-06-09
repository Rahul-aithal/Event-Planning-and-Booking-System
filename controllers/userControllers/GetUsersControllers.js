import  {User} from "../../models/user.model.js";



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
    
    try {
const user =  req.user;

    return handleResponse(res,200,req.user,_,next);
}
    catch (error) {
        return handleResponse(res,500,_,error,next);
    }
}







