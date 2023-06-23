const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
    },
    parent:{
        type: mongoose.Types.ObjectId,
        default: undefined,
    }
});
const categoryModel = mongoose.model("categoryModel",categorySchema);
module.exports = categoryModel;