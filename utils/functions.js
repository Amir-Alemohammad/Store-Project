const jwt = require("jsonwebtoken");
const createError = require("http-errors");


const userModel = require("../models/user");
const path = require("path")
const fs = require("fs");
const createHttpError = require("http-errors");


const RandomNumberGenerator = () =>{
    return Math.floor(Math.random() * 90000 + 10000);
}
const verifyRefreshToken =  (refreshToken)=>{
    const authHeader = refreshToken;


    const token = authHeader; // Bearer Token ==> ["Bearer","Token"]
    

    return new Promise((resolve,reject)=>{

        jwt.verify(token,process.env.REFRESH_TOKEN_SECRET, async (err,payload)=>{

            if(err) {
                console.log(err)
                reject(createError.Unauthorized("لطفا وارد حساب کاربری خود شوید"))
            };
            
            const {phoneNumber} = payload || {};
            
            if(!phoneNumber) reject(createError.Unauthorized("لطفا وارد حساب کاربری خود شوید"));
            
            const user = await userModel.findOne({phoneNumber},{password : 0 , otp: 0, email: 0,discount: 0,Roles: 0,createdAt: 0,updatedAt:0,bills: 0});
            
            if(!user) reject(createError.NotFound("حساب کاربری پیدا نشد"));
            
            resolve(phoneNumber)
        });
        
    });
    
}
function deleteFileInPublic(fileAddress){
    const filePath = path.join(__dirname , ".." , "public" , fileAddress);
    fs.unlinkSync(filePath)
}
function verifyJwtToken(token) {
    const result = jwt.verify(token,process.env.JWT_SECRET,function(err,decoded){
        if(err && err.message === "jwt expired"){
            throw createHttpError.Unauthorized("expireلطفا وارد حساب کاربری خود شوید")
        }else{
            return decoded;
        }
    });    
    return result;
}
function listOfImagesFormRequest(files,fileUploadPath){
    if(files?.length > 0){
        return (files.map(file => path.join(fileUploadPath,file.filename)))
    }else{
        return [];
    }
}
module.exports = {
    RandomNumberGenerator,
    verifyRefreshToken,
    deleteFileInPublic,
    verifyJwtToken,
    listOfImagesFormRequest,
}