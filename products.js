const mongoose=require("mongoose");
let productsSchema=new mongoose.Schema({

    name:String,
    price:Number,
    keyword:String,
    imgpath:String,
    productStatus:String,
    added_on:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('product',productsSchema);
