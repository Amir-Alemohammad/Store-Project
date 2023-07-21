const blogModel = require("../../models/blog")



const createBlog = async (req,res,next) =>{
    try {
        await blogModel.blogValidation(req.body);
        const {title,shortText,text,tags,category,fileUploadPath,filename} = req.body;
        const image = req.body.image = fileUploadPath + "/" + filename;
        const author = req.userId;
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
        next(error)
    }
}
const getBlogById = async (req,res,next) =>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const getListOfBlogs = async (req,res,next) =>{
    try {
        return res.status(200).json({
            statusCode: 200,
            data:{
                blogs : []
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