const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
    },
    parent:{
        type: mongoose.Types.ObjectId,
        default: undefined,
        ref: "category"
    }
},{
    id: false,
    toJSON:{
        virtuals : true,
    },
});

categorySchema.virtual("children",{
    ref: "categoryModel",
    localField: "_id",
    foreignField : "parent"
});

function autoPopulate(next){
    this.populate([{path : "children", select : {__v : 0 , id : 0}}])
    next();
}

categorySchema.pre("findOne", autoPopulate).pre("find", autoPopulate);


const categoryModel = mongoose.model("categoryModel",categorySchema);

module.exports = categoryModel;