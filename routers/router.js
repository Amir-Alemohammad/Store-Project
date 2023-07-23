const {Router} = require("express");

const {HomeRoute} = require("./api/index");
const {userAuthRoute} = require("./user/authRoute");
const { categoryRoute } = require("./admin/category.router");
const { blogRoutes } = require("./admin/blog.router");
const { authenticated, checkRole } = require("../middlewares/verifyAccessToken");

const router = Router();


router.use("/",HomeRoute);

router.use("/user",userAuthRoute);

router.use("/admin/category" , authenticated , checkRole("ADMIN") , categoryRoute);

router.use("/admin/blogs" , authenticated , checkRole("ADMIN") , blogRoutes)




module.exports = {
    AllRoutes : router,
}