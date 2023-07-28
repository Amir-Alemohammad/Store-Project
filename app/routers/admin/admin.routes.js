const {Router} = require("express");
const { categoryRoute } = require("./category.router");
const { blogRoutes } = require("./blog.router");
const { productRoute } = require("./product.router");
const {courseRoutes} = require("./course.router")


const router = Router();


router.use("/category", categoryRoute);
router.use("/blogs", blogRoutes);
router.use("/products", productRoute);
router.use("/courses", courseRoutes);


module.exports = {
    AdminRoutes : router,
}