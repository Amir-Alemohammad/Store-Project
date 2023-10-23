const { StatusCodes: HttpStatus } = require("http-status-codes")

const Controller = require("../controller");
const courseModel = require("../../models/course");
const { deleteInvalidPropertyInObject, deleteFileInPublic } = require("../../utils/functions");
const { mongoIdValidation } = require("../../validators/admin/mongoId.validation");
const createHttpError = require("http-errors");
const userModel = require("../../models/user");

class courseController extends Controller {

    async getListOfCourses(req, res, next) {
        try {
            const { search } = req.query;

            let courses;

            if (search) courses = await courseModel.find({ $text: { $search: search } });

            else courses = await courseModel.aggregate([
                {
                    $match: {},
                },
                {
                    $lookup: {
                        from: "usermodels",
                        foreignField: "_id",
                        localField: "teacher",
                        as: "teacher",
                    }
                },
                {
                    $unwind: "$teacher",
                },
                {
                    $project: {
                        "teacher.otp": 0,
                        "teacher.refreshToken": 0,
                        "teacher.discount": 0,
                        "teacher.password": 0,
                        "teacher.bills": 0,
                        "teacher.Roles": 0,
                        "teacher.__v": 0,
                        "teacher.createdAt": 0,
                        "teacher.updatedAt": 0,
                    }
                }
            ]);
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    courses,
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async addCourse(req, res, next) {
        try {

            const category = await mongoIdValidation.validate({ id: req.body.category });

            await courseModel.courseValidation(req.body);

            const data = req.body;

            data.teacher = req.userId;
            const course = await courseModel.create({ ...data });
            await userModel.updateOne({ _id: req.userId }, {
                $set: {
                    courses: course
                }
            })
            if (!course?._id) throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "خطایی از سمت سرور رخ داده است" }

            return res.status(HttpStatus.CREATED).json({
                data: {
                    statusCode: HttpStatus.CREATED,
                    message: "دوره با موفقیت ایجاد شد"
                }
            });
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }


}

module.exports = {
    CourseController: new courseController(),
}