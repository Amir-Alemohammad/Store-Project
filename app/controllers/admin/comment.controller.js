const Controller = require("../controller");

class CommentController extends Controller{

    async create(req,res,next){
        try {
            
        } catch (err) {
            next(err)
        }
    }
    async update(){

    }
    async findAll(){

    }
    async delete(){

    }

}
module.exports = {
    CommentController: new CommentController()
}