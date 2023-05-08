const {Router} = require("express");

const homeController = require("../../controllers/api/homeController");

const router = Router();

router.get("/",homeController.homePage);


module.exports = {
    HomeRoute : router,
}