const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

});

const adminModel = mongoose.model("adminModel",adminSchema);

module.exports = adminModel;