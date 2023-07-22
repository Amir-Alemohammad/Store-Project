const createHttpError = require("http-errors");
const Yup = require("yup");

const mongoIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

const mongoIdValidation = Yup.object().shape({
    id: Yup.string().matches(mongoIdRegex,createHttpError.BadRequest("شناسه معتبر را وارد کنید"))
});

module.exports = {
    mongoIdValidation,
}