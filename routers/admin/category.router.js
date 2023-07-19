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
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          summary: get all categories
 *          tags: [Admin Panel]
 *          description: get all categories
 *          responses: 
 *              200:
 *                 description: success
 * 
 */
router.get("/all",categoryController.getAllCategory)
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          summary: get all categories without populate and nested structure
 *          tags: [Admin Panel]
 *          description: get all categories
 *          responses: 
 *              200:
 *                 description: success
 * 
 */
router.get("/list-of-all",categoryController.getAllCategoryWithoutPopulate)
/**
 * @swagger
 *  /admin/category/children/{id}:
 *      get:
 *          summary: get all category of children
 *          tags: [Admin Panel]
 *          description: get categories of children
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                 description: success
 * 
 */
router.get("/children/:id",categoryController.getChildOfParents);
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          summary: delete category
 *          tags: [Admin Panel]
 *          description: delete categories by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                 description: success
 * 
 */
router.delete("/remove/:id",categoryController.removeCategory)
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          summary: get category by id
 *          tags: [Admin Panel]
 *          description: get category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                 description: success
 * 
 */
router.get("/:id",categoryController.getCategoryById)



module.exports = {
    categoryRoute : router,
}