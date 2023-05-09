const {Router} = require("express");

const authController = require("../../controllers/user/auth/authController");

const router = Router();

router.post("/login",authController.login);

module.exports = {
    userAuthRoute : router,
}