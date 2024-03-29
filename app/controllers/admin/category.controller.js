const createError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");

const categoryModel = require("../../models/categories");
const { categorySchema } = require("../../validators/admin/category.validation");
const { mongoIdValidation } = require("../../validators/admin/mongoId.validation");
const mongoose = require("mongoose");
const Controller = require("../controller");

class categoryController extends Controller{

    async addCategory(req,res,next){
        try {
            await categorySchema.validate(req.body);
            const {title,parent} = req.body;
            const category = await categoryModel.create({title,parent});
            if(!category){
                const error = new Error("خطایی از سمت سرور رخ داده است");
                error.statusCode = 500;
                throw error;
            }
            return res.status(HttpStatus.CREATED).json({
                data:{
                    statusCode:HttpStatus.CREATED,
                    message: "دسته بندی با موفقیت افزوده شد"
                },
                category:{
                    title : category.title,
                    id : category._id
                },
            })
        } catch (err) {
            next(err);
        }
    }
    async removeCategory(req,res,next){
        try {
            await mongoIdValidation.validate(req.params);
    
            const {id} = req.params;
    
            const category = await categoryModel.findById(id);
    
            if(!category) throw createError.NotFound("دسته بندی پیدا نشد");
            
            const deleteResult = await categoryModel.deleteMany({
                $or: [{ _id: category._id }, { parent: category._id }],
              });
            
    
            if(deleteResult.deletedCount == 0) throw createError.InternalServerError("خطای سرور رخ داده است");
    
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode : HttpStatus.OK,
                    message: "حذف دسته بندی با موفقیت انجام شد",
                }
            });
    
        } catch (err) {
            next(err);
        }
    }
    async editCategory(req,res,next){
        try {
            await mongoIdValidation.validate(req.params);
            const {id} = req.params;
            const {title} = req.body;
            const category = await categoryModel.findById(id);
            if(!category) throw createError.NotFound("دسته بندی جهت ویرایش وجود ندارد")
            const updateResult = await categoryModel.updateOne({_id : id},{
                $set:{
                    title,
                }
            })
            if(updateResult.modifiedCount == 0) throw createError.InternalServerError("خطایی از سمت سرور رخ داده است");
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode: HttpStatus.OK,
                    message: "ویرایش دسته بندی با موفقیت انجام شد"
                }
            })
        } catch (err) {
            next(err);
        }
    }
    async getAllCategory(req,res,next){
        try {
            // const category = await categoryModel.aggregate([
            //     {
            //         $graphLookup:{
            //             from : "categorymodels",
            //             startWith : "$_id",
            //             connectFromField : "_id",
            //             connectToField : "parent",
            //             maxDepth : 5,
            //             depthField : "depth",
            //             as : "children"
            //         },
            //     },
            //     {
            //         $project:{
            //             __v : 0,
            //             "children.__v": 0,
            //             "children.parent" : 0,
            //         }
            //     },
            //     {
            //         $match:{
            //             parent: undefined
            //         }
            //     },
            // ]);
            const categories = await categoryModel.find({parent : undefined},{__v : 0});
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode : HttpStatus.OK,
                    categories
                }
            })
        } catch (err) {
            next(err);
        }
    }
    async getCategoryById(req,res,next){
        try {
            await mongoIdValidation.validate(req.params)
            const {id} = req.params;
            const category = await categoryModel.aggregate([
                {
                    $match:{_id : new mongoose.Types.ObjectId(id)}
                },
                {
                    $lookup:{
                        from: "categorymodels",
                        foreignField: "parent",
                        localField: "_id",
                        as : "children",
                    },
                },
                {
                    $project: {
                        __v : 0,
                        "children.__v": 0,
                        "children.parent" : 0,
                    }
                },
            ]);
    
            if(category.length == 0) throw createError.NotFound("دسته بندی پیدا نشد");
            
            return res.status(HttpStatus.OK).json({
                data:{
                    category
                }
            });
        } catch (err) {
            next(err);
        }
    }
    async getAllParents(req,res,next){
        try {
            
            const parents = await categoryModel.find(
                { parent: undefined },
                { __v: 0 }
            );
            return res.status(HttpStatus.OK).json({
                data: {
                  statusCode: HttpStatus.OK,
                  parents,
                },
            });
    
        } catch (err) {
            next(err);
        }
    }
    async getChildOfParents(req,res,next){
        try {
            await mongoIdValidation.validate(req.params);
            const {id} = req.params;
            const children = await categoryModel.find(
                {parent : id},
                {__v : 0}    
            );
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode : HttpStatus.OK,
                    children
                }
            })
        } catch (err) {
            next(err);
        }
    }
    async getAllCategoryWithoutPopulate(req,res,next){
        try {
            const categories = await categoryModel.aggregate([
                {$match: {}}
            ]);
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode: HttpStatus.OK,
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    
}



module.exports = {  
    categoryController: new categoryController()
}