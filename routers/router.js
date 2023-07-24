const {Router} = require("express");

const {HomeRoute} = require("./api/index");
const {userAuthRoute} = require("./user/authRoute");
const { categoryRoute } = require("./admin/category.router");
const { blogRoutes } = require("./admin/blog.router");
const { authenticated, checkRole } = require("../middlewares/verifyAccessToken");
const { productRoute } = require("./admin/product.router");

const router = Router();


router.use("/",HomeRoute);

router.use("/user",userAuthRoute);

router.use("/admin/category" , authenticated , checkRole("ADMIN") , categoryRoute);

router.use("/admin/blogs" , authenticated , checkRole("ADMIN") , blogRoutes)

router.use("/admin/product" , authenticated , checkRole("ADMIN") , productRoute)




module.exports = {
    AllRoutes : router,
}