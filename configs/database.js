const mongoose = require("mongoose");
mongoose.set("strictQuery",false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`mongoDB connected: http://${conn.connection.host}:${process.env.PORT}`);
        process.on("SIGINT",async()=>{
            await mongoose.connection.close();
            proccess.exit(0); // exit with success
        });
    } catch (err) {
        console.log(err);
        process.exit(1); // exit with failure
    }
}
module.exports = connectDB;