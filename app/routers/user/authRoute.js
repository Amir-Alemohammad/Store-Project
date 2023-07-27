const {Router} = require("express");

const {authController} = require("../../controllers/user/auth/authController");

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          getOtp:
 *              type: object
 *              required:
 *                  -   phoneNumber
 *              properties:
 *                  phoneNumber:
 *                      type: string
 *                      description: user phone number for signin/signup
 *          CheckOtp:
 *              type: object
 *              required:
 *                  -   phoneNumber
 *                  -   code
 *              properties:
 *                  phoneNumber:
 *                      type: string
 *                      description: user phone number for signin/signup
 *                  code:
 *                      type: integer
 *                      description: recived code from getOTP
 *          register:
 *              type: object
 *              required:
 *                  -   phoneNumber
 *                  -   firstname
 *                  -   lastname
 *                  -   email
 *                  -   password
 *              properties:
 *                  phoneNumber:
 *                      type: string
 *                      description: user phone number for signin/signup
 *                  firstname:
 *                      type: string
 *                      description: user firstname for signup
 *                  lastname:
 *                      type: string
 *                      description: user lastname for signup
 *                  email:
 *                      type: string
 *                      description: user email for signup
 *                  password:
 *                      type: string
 *                      description: user password for signup
 *          refreshToken:
 *              type: object
 *              required: 
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: refresh token 
 *
 */




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
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/x-www-form-urlencoded:
 *                         schema:
 *                             $ref: '#/components/schemas/register'
 *                      application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/register'        
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
 * 
 * @swagger
 *  /user/getOtp:
 *          post:
 *              summary: user getOtp with phoneNumber
 *              tags: [User Authorization]
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/x-www-form-urlencoded:
 *                         schema:
 *                             $ref: '#/components/schemas/getOtp'
 *                      application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/getOtp' 
 * 
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
router.post("/getOtp",authController.getOtp);
/**
 * 
 * @swagger
 *  /user/CheckOtp:
 *          post:
 *              summary: user checkOtp with phoneNumber and code
 *              tags: [User Authorization]
 *              requestBody:
 *                  required: true
 *                  content: 
 *                      application/x-www-form-urlencoded:
 *                         schema:
 *                             $ref: '#/components/schemas/CheckOtp'
 *                      application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/CheckOtp' 
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
router.post("/checkOtp",authController.checkOtp);
/**
 * @swagger
 *  /user/refresh-token:
 *              post:
 *                  summary: Create Refresh Token
 *                  tags: [User Authorization]
 *                  description: new Token
 *                  requestBody:
 *                      required: true
 *                      content: 
 *                          application/x-www-form-urlencoded:
 *                              schema:
 *                                  $ref: '#/components/schemas/refreshToken'
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/refreshToken' 
 *                  responses:
 *                          200:
 *                              description: Success                     
 *                          
 */
router.post("/refresh-Token",authController.refreshToken);

module.exports = {
    userAuthRoute : router,
}