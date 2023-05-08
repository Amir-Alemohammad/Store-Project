const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    
    title: {type : String,required : true},
    
    shortDesc : {type : String,required: true},
    
    description: { type : String,required : true},
    
    price : {type : Number,default : 0,},
    
    discount : {type : Number,default : 0,},
    
    count : {type : Number},
    
    images : {type : [String],required : true},
    
    tags : {type : [String],default : []},

    like : {type : [String],default : []},
    
    deslike : {type : [String],default : []},
    
    comments : {type : [],default : []},
    
    category : {type : mongoose.Types.ObjectId,required : true},
    
    bookmark : {type : [String],default : []},

    type : {type : String,required : true},
    
    time : {type : String,required : true},

    format : {type : String},

    teacher : {type : mongoose.Types.ObjectId,required : true},

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

const productModel = mongoose.model("productModel",productSchema);

module.exports = productModel;