const createError = require("http-errors")

const categoryModel = require("../../models/categories");
const { categorySchema } = require("../../validators/admin/category.validation");
const { mongoIdValidation } = require("../../validators/admin/mongoId.validation");
const mongoose = require("mongoose");



const addCategory = async (req,res,next) => {
    try {
        await categorySchema.validate(req.body);
        const {title,parent} = req.body;
        const category = await categoryModel.create({title,parent});
        if(!category){
            const error = new Error("خطایی از سمت سرور رخ داده است");
            error.statusCode = 500;
            throw error;
        }
        return res.status(201).json({
            data:{
                statusCode:201,
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
const removeCategory = async (req,res,next) => {
    try {
        await mongoIdValidation.validate(req.params);

        const {id} = req.params;

        const category = await categoryModel.findById(id);

        if(!category) throw createError.NotFound("دسته بندی پیدا نشد");

        const deleteResult = await categoryModel.deleteMany({
            $or: [{ _id: category._id }, { parent: category._id }],
          });
        

        if(deleteResult.deletedCount == 0) throw createError.InternalServerError("خطای سرور رخ داده است");

        return res.status(200).json({
            data:{
                statusCode : 200,
                message: "حذف دسته بندی با موفقیت انجام شد",
            }
        });

    } catch (err) {
        next(err);
    }
}
const editCategory = async (req,res,next) => {
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
        return res.status(200).json({
            data:{
                statusCode: 200,
                message: "ویرایش دسته بندی با موفقیت انجام شد"
            }
        })
    } catch (err) {
        next(err);
    }
}
const getAllCategory = async (req,res,next) => {
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
        return res.status(200).json({
            data:{
                statusCode : 200,
                categories
            }
        })
    } catch (err) {
        next(err);
    }
}
const getCategoryById = async (req,res,next) => {
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
                    localField: "_id",
                    foreignField: "parent",
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
        
        return res.status(200).json({
            data:{
                category
            }
        });
    } catch (err) {
        next(err);
    }
}
const getAllParents = async (req,res,next) => {
    try {
        
        const parents = await categoryModel.find(
            { parent: undefined },
            { __v: 0 }
        );
        return res.status(200).json({
            data: {
              statusCode: 200,
              parents,
            },
        });

    } catch (err) {
        next(err);
    }
}
const getChildOfParents = async (req,res,next) => {
    try {
        await mongoIdValidation.validate(req.params);
        const {id} = req.params;
        const children = await categoryModel.find(
            {parent : id},
            {__v : 0}    
        );
        return res.status(200).json({
            data:{
                statusCode : 200,
                children
            }
        })
    } catch (err) {
        next(err);
    }
}
const getAllCategoryWithoutPopulate = async (req,res,next) => {
    try {
        const categories = await categoryModel.aggregate([
            {$match: {}}
        ]);
        return res.status(200).json({
            data:{
                statusCode: 200,
                categories
            }
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {  
    addCategory,
    removeCategory,
    editCategory,
    getAllCategory,
    getCategoryById,
    getAllParents,
    getChildOfParents,
    getAllCategoryWithoutPopulate,
}