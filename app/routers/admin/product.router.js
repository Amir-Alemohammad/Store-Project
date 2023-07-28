const {Router} = require("express");

const {productController} = require("../../controllers/admin/product.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray");

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray                
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   shortText
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *                  -   images
 *              properties:
 *                  title:
 *                      type: string
 *                      desctiption: the title of product
 *                  shortText:
 *                      type: string
 *                      desctiption: the shortText of product
 *                  text:
 *                      type: string
 *                      desctiption: the text of product
 *                  tags:
 *                      type: array
 *                      desctiption: the tags of product
 *                  category:
 *                      type: string
 *                      desctiption: the category of product
 *                  price:
 *                      type: string
 *                      desctiption: the price of product
 *                  discount:
 *                      type: string
 *                      desctiption: the discount of product
 *                  count:
 *                      type: string
 *                      desctiption: the count of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: integer
 *                      desctiption: the height of product packet
 *                  width:
 *                      type: integer
 *                      desctiption: the width of product packet
 *                  weight:
 *                      type: integer
 *                      desctiption: the weight of product packet
 *                  length:
 *                      type: integer
 *                      desctiption: the lenght of product packet
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 */
/**
 * @swagger
 *  tags:
 *      -   name : Product(Admin Panel)
 *          description: made product managment admin panel
 */
/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          summary: create and save product
 *          tags: [Product(Admin Panel)]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/product'
 *          responses: 
 *              201:
 *                 description: Success
 *              500:
 *                  description: Internal Server Error
 */
router.post("/add", uploadFile.array("images", 10) , stringToArray("tags") , productController.addProduct);


/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          summary: get products
 *          tags: [Product(Admin Panel)]
 *          parameters:
 *              -   in: query   
 *                  type: string
 *                  name: search
 *                  description: search in title , short text , text (product)
 *          responses: 
 *              200:
 *                 description: Success
 *              500:
 *                  description: Internal Server Error
 *              404:
 *                  description: Not Found
 */
router.get("/list",productController.getAllProducts);


/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          summary: get product by id
 *          tags: [Product(Admin Panel)]
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
router.get("/:id",productController.getOneProduct);


router.put("/edit/:id", productController.editProduct);

/**
 * @swagger
 *  /admin/products/remove/{id}:
 *      delete:
 *          summary: delete product by id
 *          tags: [Product(Admin Panel)]
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
router.delete("/remove/:id", productController.removeProduct);


module.exports = {
    productRoute : router,
}