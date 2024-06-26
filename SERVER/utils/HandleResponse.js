

export const handleResponse = (res, statusCode = 500, data =null , error=null, next = function () { }) => {
    if (error) {
        {
            error.status = statusCode;
            error.data = data;
            return next(error);
        }
      
    } else {
        return res.status(statusCode).json({ success: true, data: data?data:"" });
    }
};
