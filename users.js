const mongoose=require("mongoose");
let productsSchema=new mongoose.Schema({
  
    name:{type:String},
 mobile:Number,
 email:String,
 imgpath:String,
 date:{
    type:Date,
    default:Date.now
 }


});
module.exports=mongoose.model('user',productsSchema);