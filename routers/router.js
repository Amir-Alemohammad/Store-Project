const {Router} = require("express");

const {HomeRoute} = require("./api/index");
const {userAuthRoute} = require("./user/authRoute");
const { categoryRoute } = require("./admin/category.router");

const router = Router();


router.use("/",HomeRoute);

router.use("/user",userAuthRoute);

router.use("/admin/category",categoryRoute);





module.exports = {
    AllRoutes : router,
}