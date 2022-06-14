var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    price: Number,
    stock: Number,
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department'}] //departments será um array de Id dos Department
}, {versionKey: false}); //Não criará o versionKey

module.exports = mongoose.model("Product", productSchema);
