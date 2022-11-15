const mongoose=require("mongoose");
let productsSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    price:Number
});
module.exports=mongoose.model('products',productsSchema);
