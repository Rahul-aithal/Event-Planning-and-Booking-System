import { handleResponse } from "../utils/HnadleResponse.js";

const errorRespose = function (err, req, res, next) {
    if (err.status) {
        console.log(err);
        res.status(err.status).json({success: false, message:err.message||"Somethig Went Wrong",data: err.data ||""});
    }
    else {
        console.log(err);
        handleResponse(res,500,_,new Error(err.message),next);
    }
    return next();
}


export default errorRespose
