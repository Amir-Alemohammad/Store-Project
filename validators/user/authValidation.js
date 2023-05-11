const Yup = require("yup");

const phoneRegex = /^09[0-9]{9}$/ 
const authSchema = Yup.object().shape({
    firstname: Yup.string().required("نام الزامی می باشد"),
    lastname: Yup.string().required("نام خانوادگی الزامی می باشد"),
    email: Yup.string().email("ایمیل را صحیح وارد کنید").required("ایمیل الزامی می باشد"),
    password: Yup.string().min(6,"کلمه عبور باید بیشتر از 6 کاراکتر باشد ").required("کلمه عبور الزامی می باشد"),
    phoneNumber : Yup.string().matches(phoneRegex,"شماره تلفن را به طور صحیح وارد کنید").required("شماره تلفن الزامی می باشد").min(11,"شماره تلفن را صحیح وارد کنید").max(11,"شماره تلفن را صحیح وارد کنید"),
});
module.exports = {
    authSchema,
}