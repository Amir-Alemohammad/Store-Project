const categoryModel = require("../../models/categories");
const { categorySchema } = require("../../validators/admin/category.validation");

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
            statusCode: 200,
            data: {
              parents,
            },
        });

    } catch (err) {
        next(err);
    }
}
const getChildOfParents = async (req,res,next) => {
    try {
        
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