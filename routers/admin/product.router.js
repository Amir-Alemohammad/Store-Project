const {Router} = require("express");

const productController = require("../../controllers/admin/product.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray");

const router = Router();



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
 *                  -   image
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
 *                  image:
 *                      type: file
 *                      desctiption: the image of product
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
router.post("/add", uploadFile , stringToArray("tags") , productController.addProduct);


router.put("/edit/:id", productController.editProduct);


router.delete("/remove/:id", productController.removeProduct);


module.exports = {
    productRoute : router,
}