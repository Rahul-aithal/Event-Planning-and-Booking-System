import { comparPassword } from "../middlewares/HandlePassword.js";
import { User } from "../models/user.models.js";

export const Login= async(req,res,next)=>{
    const {email,password} = req.body
    
    try {

        const  user = await User.findOne({email: email})
        if(user){
           const userPassword=user.password
            if(comparPassword(password,userPassword)){
                res.status(200).json("message: Success in LOGIN")
            }
            else{
                const error= new Error("Enter correct Password")
                error.status=401
            return next(error)
            }
        }
        else{
            const error= new Error(" Email is Inavalid")
            error.status=401
            return next(error)
        }
    } catch (error) {
        const err = new Error(error.message)
        err.status = 500
        return next(err)
    }
}