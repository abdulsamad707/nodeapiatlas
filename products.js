const mongoose=require("mongoose");
let productsSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String
});
module.exports=mongoose.model('products',productsSchema);