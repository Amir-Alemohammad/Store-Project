const {default : mongoose} = require("mongoose");
const { commentSchema } = require("./public.schemas");
const { courseValidationSchema } = require("../validators/admin/course.validation");


const episodSchema = new mongoose.Schema({
    title: {type: String , required: true},
    text: {type : String , default: "" , required: true},
    type: {type : String, enum: ["free","cash"] , default: "free"},
    time: {type : String , required: true},
});


const chapterSchema = new mongoose.Schema({
    title: {type: String , required : true },
    text: {type : String , default: "" , },
    episods: {type : [episodSchema] , default: ""},
});

const courseSchema = new mongoose.Schema({
    
    title: {type : String, required : true},
    shortText : {type : String, required: true},
    text: { type : String, required : true},
    price : {type : Number, default : 0,},
    discount : {type : Number, default : 0,},
    image : {type : String, required : true},
    tags : {type : [String], default : []},
    likes : {type : [String], default : []},
    dislikes : {type : [String], default : []},
    comments : {type : [commentSchema], default : []},
    category : {type : mongoose.Types.ObjectId , required : true , ref: "category"},
    bookmarks : {type : [String], default : []},
    type : {type : String , enum: ["free","cash","vip"] , required : true , default: "free"}, // free - cash - vip    
    status: {type : String , enum: ["Holding","Completed","NotStarted"], default: "NotStarted" , required: true},
    time: {type: String , default: "00:00:00"},
    teacher : {type : mongoose.Types.ObjectId , ref: "user" , required : true},
    chapters: {type : [chapterSchema] , default: []},
    students: {type: [mongoose.Types.ObjectId] , ref: "user" , default : []}

});

courseSchema.index({title: "text" , text: "text" , shortText: "text"});


courseSchema.statics.courseValidation = function(body){
    return courseValidationSchema.validate(body);
};


const courseModel = mongoose.model("courseModel",courseSchema);

module.exports = courseModel;