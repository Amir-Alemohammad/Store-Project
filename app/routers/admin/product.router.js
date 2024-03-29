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
 *                      description: the title of product
 *                  shortText:
 *                      type: string
 *                      description: the shortText of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  type:
 *                      type: string
 *                      description: the type of product 
 *                      example: virtual - physical
 *                      required: true
 *                  height:
 *                      type: integer
 *                      description: the height of product packet
 *                  width:
 *                      type: integer
 *                      description: the width of product packet
 *                  weight:
 *                      type: integer
 *                      description: the weight of product packet
 *                  length:
 *                      type: integer
 *                      description: the lenght of product packet
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 *          edit-product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  shortText:
 *                      type: string
 *                      description: the shortText of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: integer
 *                      description: the height of product packet
 *                  width:
 *                      type: integer
 *                      description: the width of product packet
 *                  weight:
 *                      type: integer
 *                      description: the weight of product packet
 *                  length:
 *                      type: integer
 *                      description: the lenght of product packet
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

/**
 * @swagger
 *  /admin/products/edit/{id}:
 *      patch:
 *          tags: [Product(Admin Panel)]
 *          summary: create and save product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of product for update product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/edit-product'
 *          
 *          responses:
 *              200:
 *                  description: updated Product
 */
router.patch("/edit/:id", uploadFile.array("images", 10) , stringToArray("tags") , productController.editProduct);


module.exports = {
    productRoute : router,
}