const productModel = require("../../models/product");

const addProduct = async (req,res,next) => {
    try {
        const {} = req.body;
        return res.status(201).json({
            data:{
                statusCode: 201,
                message: "محصول شما با موفقیت ساخته شد",
            }
        })
    } catch (error) {
        next(error)
    }
}
const editProduct = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
const removeProduct = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
const getAllProducts = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
const getOneProduct = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}



module.exports = {
    addProduct,
    editProduct,
    removeProduct,
    getAllProducts,
    getOneProduct,
}