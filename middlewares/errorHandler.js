const errorHandler = (error,req,res,next) => {
    const status = error?.statusCode || 500;
    const message = error.message;
    const data = error.data;
    console.log(error);
    res.status(status).json({
        success : false,
        status,
        message,
        data,
    });
}
module.exports = {
    errorHandler,
}