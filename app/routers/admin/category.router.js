const {Router} = require("express")

const {categoryController} = require('../../controllers/admin/category.controller');


const router = Router();


/**
 * @swagger
 *  components:
 *      schemas:
 *          addCategory:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title for create category
 *                  parent:
 *                      type: integer
 *                      description: parent of category
 *          editCategory:
 *              type: object
 *              required:
 *                  -   title
 *                          
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title for edit category 
 * 
 */



/**
 * @swagger
 *  tags:
 *      -   name : Admin-Panel
 *          description: action of admin (add , remove , edit , and any do )
 *      -   name : Category(Admin Panel)
 *          description: all methods and routes about category section
 */



/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          summary: create new category title
 *          tags: [Category(Admin Panel)]
 *          description: add category
 *          requestBody:
 *                  required: true
 *                  content: 
 *                      application/x-www-form-urlencoded:
 *                         schema:
 *                             $ref: '#/components/schemas/addCategory'
 *                      application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/addCategory'
 *          responses: 
 *              201:
 *                 description: Success
 *              500:
 *                  description: Internal Server Error
 * 
 */
router.post("/add",categoryController.addCategory);
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          summary: get all category of parents
 *          tags: [Category(Admin Panel)]
 *          description: get categories
 *          responses: 
 *              200:
 *                 description: Success
 *              404:
 *                 description: NotFound
 *              500:
 *                 description: Internal Server Error
 * 
 */
router.get("/parents",categoryController.getAllParents);
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          summary: get all categories
 *          tags: [Category(Admin Panel)]
 *          description: get all categories
 *          responses: 
 *              200:
 *                 description: Success
 *              404:
 *                 description: NotFound
 *              500:
 *                 description: Internal Server Error
 * 
 */
router.get("/all",categoryController.getAllCategory)
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          summary: get all categories without populate and nested structure
 *          tags: [Category(Admin Panel)]
 *          description: get all categories
 *          responses: 
 *              200:
 *                 description: Success
 *              404:
 *                 description: NotFound
 *              500:
 *                 description: Internal Server Error
 * 
 */
router.get("/list-of-all",categoryController.getAllCategoryWithoutPopulate)
/**
 * @swagger
 *  /admin/category/children/{id}:
 *      get:
 *          summary: get all category of children
 *          tags: [Category(Admin Panel)]
 *          description: get categories of children
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                 description: Success
 *              404:
 *                  description: NotFound
 *              500:
 *                 description: Internal Server Error
 * 
 */
router.get("/children/:id",categoryController.getChildOfParents);
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          summary: delete category
 *          tags: [Category(Admin Panel)]
 *          description: delete categories by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                 description: Success
 *              404:
 *                 description: NotFound
 *              500:
 *                 description: Internal Server Error
 * 
 */
router.delete("/remove/:id",categoryController.removeCategory)
/**
 * @swagger
 *  /admin/category/edit/{id}:
 *      put:
 *          summary: edit category
 *          tags: [Category(Admin Panel)]
 *          description: edit categories by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *                  required: true
 *                  content: 
 *                      application/x-www-form-urlencoded:
 *                         schema:
 *                             $ref: '#/components/schemas/editCategory'
 *                      application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/editCategory'
 *          responses: 
 *              200:
 *                 description: Success
 *              404:
 *                 description: NotFound
 *              500:
 *                 description: Internal Server Error
 * 
 */
router.put("/edit/:id",categoryController.editCategory)
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          summary: get category by id
 *          tags: [Category(Admin Panel)]
 *          description: get category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                 description: success
 *              404:
 *                 description: NotFound
 *              500:
 *                 description: Internal Server Error
 * 
 */
router.get("/:id",categoryController.getCategoryById)



module.exports = {
    categoryRoute : router,
}