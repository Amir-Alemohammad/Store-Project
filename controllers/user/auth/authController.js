const userModel = require("../../../models/user");
const {RandomNumberGenerator} = require("../../../utils/functions.js");
const {LoginSchema} = require('../../../validators/user/loginValidation.js');

const createError = require("http-errors")

const register = async (req,res,next) => {
    try {
        await userModel.userValidation(req.body);
        const {phoneNumber,firstname,lastname,email,password} = req.body;
        
        const user = await userModel.findOne({phoneNumber});
        const emailAvailable = await userModel.findOne({email});
        if(email){
            const error = new Error("قبلا کاربری با این ایمیل ثبت نام کرده است");
            error.statusCode = 400;
            throw error;
        }
        if(user){
            const error = new Error("قبلا کاربری با این شماره تلفن ثبت نام کرده است");
            error.statusCode = 400;
            throw error
        }else{
          await userModel.create({
            firstname,
            lastname,
            email,
            password,
            phoneNumber,
          });
          res.status(201).json({
            success: true,
            statusCode : 201,
            message: "ثبت نام با موفقیت انجام شد",
          });
        }
    } catch (err) {
        next(createError.BadRequest(err.message));
    }
}
const login = async (req,res,next) =>{
    try {
        await LoginSchema.validate(req.body);
        const {phoneNumber} = req.body;
        const code = RandomNumberGenerator();
        const user = await userModel.findOne({phoneNumber});
        if(!user){
            const error = new Error("کاربری با این شماره تلفن ثبت نشده است");
            error.statusCode = 404;
            throw error;
        }else{
            await userModel.updateOne({phoneNumber},{
                $set: {
                    otp:{
                        code,
                        expiresIn: new Date().getTime() + 120000,
                    }
                }
            });
            res.status(200).json({
                success : true,
                statusCode : 200,
                code,
                message: "کد ورود با موفقیت برای شما ارسال شد",
            });
        }
            
        
    } catch (err) {
        next(createError.BadRequest(err.message));
    }
}
module.exports = {
    register,
    login,
}