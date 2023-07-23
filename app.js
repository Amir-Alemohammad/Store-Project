const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


const path = require("path");
const connectDB = require("./configs/database");
const {setHeaders} = require("./middlewares/handleHeaders");
const { errorHandler } = require("./middlewares/errorHandler");
const errorController = require("./controllers/errorController");
const {AllRoutes}= require("./routers/router");
const app = express();



//morgan Logger
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}
    



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


//Swagger Ui
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerJsDoc({
    definition : {
        openapi: "3.0.0",
        info : {
            title : "Amir Store",
            version : "2.0.0",
            description : "سایتی برای خرید دوره های برنامه نویسی و وبلاگ",
            contact: {
                name: "Amir-Alemohammad",
                email: "amirho3inalemohammad@gmail.com",
            }
        },
        servers:[
            {
                url : "http://127.0.0.1:3000"
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },

    apis: ["./routers/*/*.js"],
}),{explorer:true}));



//Handle Routes
app.use(AllRoutes);


//Error Handeling
app.use(errorController.get404);
app.use(errorHandler);





app.listen(process.env.PORT,()=>{
    console.log(`Server Running : http://localhost:${process.env.PORT} on ${process.env.NODE_ENV} mode`)
})