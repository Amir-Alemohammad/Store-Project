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


module.exports = {
    categoryRoute : router,
}