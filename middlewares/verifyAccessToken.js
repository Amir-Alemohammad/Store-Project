const jwt = require("jsonwebtoken");

const authenticated = async(req,res,next)=>{
    const authHeader = req.get("accesstoken");
try {
    if(!authHeader){
        const error = new Error("لطفا وارد حساب کاربری خود شوید");
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(" ")[1]; // Bearer Token ==> ["Bearer","Token"]

    if(!token){
        const error = new Error("لطفا وارد حساب خود شوید");
        error.statusCode = 401;
        throw error;
    }
    
    const decodedToken = await jwt.verify(token,process.env.JWT_SECRET);
    
    if(!decodedToken){
        const error = new Error("لطفا وارد حساب کاربری خود شوید");
        error.statusCode = 401;
        throw error;
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