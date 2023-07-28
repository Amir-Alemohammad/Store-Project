const {Router} = require("express");
const { CourseController } = require("../../controllers/admin/course.controller");

const router = Router();

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
router.get("/list",CourseController.getListOfCourses) 





module.exports = {
    courseRoutes : router,
}