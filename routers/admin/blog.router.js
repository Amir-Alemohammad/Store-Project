const {Router} = require("express");

const AdminBlogController = require("../../controllers/admin/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray")

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

/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: create blog
 *          consumer:
 *              - multipart/form-data
 *              - application/x-www-form-data-urlencoded
 *          parameters:
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: shortText
 *                  type: string
 *                  reuired: true
 *              -   in: formData
 *                  name: text
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: tags
 *                  type: string
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *              -   in: formData
 *                  name: image
 *                  type: file
 *                  required: true
 *              -   in: formData
 *                  name: category
 *                  type: string 
 *          responses:
 *              201:
 *                  description: Success - blog created 
 * 
 * */
router.post("/add",uploadFile.single("image"), stringToArray("tags") , AdminBlogController.createBlog);


module.exports = {
    blogRoutes : router,
}