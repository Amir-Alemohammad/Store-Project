const mongoose = require("mongoose");
const { commentSchema } = require("./public.schemas");
const { productValidationSchema } = require("../validators/admin/product.validation");


const productSchema = new mongoose.Schema({
    
    title: {type : String, required : true},
    shortText : {type : String, required: true},
    text: { type : String, required : true},
    price : {type : Number, default : 0,},
    discount : {type : Number, default : 0,},
    count : {type : Number},
    images : {type : [String], required : true},
    tags : {type : [String], default : []},
    likes : {type : [String], default : []},
    deslikes : {type : [String], default : []},
    comments : {type : [commentSchema], default : []},
    category : {type : mongoose.Types.ObjectId , required : true , ref: "category"},
    bookmarks : {type : [String], default : []},
    type : {type : String, enum: ["virtual" , "physical"] , required : true}, //virtual - physical    
    format : {type : String},
    supplier : {type : mongoose.Types.ObjectId , required : true},

    feture : {
        type : Object,
        default : {
            length : "",
            height : "",
            width : "",
            weight : "",
            colors : [],
            model : [],
            madein : "",
        },
    },

});


productSchema.statics.productValidation = function(body){
    return productValidationSchema.validate(body);
}

const productModel = mongoose.model("productModel",productSchema);

module.exports = productModel;