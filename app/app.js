const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors")


const path = require("path");
const {setHeaders} = require("./middlewares/handleHeaders");
const { errorHandler } = require("./middlewares/errorHandler");
const errorController = require("./controllers/errorController");
const {AllRoutes}= require("./routers/router");
const { default: mongoose } = require("mongoose");

dotenv.config();


module.exports = class Application{
    
    #app = express();
    #DB_URI;
    #PORT;

    constructor(PORT , DB_URI){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.createServer();
        this.connectToDB();
        this.createRoutes();
        this.handleErrors();
    }

    configApplication(){
        this.#app.use(cors());
        //morgan logger
        if(process.env.NODE_ENV === "development"){
            this.#app.use(morgan("dev"))
        }
        //set Headers
        this.#app.use(setHeaders);
        //Parse Body
        this.#app.use(express.urlencoded({extended : false}));
        this.#app.use(express.json());
        //Static Folder
        this.#app.use(express.static(path.join(__dirname ,".." , "public")));
        //Swagger Ui
        this.#app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerJsDoc({
        swaggerDefinition:{
            openapi : "3.0.1",
            info: {
                title: "Amir Store",
                version: "2.0.0",
                description: "سایتی برای خرید دوره های برنامه نویسی",
                contact:{
                    name: "Amir-Alemohammad",
                    email: "amirho3inalemohammad@gmail.com",
                }
            },
            servers:[
                {
                    url: "http://localhost:3000"
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                }
            },
            security: [{
                bearerAuth : []
            }]
        },

        apis: ["./app/routers/*/*.js"],
    }),{explorer:true}));

    }

    createServer(){
        this.#app.listen(this.#PORT,() => {
            console.log(`Server Running : http://localhost:${process.env.PORT} on ${process.env.NODE_ENV} mode`)
        })
    }

    async connectToDB(){
        mongoose.set("strictQuery",false);
        try {
            const conn = await mongoose.connect(this.#DB_URI);
            console.log(`mongoDB connected: http://${conn.connection.host}:${this.#PORT}`);
            process.on("SIGINT",async() => {
                await mongoose.connection.close();
                proccess.exit(0); // exit with success
            });
        } catch (err) {
            console.log(err);
            process.exit(1); // exit with failure
        }
    }
    handleErrors(){
        //Error Handeling
        this.#app.use(errorController.get404);
        this.#app.use(errorHandler);
    }
    createRoutes(){        
        //Handle Routes
        this.#app.use(AllRoutes);
    }
}

