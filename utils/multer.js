const multer = require("multer");
const shortid = require("shortid");

const path = require("path")
const fs = require("fs");
const createHttpError = require("http-errors");

function createRoute (req) {
    let d = new Date();
    const year = d.getFullYear() + "";
    const month = d.getMonth() + 1 + "";
    const day = d.getDate() + "";
    const directory = path.join(__dirname , ".." , "public" , "uploads" , "blogs" , year , month , day);
    
    req.body.fileUploadPath = path.join("uploads" , "blogs" , year , month , day).replace(/\\/g,"/");
    
    fs.mkdirSync(directory , {recursive : true});
    return directory;
}

const storage = multer.diskStorage({
    destination: (req , file , cb) => {
        if(file?.originalname){
            const filePath = createRoute(req);
            return cb(null,filePath)
        }
        cb(null,null)
    },
    filename: (req , file , cb) => {
        if(file.originalname){
            const fileName = `${shortid.generate()}_${file.originalname}`;
            req.body.filename = fileName;
            return cb(null , fileName)
        }
        cb(null,null)
    }
});

const fileFilter = function(req , file , cb){
    const mimetypes = ["image/jpg","image/gif","image/jpeg","image/png","image/webp"]
    if(!mimetypes.includes(file.mimetype)){
        return cb(createHttpError.BadRequest("فرمت ارسال شده صحیح نمی باشد"))
    }else{
        return cb(null,true)
    }
}

const maxSize = 1 * 1000 * 1000

const uploadFile = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: maxSize,
    }
});

module.exports = {
    uploadFile,
}

