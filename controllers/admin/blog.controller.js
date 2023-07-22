const createHttpError = require("http-errors");

const blogModel = require("../../models/blog");
const categoryModel = require("../../models/categories");
const { deleteFileInPublic } = require("../../utils/functions");
const {mongoIdValidation} = require("../../validators/admin/mongoId.validation");
const { default: mongoose } = require("mongoose");


const createBlog = async (req,res,next) =>{
    try {
        const {title,shortText,text,tags,category,fileUploadPath,filename} = req.body;
        
        const image = req.body.image = fileUploadPath + "/" + filename;
        
        const author = req.userId;

        await blogModel.blogValidation(req.body);
        
        const categories = await categoryModel.findOne({
            _id : category
        })

        if(!categories) throw createHttpError.BadRequest("دسته بندی یافت نشد")

        const blog = await blogModel.create({
            author,
            title,
            shortText,
            text,
            image,
            tags,
            category,

        });
        return res.status(201).json({
            statusCode: 201,
            data:{
                message: "پست شما با موفقیت ساخته شد",
            }
        })
    } catch (error) {
        deleteFileInPublic(req.body.image)
        next(error)
    }
}
const getBlogById = async (req,res,next) =>{
    try {
        await mongoIdValidation.validate(req.params);
        
        const {id} = req.params;
        
        const blog = await blogModel.aggregate([
            {
                $match: {_id : new mongoose.Types.ObjectId(id)}
            },
            {
                $lookup:{
                    from: "categorymodels",
                    foreignField: "_id",
                    localField: "category",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $lookup:{
                    from: "usermodels",
                    foreignField: "_id",
                    localField: "author",
                    as: "author"
                }
            },
            {
                $unwind: "$author"
            },
            {
                $project:{
                    "category.__v":0,
                    "author.refreshToken":0,
                    "author.password":0,
                    "author.otp":0,
                    "author.discount":0,
                    "author.bills":0,
                    "author.Roles":0,
                    "author.createdAt":0,
                    "author.updatedAt":0,
                    "author.__v":0,
                },
            }

        ]);

        if(blog.length <= 0) throw createHttpError.NotFound("پستی با این مشخصات پیدا نشد");
        
        return res.status(200).json({
            data:{
                statusCode : 200,
                blog,
            }
        })
    } catch (error) {
        next(error)
    }
}
const getListOfBlogs = async (req,res,next) =>{
    try {
        const blogs = await blogModel.aggregate([
            {
                $match: {}
            },
            {
                $lookup:{
                    from: "usermodels",
                    foreignField: "_id",
                    localField: "author" ,
                    as: "author",
                }
            },
            {
                $unwind: "$author"
            },
            {
                $project:{
                    "author.otp" : 0,
                    "author.refreshToken" : 0,
                    "author.discount" : 0,
                    "author.bills": 0,
                    "author.Roles": 0,
                    "author.__v": 0,
                    "author.createdAt": 0,
                    "author.updatedAt": 0,
                }
            },
            {
                $lookup:{
                    from: "categorymodels",
                    foreignField: "_id",
                    localField: "category" ,
                    as: "category",
                }
            },
            {
                $unwind: "$category"
            },
            {
                $project:{
                    "category.__v":0,
                }
            }

        ])
        return res.status(200).json({
            statusCode: 200,
            data:{
                blogs
            }
        })
    } catch (error) {
        next(error)
    }
}
const getCommentOfBlog = async (req,res,next) =>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const deleteBlogById = async (req,res,next) =>{
    try {
        await mongoIdValidation.validate(req.params)
        const {id} = req.params;
        
        const blog = await blogModel.findOne({_id : id});

        if(!blog) throw createHttpError.NotFound("پست مورد نظر پیدا نشد")
        
        const deleteResult = await blogModel.deleteOne({_id : id})
        
        if(deleteResult.deletedCount == 0) throw createError.InternalServerError("خطای سرور رخ داده است");
        
        if(blog.image !== "undefined/undefined"){
            deleteFileInPublic(blog.image)
        }
        

        return res.status(200).json({
            data:{
                statusCode: 200,
                message: "پست مورد نظر با موفقیت حذف شد",
            }
        })
    } catch (error) {
        next(error)
    }
}
const updateBlogById = async (req,res,next) =>{
    try {
        
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createBlog,
    deleteBlogById,
    getBlogById,
    getCommentOfBlog,
    getListOfBlogs,
    updateBlogById,
}