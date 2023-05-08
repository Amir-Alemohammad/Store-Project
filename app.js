const express = require("express");
const dotenv = require("dotenv");

const path = require("path");
const connectDB = require("./configs/database");
const {setHeaders} = require("./middlewares/handleHeaders");
const {errorHandler} = require("./middlewares/errorHandler");
const errorController = require("./controllers/errorController");
const {AllRoutes}= require("./routers/router")
const app = express();


//config DotEnv
dotenv.config({
    path : "./configs/config.env",
});


//config Data Base
connectDB();

//set Headers
app.use(setHeaders);


// Pars Body
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//Static Folder
app.use(express.static(path.join(__dirname , "public")));


//Handle Routes
app.use(AllRoutes);




//Error Handeling
app.use(errorController.get404);
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`Server Running : http://localhost:${process.env.PORT}`)
})