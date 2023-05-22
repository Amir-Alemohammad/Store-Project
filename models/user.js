const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
        required : true,
        unique: true,
    },
    email:{
        type : String,
        required : true,
        lowercase : true,
        unique: true,
    },
    refreshToken:{
          type:String,
          default: "Bearer Token"     
    },
    password:{
        type : String,
        required : true
    },
    otp:{
        type : Object,
        default:{
            code : 0,
            expiresIn : 0
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
},{timestamps: true});




userSchema.statics.userValidation = function(body){
    return authSchema.validate(body,{abortEarly : true});
}

//hashing password
userSchema.pre("save",function(next){
    let user = this;
    if(!user.isModified("password")) return next();

    bcrypt.hash(user.password,10,(err,hash)=>{
        if(err) return next(err)
        user.password = hash;
        next();
    })
});


const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;