const Application = require("./app/app");

new Application(process.env.PORT, process.env.DB_URL)