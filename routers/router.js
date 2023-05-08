const {Router} = require("express");

const {HomeRoute} = require("./api/index");

const router = Router();


router.use("/",HomeRoute);






module.exports = {
    AllRoutes : router,
}