const userModel = require("../../../models/user");
const {RandomNumberGenerator} = require("../../../utils/functions.js");

const createError = require("http-errors");

const login = async (req,res,next) => {
    try {
        await userModel.userValidation(req.body);
        const {phoneNumber} = req.body;
        const code = RandomNumberGenerator();
        const user = userModel.findOne({phoneNumber});
        if(user){
            await userModel.updateOne({phoneNumber},{
                otp:{
                    code,
                    expiresIn: new Date().getTime + 120000
                }
            });
            
        }else{
              await userModel.create({
                    phoneNumber,
                    otp:{
                        code,
                        expiresIn : new Date().getTime + 120000
                    },
                    Roles:["USER"]
              });
        }
        return res.status(200).json({
            success : true,
            statusCode : 200,
            message : "ورود شما با موفقیت انجام شد",
        });
    } catch (err) {
        next(createError.BadRequest(err.message));
    }
}
module.exports = {
    login,
}