const mongoose = require("mongoose");
mongoose.set("strictQuery",false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`mongoDB connected: http://${conn.connection.host}:${process.env.PORT}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
module.exports = connectDB;