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
 *  /user/register:
 *          post:
 *              summary: register user in user panel
 *              tags : [User Authorization]
 *              description: register user
 *              parameters:
 *              -   name: phoneNumber
 *                  description: fa-IRI phone number
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: firstname
 *                  description: your name
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: lastname
 *                  description: your last name
 *                  required: true
 *                  in: formData
 *                  type : string
 *              -   name: email
 *                  description: your email address
 *                  required: true
 *                  in: formData
 *                  type: string
 *              -   name: password
 *                  description: your password
 *                  required: true
 *                  in: formData
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
router.post("/register",authController.register);

/**
 * @swagger
 *  tags:
 *      name: User Login
 *      description: User Login Section
 */
/**
 * 
 * @swagger
 *  /user/login:
 *          post:
 *              summary: user login with phoneNumber
 *              tags: [User Login]
 *              parameters:
 *              -   name: phoneNumber
 *                  description: your phone number
 *                  required: true
 *                  in: formData
 *                  type : string
 *              responses:
 *                  200:
 *                      description: Success
 *                  400:
 *                      description: Bad Request 
 *                  401:
 *                      description: Unauthorization
 *                  500:
 *                      description: Internal Server Errro  
 */
router.post("/login",authController.login);

module.exports = {
    userAuthRoute : router,
}