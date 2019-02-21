const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

let Product = mongoose.model("Products", productSchema);

module.exports.getProducts = function(callback, limit){
  Product.find(callback).limit(limit);
}

module.exports.getProductByName = function(user, callback){
  Product.find(user, callback);
}

module.exports.insertProduct = function(data, callback){
  Product.create(data, callback);
}

module.exports.updateProduct = function(user, data, callback){
  Product.update(user, data, callback);
}

module.exports.deleteProduct = function(id, callback){
  Product.findByIdAndRemove(id, callback);
}
