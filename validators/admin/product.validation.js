const createHttpError = require("http-errors");
const Yup = require("yup");



const productValidationSchema = Yup.object().shape({
    title: Yup.string().required("عنوان محصول الزامی می باشد"),
    shortText: Yup.string(),
    text: Yup.string().required("توضیحات الزامی می باشد"),
    tags: Yup.array(),
    category: Yup.string(),
    price: Yup.number("قیمت وارد شده صحیح نمی باشد"),
    discount: Yup.number("تخفیف وارد شده صحیح نمی باشد"),
    count: Yup.number("تعداد وارد شده صحیح نمی باشد"),
    image: Yup.string().required("عکس محصول الزامی می باشد"),
    
    height: Yup.number("ارتفاع وارد شده صحیح نمی باشد").nullable(true)
    // checking self-equality works for NaN, transforming it to null
    .transform((_, val) => val === Number(val) ? val : null),

    width: Yup.number("عرض وارد شده صحیح نمی باشد").nullable(true).transform((_, val) => val === Number(val) ? val : null) ,
    weight: Yup.number("حجم وارد شده صحیح نمی باشد").nullable(true).transform((_, val) => val === Number(val) ? val : null) ,
    lenght: Yup.number("طول وارد شده صحیح نمی باشد").nullable(true).transform((_, val) => val === Number(val) ? val : null) ,
});



module.exports = {
    productValidationSchema,
}