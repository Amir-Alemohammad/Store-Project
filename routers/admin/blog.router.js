const {Router} = require("express");

const AdminBlogController = require("../../controllers/admin/blog.controller")

const router = Router();

/**
 * @swagger
 *  tags:
 *      -   name : Blog(AdminPanel)
 *          description: made blog managment admin panel
 */
/**
 * @swagger
 *  /admin/blogs/all:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success - get array of blogs 
 * 
 * */
router.get("/all",AdminBlogController.getListOfBlogs);


module.exports = {
    blogRoutes : router,
}