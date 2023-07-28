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
    const filePath = path.join(__dirname , ".." , ".." , "public" , fileAddress);
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

function copyObject(object){
    return JSON.parse(JSON.stringify(object));
}

function setfeatures(body){
    
            let {colors , width , length , height , weight} = body;
            
            width = Number(width);
            length = Number(length);
            height = Number(height);
            weight = Number(weight);
    
            let features = {}
    
            features.colors = colors;
            
            if(width || length || height || weight){
                if(!width || typeof width === "string") features.width = 0;
                else features.width = width;
                
                if(!length || typeof length === "string") features.length = 0;
                else features.length = length;
                
                if(!height || typeof height === "string") features.height = 0;
                else features.height = height;
                
                if(!weight || typeof weight === "string") features.weight = 0;
                else features.weight = weight;
            }
            return features;
}

function deleteInvalidPropertyInObject(data = {} , blackListFields = []){

        let nullishData = [ "" , null , 0 , "0" , " " , undefined];

        Object.keys(data).forEach(key => {
                
        if(blackListFields.includes(key)) delete data[key]
        
        if(typeof data[key] === "string") data[key] = data[key].trim();
        
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
        
        if(Array.isArray(data[key]) && data[key].length == 0) delete data[key]

        if (nullishData.includes(data[key])) delete data[key]
    });
    return data;
}

module.exports = {
    RandomNumberGenerator,
    verifyRefreshToken,
    deleteFileInPublic,
    verifyJwtToken,
    listOfImagesFormRequest,
    copyObject,
    setfeatures,
    deleteInvalidPropertyInObject,
}