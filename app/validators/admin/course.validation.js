const createHttpError = require("http-errors");
const Yup = require("yup");


const courseValidationSchema = Yup.object().shape({
    title: Yup.string().required(createHttpError.BadRequest("عنوان محصول الزامی می باشد")),
    shortText: Yup.string(),
    text: Yup.string().required(createHttpError.BadRequest("توضیحات الزامی می باشد")),
    tags: Yup.array(),
    category: Yup.string(),
    price: Yup.number(createHttpError.BadRequest("قیمت وارد شده صحیح نمی باشد")),
    discount: Yup.number(createHttpError.BadRequest("تخفیف وارد شده صحیح نمی باشد")),
    type: Yup.mixed().oneOf(["free","cash","vip"],createHttpError.BadRequest("یکی از نوع های زیر را مشخص کنید")).required("نوع دوره را مشخص کنید"),
    status: Yup.mixed().oneOf(["Holding","Completed","NotStarted"],createHttpError.BadRequest("یکی از وضعیت ها را انتخاب کنید")).required("وضعیت دوره را مشخص کنید"),
    image: Yup.string().required(createHttpError.BadRequest("عکس محصول الزامی می باشد")),
});

module.exports = {
    courseValidationSchema,
}