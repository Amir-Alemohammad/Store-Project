const Yup = require("yup");

const {mongoIdValidation} = require("../admin/mongoId.validation");
const createHttpError = require("http-errors");

const imageRegex = /(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/

const blogSchemaValidation = Yup.object().shape({
    title: Yup.string().required("عنوان الزامی می باشد").min(3,"عنوان نباید کمتر از 3 کاراکتر باشد").max(30,"عنوان نباید بیشتر از 30 کاراکتر باشد"),
    shortText: Yup.string().required("متن الزامی میباشد"),
    text: Yup.string().required("توضیحات الزامی میباشد"),
    filename: Yup.string().matches(imageRegex,"فرمت فایل پشتیبانی نمی شود"),
    tags: Yup.array().required("برچسب ها الزامی می باشد"),
    category: Yup.string().matches(mongoIdValidation,createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
});

module.exports = {
    blogSchemaValidation,
}