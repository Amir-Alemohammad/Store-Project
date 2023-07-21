const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const authenticated = async(req,res,next)=>{
try {
    const authorization = req?.headers?.authorization;
    if(!authorization){
        throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
    }

    const token = authorization.split(" ")[1]; // Bearer Token ==> ["Bearer","Token"]

    
    if(!token){
        throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
    }
    
    const decodedToken = await jwt.verify(token,process.env.JWT_SECRET);
    
    if(!decodedToken){
        throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
    }
    
    req.userId = decodedToken.user;
    next();
} catch (err) {
    next(err);
}
}
module.exports = {
    authenticated,
}