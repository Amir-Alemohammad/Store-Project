const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

});

const paymentModel = mongoose.model("paymentModel",paymentSchema);

module.exports = paymentModel;