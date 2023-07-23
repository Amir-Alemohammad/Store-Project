const {Router} = require("express");

const AdminBlogController = require("../../controllers/admin/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray");
const { authenticated } = require("../../middlewares/verifyAccessToken");

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          createBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   shortText
 *                  -   text
 *                  -   tags
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title for create blog
 *                  shortText:
 *                      type: string
 *                      description: shortText for create blog
 *                  text:
 *                      type: string
 *                      description: text for create blog
 *                  tags:
 *                      type: string
 *                      description: tags for create blog
 *                  image:
 *                      type: file
 *                      description: image for create blog
 *                  category:
 *                      type: integer
 *                      description: category id for create blog
 */

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
 *          requestBody:
 *                  required: true
 *                  content:
 *                      multipart/formData:
 *                         schema:
 *                             $ref: '#/components/schemas/createBlog'
 *          responses:
 *              201:
 *                  description: Success - blog created 
 * 
 * */
router.post("/add",authenticated,uploadFile, stringToArray("tags") , AdminBlogController.createBlog);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get blog by id
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success  
 * 
 * */
router.get("/:id",AdminBlogController.getBlogById);

/**
 * @swagger
 *  /admin/blogs/remove/{id}:
 *      delete:
 *          tags: [Blog(AdminPanel)]
 *          summary: delete blog by id
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success  
 * 
 * */
router.delete("/remove/:id",AdminBlogController.deleteBlogById);

/**
 * @swagger
 *  /admin/blogs/edit/{id}:
 *      put:
 *          tags: [Blog(AdminPanel)]
 *          summary: edit blog
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: shortText
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  type: string
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *              -   in: formData
 *                  name: image
 *                  type: file                 
 *              -   in: formData
 *                  name: category
 *                  type: string
 *          responses:
 *              200:
 *                  description: Success 
 * 
 * */
router.put("/edit/:id" , uploadFile ,stringToArray("tags"), AdminBlogController.updateBlogById);





module.exports = {
    blogRoutes : router,
}