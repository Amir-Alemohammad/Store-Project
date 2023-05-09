const {Router} = require("express");

const homeController = require("../../controllers/api/homeController");

const router = Router();
/**
 * @swagger
 * tags:
 *      name : IndexPage
 *      description: های صفحه ی اصلی وبسایت api
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags:
 *          [IndexPage]
 *      description: get all data for index page
 *      responses: 
 *              200:
 *                  description: success
 *              404:
 *                  description: NotFound
 * 
 */
router.get("/",homeController.homePage);


module.exports = {
    HomeRoute : router,
}