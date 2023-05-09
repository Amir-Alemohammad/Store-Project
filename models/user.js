const mongoose = require("mongoose");

const {authSchema} = require("../validators/user/authValidation");

const userSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required : true
    },
    lastname:{
        type : String,
        required : true
    },
    username:{
        type : String,
        lowercase : true,
    },
    phoneNumber:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        lowercase : true,
    },
    password:{
        type : String,
        required : true
    },
    otp:{
        type : Object,
        default:{
            code : 0,
            expires : 0
        },
    },
    bills:{
        type : [],
        default : [],
    },
    discount:{
        type : Number,
        default : 0,
    },
    birt : {
        type : String,
    },
    Roles: {
        type : [String],
        default : ["USER"],
    }
});
userSchema.statics.userValidation = function(body){
    return authSchema.validate(body,{abortEarly : true})
}
const userModel = mongoose.model("userModel",userSchema);


module.exports = userModel;