const {StatusCodes : HttpStatus} = require("http-status-codes")

const Controller = require("../controller");
const courseModel = require("../../models/course");
const { deleteInvalidPropertyInObject, deleteFileInPublic } = require("../../utils/functions");
const { mongoIdValidation } = require("../../validators/admin/mongoId.validation");
const createHttpError = require("http-errors");

class courseController extends Controller{
    
    async getListOfCourses(req,res,next){
        try {
            const {search} = req.query;
            
            let courses;

            if(search) courses = await courseModel.find({$text : {$search : search}}); 

            else courses = await courseModel.find({}).sort({_id : -1}); //Sorts from the last to the first
               
            if(courses.length == 0) throw {status: HttpStatus.NOT_FOUND , message: "دوره ای پیدا نشد"}
                            

            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode : HttpStatus.OK,
                    courses,
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async addCourse(req,res,next){
        try {
            
            const category = await mongoIdValidation.validate({id : req.body.category});
            
            await courseModel.courseValidation(req.body);

            const data = req.body;

            data.teacher = req.userId;

            const course = await courseModel.create({...data});

            if(!course?._id) throw {status: HttpStatus.INTERNAL_SERVER_ERROR , message: "خطایی از سمت سرور رخ داده است"}
            
            return res.status(HttpStatus.CREATED).json({
                data:{
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
    CourseController : new courseController(),
}