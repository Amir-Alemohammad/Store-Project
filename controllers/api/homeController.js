const homePage = (req,res,next) => {
    return res.status(200).json({
        success : true,
        status : 200,
        message : "Index Page Store",
    });
}
module.exports = {
    homePage,
}