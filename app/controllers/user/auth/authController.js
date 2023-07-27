const userModel = require("../../../models/user");
const { RandomNumberGenerator, verifyRefreshToken } = require("../../../utils/functions.js");
const { getOtpSchema, checkOtpSchema } = require('../../../validators/user/authValidation.js');
const { ROLES } = require("../../../utils/constans.js");

const kavenegar = require("kavenegar");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const Controller = require("../../controller");

class authController extends Controller{

    async register(req, res, next){
        try {
            await userModel.userValidation(req.body);
            const { phoneNumber, firstname, lastname, email, password } = req.body;
    
            const user = await userModel.findOne({ phoneNumber });
            const emailAvailable = await userModel.findOne({ email });
            if (emailAvailable) {
                const error = new Error("قبلا کاربری با این ایمیل ثبت نام کرده است");
                error.statusCode = 400;
                throw error;
            }
            if (user) {
                const error = new Error("قبلا کاربری با این شماره تلفن ثبت نام کرده است");
                error.statusCode = 400;
                throw error
            } else {
                await userModel.create({
                    firstname,
                    lastname,
                    email,
                    password,
                    phoneNumber,
                    Roles: ROLES.USER,
                });
                res.status(201).json({
                    success: true,
                    statusCode: 201,
                    message: "ثبت نام با موفقیت انجام شد",
                });
            }
        } catch (err) {
            next(createError.BadRequest(err.message));
        }
    }

    async getOtp(req, res, next){
        try {
            await getOtpSchema.validate(req.body);
            const { phoneNumber } = req.body;
            const code = RandomNumberGenerator();
            const user = await userModel.findOne({ phoneNumber });
            if (!user) {
                const error = new Error("کاربری با این شماره ثبت نشده است");
                error.statusCode = 404;
                throw error;
            } else {
                await userModel.updateOne({ phoneNumber }, {
                    $set: {
                        otp: {
                            code,
                            EXPIRES_IN: new Date().getTime() + 120000,
                        }
                    }
                });
                const api = kavenegar.KavenegarApi({
                    apikey: process.env.API_SECRET_KEY,
                });
                // api.VerifyLookup({
                //     receptor: phoneNumber,
                //     template: "Login",
                //     token: code,
                // },function(response,status){
                //     console.log(response);
                //     console.log(status);
                // });
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    code,
                    message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
                });
            }
        } catch (err) {
            next(err);
        }
    }

    async checkOtp(req, res, next){
        try {
            await checkOtpSchema.validate(req.body);
            const { phoneNumber, code } = req.body;
            const user = await userModel.findOne({ phoneNumber });
            if (!user) {
                const error = new Error("کاربری با این شماره تلفن ثبت نشده است");
                error.statusCode = 404;
                throw error;
            }
            if (user.otp.code != code) {
                const error = new Error("کد ارسال شده صحیح نمی باشد");
                error.statusCode = 404;
                throw error;
            }
            const nowDate = Date.now();
            if (+user.otp.EXPIRES_IN < nowDate) { // + for convert to number
                const error = new Error("کد شما منقضی شده است");
                error.statusCode = 400;
                throw error;
            }
    
            const token = jwt.sign({
                user: user._id.toString(),
                phoneNumber,
            }, process.env.JWT_SECRET, { expiresIn: "24h" });
    
    
            const refreshToken = jwt.sign({
                user: user._id.toString(),
                phoneNumber,
            }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
    
            await userModel.updateOne({ phoneNumber }, {
                $set: {
                    refreshToken,
                }
            })
    
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "ورود با موفقیت انجام شد",
                accessToken: token,
                refreshToken,
                userId: user._id.toString(),
            });
        } catch (err) {
            next(err);
        }
    }
    
    async refreshToken(req, res, next){
        try {
            const { refreshToken } = req.body;
    
            const phoneNumber = await verifyRefreshToken(refreshToken);
    
            const user = await userModel.findOne({ phoneNumber });
    
            const accessToken = jwt.sign({
                user: user._id.toString(),
                phoneNumber,
            }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
            const newRefreshToken = jwt.sign({
                user: user._id.toString(),
                phoneNumber,
            }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
    
            await userModel.updateOne({ phoneNumber }, {
                $set: {
                    refreshToken: newRefreshToken,
                }
            });
            
    
            res.status(200).json({
                accessToken,
                RefreshToken: newRefreshToken,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    authController : new authController()
}