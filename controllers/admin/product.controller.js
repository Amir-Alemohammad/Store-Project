const createHttpError = require("http-errors");
const productModel = require("../../models/product");
const { deleteFileInPublic } = require("../../utils/functions");

const addProduct = async (req,res,next) => {
    try {
        
        let {title,shortText,text,tags,category,fileUploadPath,filename , price , discount , count , height , width , weight , length} = req.body;
        
        const image = req.body.image = fileUploadPath + "/" + filename;
        
        const supplier = req.userId

        await productModel.productValidation(req.body);

        width = Number(width);
        length = Number(length);
        height = Number(height);
        weight = Number(weight);

    
        let feture = {} , type = "physical"

        if(width || length || height || weight){
            if(!width || typeof width === "string") feture.width = 0;
            else feture.width = width;
            
            if(!length || typeof length === "string") feture.length = 0;
            else feture.length = length;
            
            if(!height || typeof height === "string") feture.height = 0;
            else feture.height = height;
            
            if(!weight || typeof weight === "string") feture.weight = 0;
            else feture.weight = weight;
        }else{
            type = "virtual"
        }
        

        const product = await productModel.create({
            title,
            shortText,
            text,
            tags,
            category,
            images : image,
            price,
            discount,
            type,
            count,
            feture,
            supplier,
        });
        return res.status(201).json({
            data:{
                statusCode: 201,
                message: "محصول شما با موفقیت ساخته شد",
            }
        });
    } catch (error) {
        deleteFileInPublic(req.body.image);
        next(error);
    }
}
const editProduct = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
const removeProduct = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
const getAllProducts = async (req,res,next) => {
    try {
        const products = await productModel.find({});
        if(!products) throw createHttpError.NotFound("محصولی یافت نشد");
        return res.status(200).json({
            data:{
                statusCode: 200,
                products,
            }
        });
    } catch (error) {
        next(error)
    }
}
const getOneProduct = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}



module.exports = {
    addProduct,
    editProduct,
    removeProduct,
    getAllProducts,
    getOneProduct,
}