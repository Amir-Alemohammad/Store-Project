const {Router} = require("express");


const { CourseController } = require("../../controllers/admin/course.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray");


const router = Router();


/**
 * @swagger
 *  components:
 *      schemas:
 *          typesCourse:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   vip
 *          status:
 *              type: string
 *              enum:
 *                  -   Holding
 *                  -   Completed
 *                  -   NotStarted
 *              default: NotStarted
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   shortText
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   status
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example: عنوان دوره
 *                  shortText:
 *                      type: string
 *                      description: the shortText of course
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                      example: متن تستی برای دوره های برنامه نویسی
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the category of course
 *                      example: 64b7d6a8e1ec48de168e3ca4
 *                  price:
 *                      type: string
 *                      description: the price of course
 *                      example: 250000
 *                  discount:
 *                      type: string
 *                      description: the discount of course
 *                      example: 50000
 *                  image:
 *                      type: file
 *                      description: the image of course
 *                  type:
 *                      $ref: '#/components/schemas/typesCourse'
 *                  status:
 *                      $ref: '#/components/schemas/status'
 *                      
 * */

/**
 * @swagger
 *  tags:
 *      -   name: Course(Admin Panel)
 *          description: managment course section like manage episodes , chapters , and courses
 */
/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(Admin Panel)]
 *          summary: get all of courses
 *          parameters:
 *              -   in: query
 *                  type: text
 *                  name: search
 *                  description: search in course text, title , shortText
 *          responses:
 *              200:
 *                  description: success
 *              404:
 *                  description: Not Found 
 * 
 * */
router.get("/list",CourseController.getListOfCourses); 

/**
 * @swagger
 *  /admin/courses/add:
 *      post:
 *          summary: create and save courses
 *          tags: [Course(Admin Panel)]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/course'
 *          responses: 
 *              201:
 *                 description: Success
 *              500:
 *                  description: Internal Server Error
 */
router.post("/add",uploadFile.single("image") , stringToArray("tags"),CourseController.addCourse);




module.exports = {
    courseRoutes : router,
}