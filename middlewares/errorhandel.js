const errorhandler = function (err, req, res, next) {
    if (err.status) {
        res.status(err.status).json(err.message);
    }
    else {
        console.log(err);
        res.status(500).json({ "message": "Error not given " });
        
    }
    return next();
}


export default errorhandler