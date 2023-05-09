const get404 = (req,res,next) => {
    res.status(404).json({
        success : false,
        statusCode : 404,
        message : "صفحه مورد نظر یافت نشد",
    });
}
const get500 = (req,res,next) => {
    res.status(500).json({
        success : false,
        statusCode : 500,
        message : "خطایی از سمت سرور رخ داده است",
    })
}
module.exports = {
    get404,
    get500,
}