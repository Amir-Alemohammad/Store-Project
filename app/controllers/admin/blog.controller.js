const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");

const blogModel = require("../../models/blog");
const categoryModel = require("../../models/categories");
const { deleteFileInPublic } = require("../../utils/functions");
const { mongoIdValidation } = require("../../validators/admin/mongoId.validation");
const { default: mongoose } = require("mongoose");
const Controller = require("../controller")

class BlogController extends Controller {

    async createBlog(req, res, next) {
        try {
            const { title, shortText, text, tags, category, image } = req.body;

            const author = req.userId;

            await blogModel.blogValidation(req.body);

            const categories = await categoryModel.findOne({
                _id: category
            })

            if (!categories) throw createHttpError.BadRequest("دسته بندی یافت نشد")

            const blog = await blogModel.create({
                author,
                title,
                shortText,
                text,
                image,
                tags,
                category,

            });
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "پست شما با موفقیت ساخته شد",
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    async getBlogById(req, res, next) {
        try {
            await mongoIdValidation.validate(req.params);

            const { id } = req.params;

            const blog = await blogModel.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(id) }
                },
                {
                    $lookup: {
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
                    $lookup: {
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
                    $project: {
                        "category.__v": 0,
                        "author.refreshToken": 0,
                        "author.password": 0,
                        "author.otp": 0,
                        "author.discount": 0,
                        "author.bills": 0,
                        "author.Roles": 0,
                        "author.createdAt": 0,
                        "author.updatedAt": 0,
                        "author.__v": 0,
                    },
                }

            ]);

            if (blog.length <= 0) throw createHttpError.NotFound("پستی با این مشخصات پیدا نشد");

            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    blog,
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfBlogs(req, res, next) {
        try {
            const blogs = await blogModel.aggregate([
                {
                    $lookup: {
                        from: "usermodels",
                        foreignField: "_id",
                        localField: "author",
                        as: "author",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "coursemodels",
                                    foreignField: "_id",
                                    localField: "courses",
                                    as: "courses"
                                }
                            },
                            {
                                $project: {
                                    "courses.students": 0,
                                    "courses.chapters": 0,
                                    "courses.comments": 0,
                                    "courses.bookmarks": 0,
                                    "courses.dislikes": 0,
                                    "courses.likes": 0,
                                    "courses.category": 0,
                                    "courses.teacher": 0,
                                }
                            }
                        ],
                    },
                },
                {
                    $unwind: "$author"
                },
                {
                    $lookup: {
                        from: "categorymodels",
                        foreignField: "_id",
                        localField: "category",
                        as: "category",
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $project: {
                        "author.otp": 0,
                        "author.refreshToken": 0,
                        "author.discount": 0,
                        "author.password": 0,
                        "author.bills": 0,
                        "author.courses.__v": 0,
                        "author.Roles": 0,
                        "author.__v": 0,
                        "author.createdAt": 0,
                        "category.__v": 0,
                        "author.updatedAt": 0,
                    },
                },
                {
                    $match: { "author.courses._id": new mongoose.Types.ObjectId("6535004506bd84eeda257065") }
                },
            ]);

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    blogs
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCommentOfBlog(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    async deleteBlogById(req, res, next) {
        try {
            await mongoIdValidation.validate(req.params)
            const { id } = req.params;

            const blog = await blogModel.findOne({ _id: id });

            if (!blog) throw createHttpError.NotFound("پست مورد نظر پیدا نشد")

            const deleteResult = await blogModel.deleteOne({ _id: id })

            if (deleteResult.deletedCount == 0) throw createError.InternalServerError("خطای سرور رخ داده است");

            if (blog.image !== "undefined/undefined") {
                deleteFileInPublic(blog.image)
            }


            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    message: "پست مورد نظر با موفقیت حذف شد",
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlogById(req, res, next) {
        try {
            await mongoIdValidation.validate(req.params)

            const { id } = req.params;

            const { title, shortText, text, tags, image, category } = req.body;

            const blog = await blogModel.findById(id);

            if (!blog) throw createHttpError.NotFound("پستی بااین مشخصات پیدا نشد")

            const updateResult = await blogModel.updateOne({ _id: id }, {
                $set: {
                    title,
                    shortText,
                    text,
                    tags,
                    image,
                    category
                }
            });

            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("ویرایش پست به دلیل خطای سرور انجام نشد")

            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    message: "پست مورد نظر با موفقیت ویرایش شد"
                }
            })

        } catch (error) {
            next(error)
        }
    }
}



module.exports = {
    AdminBlogController: new BlogController(),
}