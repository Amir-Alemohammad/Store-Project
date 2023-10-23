const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { verifyJwtToken } = require("../utils/functions");



const authenticated = async (req, res, next) => {
    try {
        const authorization = req?.headers?.authorization;
        if (!authorization) {
            throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
        }

        let token = authorization.split(" ")?.[1]; // Bearer Token ==> ["Bearer","Token"]


        if (!token) {
            throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
        }

        const decodedToken = verifyJwtToken(token);


        if (!decodedToken) {
            throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
        }
        req.userId = decodedToken.user;
        return next();
    } catch (err) {
        next(err);
    }
}


function checkRole(role) {
    return async function (req, res, next) {
        try {
            const userId = req.userId;
            const user = await userModel.findById(userId, {
                password: 0,
                otp: 0,
                refreshToken: 0,
                createdAt: 0,
                updatedAt: 0,
                discount: 0,
                bills: 0,
                __v: 0,
            });
            if (user.Roles.includes(role)) return next()
            throw createHttpError.Forbidden("شما مجوز ورود ندارید")
        } catch (error) {
            next(error)
        }

    }
}




module.exports = {
    authenticated,
    checkRole,
}