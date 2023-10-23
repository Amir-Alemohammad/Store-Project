const {CommentController} = require("../../controllers/admin/comment.controller")
const {Router} = require("express")

const router = Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          comment:
 *              type: object
 *              required:
 *                  -   text
 *              properties:
 *                  text:
 *                      type: string
 *                      description: text for comment
 *                      example: متن تستی                
 * */
/**
 * @swagger
 *  tags:
 *      -   name: Comments(Admin Panel)
 *          description: manage comment and create or delete or update
 */
/**
 * @swagger
 *  /admin/comment/add/{id}:
 *      post:
 *          summary: create and save comments
 *          tags: [Comments(Admin Panel)]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/comment'
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              201:
 *                 description: Success
 *              500:
 *                  description: Internal Server Error
 */
router.post("/add/:id",CommentController.create);

/**
 * @swagger
 *  /admin/comment/list:
 *      get:
 *          tags: [Comments(Admin Panel)]
 *          summary: get all of comments
 *          parameters:
 *              -   in: query
 *                  type: text
 *                  name: search
 *                  description: search in comment
 *          responses:
 *              200:
 *                  description: success
 *              404:
 *                  description: Not Found 
 * 
 * */
router.get("/list",CommentController.findAll); 

/**
 * @swagger
 *  /admin/comment/{id}:
 *      delete:
 *          summary: delete comment by id
 *          tags: [Comments(Admin Panel)]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          responses: 
 *              200:
 *                 description: Success
 *              500:
 *                  description: Internal Server Error
 *              404:
 *                  description: Not Found
 */
router.delete("/:id", CommentController.delete);

module.exports = {
    commentRoutes : router,
}