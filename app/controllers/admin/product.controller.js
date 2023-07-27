const createHttpError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");


const productModel = require("../../models/product");
const { deleteFileInPublic, listOfImagesFormRequest } = require("../../utils/functions");
const { mongoIdValidation } = require("../../validators/admin/mongoId.validation");
const categoryModel = require("../../models/categories");
const Controller = require("../controller");


class productController extends Controller{

    async addProduct(req,res,next){
        try {
            
    
            let {title,shortText,text,tags,category,fileUploadPath , price , discount , count , height , width , weight , length , colors} = req.body;
    
            const images = listOfImagesFormRequest(req?.files || [],fileUploadPath)
    
            images.map((image)=>{
                req.body.image = image;
            });
            
            const supplier = req.userId;
    
            await productModel.productValidation(req.body);
    
            width = Number(width);
            length = Number(length);
            height = Number(height);
            weight = Number(weight);
    
        
    
            let feture = {} , type = "physical"
    
            feture.colors = colors;
            
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
            
            const categories = await categoryModel.findById(category);
    
            if(!categories) throw createHttpError.NotFound("دسته بندی مورد نظر یافت نشد")
    
            const product = await productModel.create({
                title,
                shortText,
                text,
                tags,
                category,
                images,
                price,
                discount,
                type,
                count,
                feture,
                supplier,
            });
    
            
            return res.status(HttpStatus.CREATED).json({
                data:{
                    statusCode: HttpStatus.CREATED,
                    message: "محصول شما با موفقیت ساخته شد",
                }
            });
        } catch (error) {
            deleteFileInPublic(req.body.image);
            next(error);
        }
    }

    async editProduct(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    
    async removeProduct(req,res,next){
        try {
            await mongoIdValidation.validate(req.params);
            const {id} = req.params;
            const product = await productModel.findById(id);
            if(!product) throw new createHttpError.NotFound("محصولی با این شناسه یافت نشد");

            const removeProduct = await productModel.deleteOne({_id : product._id});

            if(removeProduct.deletedCount === 0) throw createHttpError.InternalServerError('مشکلی از سمت سرور رخ داده است')


            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode: HttpStatus.OK,
                    message: "محصول مورد نظر با موفقیت حذف شد"
                }
            })

        } catch (error) {
            next(error)
        }
    }
    
    async getAllProducts(req,res,next){
        try {
            const products = await productModel.find({});
            if(!products) throw createHttpError.NotFound("محصولی یافت نشد");
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode: HttpStatus.OK,
                    products,
                }
            });
        } catch (error) {
            next(error)
        }
    }

    async getOneProduct(req,res,next){
        try {
            await mongoIdValidation.validate(req.params);
            const {id} = req.params;
            const product = await productModel.findById(id);
            if(!product) throw new createHttpError.NotFound("محصولی با این شناسه یافت نشد");
    
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode: HttpStatus.OK,
                    product
                }
            })
        } catch (error) {
            next(error)
        }
    }

}



module.exports = {
    productController : new productController(),
}