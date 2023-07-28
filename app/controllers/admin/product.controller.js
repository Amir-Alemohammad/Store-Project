const createHttpError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");


const productModel = require("../../models/product");
const { deleteFileInPublic, listOfImagesFormRequest , copyObject, setfeaturess, setfeatures, deleteInvalidPropertyInObject } = require("../../utils/functions");
const { mongoIdValidation } = require("../../validators/admin/mongoId.validation");
const categoryModel = require("../../models/categories");
const Controller = require("../controller");

const ProductBlackList = {
    BOOKMARKS: "bookmarks",
    LIKES: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height",
    COLORS: "colors"
}
Object.freeze(ProductBlackList)


class productController extends Controller{

    async addProduct(req,res,next){
        try {
            
    
            let {title,shortText,text,tags,category,fileUploadPath , price , discount , count , type} = req.body;
    
            const images = listOfImagesFormRequest(req?.files || [],fileUploadPath)
    
            images.map((image)=>{
                req.body.image = image;
            });
            
            const supplier = req.userId;
    
            await productModel.productValidation(req.body);
    

            let features = setfeatures(req.body);
            
            
            
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
                features,
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

            await mongoIdValidation.validate(req.params)

            const {id} = req.params;

            const product = await productModel.findOne({_id : id});

            const data = copyObject(req.body);            
            
            data.images = listOfImagesFormRequest(req?.files || [],req.body.fileUploadPath)
            
            data.features = setfeatures(req.body);
            

            let blackListFields = Object.values(ProductBlackList);
            
            deleteInvalidPropertyInObject(data,blackListFields);
            
            if(!product) throw {status: HttpStatus.NOT_FOUND , message: "محصول مورد نظر پیدا نشد"};

            const updateResult = await productModel.updateOne({_id : product._id},{$set : data});

            if(updateResult.modifiedCount == 0) throw {status: HttpStatus.INTERNAL_SERVER_ERROR , message: "خطایی از سمت سرور رخ داده است"}

            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode : HttpStatus.OK,
                    message : "ویرایش محصول با موفقیت انجام شد"
                }
            });

        } catch (error) {
            next(error);
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
            
            const search = req?.query?.search || "";

            let products;
            if(search){
                products = await productModel.find({
                    $text : {
                        $search: search
                    },
                });
            }else{
                products = await productModel.find({});
            }

            if(products.length <= 0) throw createHttpError.NotFound("محصولی یافت نشد");

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