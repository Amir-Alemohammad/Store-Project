const {Router} = require("express");

const homeController = require("../../controllers/api/homeController");

const router = Router();
/**
 * @swagger
 * tags:
 *      name : Index Page
 *      description: های صفحه ی اصلی وبسایت api
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags:
 *          [Index Page]
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