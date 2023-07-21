const mongoose = require("mongoose");
const { blogSchemaValidation } = require("../validators/admin/blog.validation");

const commentSchema = new mongoose.Schema({
    user : {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    comment : {
        type: String,
        required : true,
    },
    createdAt : {
        type: Date,
        deafult : new Date().now,
    },
    parent:{
        type: mongoose.Types.ObjectId,
    }
});

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    shortText: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    category: {
        type: [mongoose.Types.ObjectId],
        required: true,
    },
    comment: {
        type: [commentSchema],
        default: [],
    },
    like: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: "user"
    },
    deslike: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: "user"
    },
    bookmark: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: "user"
    },
},{timestamps : true , versionKey : false});


blogSchema.statics.blogValidation = function(body){
    return blogSchemaValidation.validate(body);
}


const blogModel = mongoose.model("blogModel", blogSchema);

module.exports = blogModel;