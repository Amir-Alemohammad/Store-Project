const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
    title:{
        type : String,
    },
    text:{
        type : String,
    },
    image:{
        type : String,
        required : true
    },
    type : {
        type : String,
        default : "main"
    }
});

const sliderModel = mongoose.model("sliderModel",sliderSchema);

module.exports = sliderModel;