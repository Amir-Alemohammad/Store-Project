const get404 = (req,res) => {
    res.status(404).json({
        success : false,
        status : 404,
        message : "صفحه مورد نظر یافت نشد",
    });
}
const get500 = (req,res) => {
    res.status(500).json({
        success : false,
        status : 500,
        message : "خطایی از سمت سرور رخ داده است",
    });
}
module.exports = {
    get404,
    get500,
}