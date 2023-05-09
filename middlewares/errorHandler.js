const errorHandler = (error,req,res,next) => {
    const status = error?.statusCode || 500;
    const message = error.message;
    console.log(error.statusCode);
    res.status(status).json({
        errors : {
            success : false,
            status,
            message,
        }
    });
}
module.exports = {
    errorHandler,
}