const jwt = require("jsonwebtoken");
const { StatusCodes: HttpStatus } = require("http-status-codes")
const homePage = (req,res,next) => {    
    return res.status(HttpStatus.OK).json({
        success : true,
        status : HttpStatus.OK,
        message : "Index Page Store",
    });
}
module.exports = {
    homePage,
}