const Yup = require("yup");

const mongoIdPattern = /^(?=[a-f\d]{24}&)(\d+[a-f]|[a-f]+\d)/i

const categorySchema = Yup.object().shape({
    title: Yup.string().min(3,"عنوان نباید کمتر از 3 کاراکتر باشد").max(30,"عنوان نباید بیشتر از 30 کاراکتر باشد"),
    parent: Yup.string().matches(mongoIdPattern,"آیدی معتبر را وارد کنید").notRequired(),
});

module.exports = {
    categorySchema,
}