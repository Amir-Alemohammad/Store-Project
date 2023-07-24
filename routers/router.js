const {Router} = require("express");

const {HomeRoute} = require("./api/index");
const {userAuthRoute} = require("./user/authRoute");
const { authenticated, checkRole } = require("../middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");

const router = Router();


router.use("/",HomeRoute);

router.use("/user",userAuthRoute);


router.use("/admin" , authenticated , checkRole("ADMIN") , AdminRoutes)




module.exports = {
    AllRoutes : router,
}