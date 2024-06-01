const errorhandler = function (err,req,res,next){
    if(err.status){
        res.status(err.status).json(err.message)
    }
    else{
        res.status(500).json({"message":"Error not given "})
    }
}


export default errorhandler