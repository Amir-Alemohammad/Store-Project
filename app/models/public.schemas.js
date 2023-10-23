const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user : {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    text : {
        type: String,
        required : true,
    },
    blog:{
        type:[mongoose.Types.ObjectId],
        ref:"blog" 
    },
    createdAt : {
        type: Date,
        default : new Date().getTime(),
    },
});




module.exports ={
    commentSchema,
}