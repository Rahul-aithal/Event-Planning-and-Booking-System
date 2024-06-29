import { handleResponse } from "../utils/HandleResponse.js";

const errorRespose = function (err, req, res, next) {
    if (err.status) {
        res.status(err.status).json({success: false, message:err.message||"Somethig Went Wrong",data: err.data ||"No data found or given"});
    }
    else {
        handleResponse(res,500,_,new Error(err.message),next);
    }
    return next();
}


export default errorRespose
