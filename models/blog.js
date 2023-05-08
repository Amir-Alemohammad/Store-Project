const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

})

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    title: {
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
        type: mongoose.Types.ObjectId,
        required: true,
    },
    comment: {
        type: [commentSchema],
        default: [],
    },
    like: {
        type: [mongoose.Types.ObjectId],
        default: [],
    },
    deslike: {
        type: [mongoose.Types.ObjectId],
        default: [],
    },
    bookmark: {
        type: [mongoose.Types.ObjectId],
        default: [],
    },
});


const blogModel = mongoose.model("blogModel", blogSchema);

module.exports = blogModel;