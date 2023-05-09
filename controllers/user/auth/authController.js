const userModel = require("../../../models/user");

const createError = require("http-errors");

const login = async (req,res,next) => {
    try {
        await userModel.userValidation(req.body);
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