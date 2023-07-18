const {Router} = require("express")

const categoryController = require('../../controllers/admin/category.controller');


const router = Router();
/**
 * @swagger
 *  tags:
 *      name : Admin Panel
 *      description: action of admin (add , remove , edit , and any do )
 */
/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          summary: create new category title
 *          tags: [Admin Panel]
 *          description: add category
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
 *          responses: 
 *              201:
 *                 description: success
 * 
 */
router.post("/add",categoryController.addCategory);
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          summary: get all category of parents
 *          tags: [Admin Panel]
 *          description: get categories
 *          responses: 
 *              200:
 *                 description: success
 * 
 */
router.get("/parents",categoryController.getAllParents);


module.exports = {
    categoryRoute : router,
}