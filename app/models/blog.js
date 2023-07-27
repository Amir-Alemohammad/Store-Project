const mongoose = require("mongoose");
const { blogSchemaValidation } = require("../validators/admin/blog.validation");
const { commentSchema } = require("./public.schemas");



const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: "user",
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
        ref: "category",
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
},{
    timestamps: true,
    versionKey: false,
});






blogSchema.statics.blogValidation = function(body){
    return blogSchemaValidation.validate(body);
}


const blogModel = mongoose.model("blogModel", blogSchema);

module.exports = blogModel;