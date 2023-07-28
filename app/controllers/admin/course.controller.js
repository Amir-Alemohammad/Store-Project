const {StatusCodes : HttpStatus} = require("http-status-codes")

const Controller = require("../controller");
const courseModel = require("../../models/course");
const { deleteInvalidPropertyInObject } = require("../../utils/functions");

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
            const data = req.body;

            

            
            return res.status(HttpStatus.CREATED).json({
                data:{
                    statusCode: HttpStatus.CREATED,
                    message: "دوره با موفقیت ایجاد شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    

}

module.exports = {
    CourseController : new courseController(),
}