const {Router} = require("express");

const authController = require("../../controllers/user/auth/authController");

const router = Router();

/**
 * @swagger
 *  tags:
 *      name: User Authorization
 *      description: User Auth Section
 */
/**
 * @swagger
 * 
 *  /user/login:
 *          post:
 *              summary: login user in user panel with phone number
 *              tags : [User Authorization]
 *              description: one time password(otp) login
 *              parameters:
 *              -   name: phoneNumber
 *                  description: fa-IRI phone number
 *                  in: formData
 *                  required: true
 *                  type: string
 *              responses:
 *                      201:
 *                          description: Success
 *                      400:
 *                          description: Bad Request
 *                      401:
 *                          description: Unauthorization
 *                      500:
 *                          description: Internal Server Error
 *          
 */
router.post("/login",authController.login);

module.exports = {
    userAuthRoute : router,
}