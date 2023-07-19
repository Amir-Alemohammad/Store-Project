const createError = require("http-errors")

const categoryModel = require("../../models/categories");
const { categorySchema } = require("../../validators/admin/category.validation");
const { mongoIdValidation } = require("../../validators/admin/mongoId.validation");



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

        const deleteCategory = await categoryModel.deleteOne({_id : category._id});

        if(deleteCategory.deletedCount == 0) throw createError.InternalServerError("خطای سرور رخ داده است");

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
        
    } catch (err) {
        next(err);
    }
}
const getAllCategory = async (req,res,next) => {
    try {
        const category = await categoryModel.aggregate([
            {
                $lookup:{
                    from : "categorymodels",
                    localField : "_id",
                    foreignField : "parent",
                    as : "children"
                },
            },
            {
                $project:{
                    __v : 0,
                    "children.__v": 0,
                    "children.parent" : 0,
                }
            }
        ]);
        return res.status(200).json({
            data:{
                statusCode : 200,
                category
            }
        })
    } catch (err) {
        next(err);
    }
}
const getCategoryById = async (req,res,next) => {
    try {
        
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
module.exports = {  
    addCategory,
    removeCategory,
    editCategory,
    getAllCategory,
    getCategoryById,
    getAllParents,
    getChildOfParents,
}