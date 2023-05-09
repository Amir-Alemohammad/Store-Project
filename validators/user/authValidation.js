const Yup = require("yup");

const phoneRegex = /^09[0-9]{9}$/ 
const authSchema = Yup.object().shape({
    phoneNumber : Yup.string().matches(phoneRegex,"شماره تلفن را به طور صحیح وارد کنید").required("شماره تلفن الزامی می باشد").min(11,"شماره تلفن را صحیح وارد کنید").max(11,"شماره تلفن را صحیح وارد کنید"),
});
module.exports = {
    authSchema,
}