const {Router} = require("express");

const {HomeRoute} = require("./api/index");
const {userAuthRoute} = require("./user/authRoute");

const router = Router();


router.use("/",HomeRoute);

router.use("/user",userAuthRoute);





module.exports = {
    AllRoutes : router,
}