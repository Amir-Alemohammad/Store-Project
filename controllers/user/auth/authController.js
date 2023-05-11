const userModel = require("../../../models/user");
const {RandomNumberGenerator} = require("../../../utils/functions.js");
const {getOtpSchema,checkOtpSchema} = require('../../../validators/user/authValidation.js');
const {EXPIRES_IN} = require("../../../utils/constans.js");

const kavenegar = require("kavenegar");
const jwt = require("jsonwebtoken");
const createError = require("http-errors")

const register = async (req,res,next) => {
    try {
        await userModel.userValidation(req.body);
        const {phoneNumber,firstname,lastname,email,password} = req.body;
        
        const user = await userModel.findOne({phoneNumber});
        const emailAvailable = await userModel.findOne({email});
        if(emailAvailable){
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
const getOtp = async (req,res,next) =>{
    try {
        await getOtpSchema.validate(req.body);
        const {phoneNumber} = req.body;
        const code = RandomNumberGenerator();
        const user = await userModel.findOne({phoneNumber});
        if(!user){
          const error = new Error("کاربری با این شماره ثبت نشده است");
          error.statusCode = 404;
          throw error;
        }else{
            await userModel.updateOne({phoneNumber},{
                $set: {
                    otp:{
                        code,
                        EXPIRES_IN, 
                    }
                }
            });
            const api = kavenegar.KavenegarApi({
                apikey: "7A2F3653497459706B716D305A414F4C566C6E4B4B496452324377532F69494C5844732F5165317A376F343D"
            });
            api.VerifyLookup({
                receptor: phoneNumber,
                template: "Login",
                token: code,
            },function(response,status){
                console.log(response);
                console.log(status);
            });
            res.status(200).json({
                success : true,
                statusCode : 200,
                code,
                message: "کد ورود با موفقیت برای شما ارسال شد",
            });
        }
    } catch (err) {
        next(err);
    }
}
const checkOtp = async(req,res,next) => {
    try {
        await checkOtpSchema.validate(req.body);
        const {phoneNumber,code} = req.body;
        const user = await userModel.findOne({phoneNumber});
        if(!user){
            const error = new Error("کاربری با این شماره تلفن ثبت نشده است");
            error.statusCode = 404;
            throw error;
        }
        if(user.otp.code != code){
            const error = new Error("کد ارسال شده صحیح نمی باشد");
            error.statusCode = 404;
            throw error;
        }
        const nowDate = Date.now();
        if(+user.otp.EXPIRES_IN < nowDate){ // + for convert to number
            const error = new Error("کد شما منقضی شده است");
            error.statusCode = 401;
            throw error;
        }
        
        const token = jwt.sign({
            user: user._id.toString(),
            phoneNumber,
        },process.env.JWT_SECRET);

        res.status(200).json({
            success : true,
            statusCode : 200,
            message: "ورود با موفقیت انجام شد",
            accessToken : token,
            userId: user._id.toString(),
        });
        
    } catch (err) {
        next(err);
    }
}
module.exports = {
    register,
    getOtp,
    checkOtp,
}