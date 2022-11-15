const mongoose=require("mongoose");
let productsSchema=new mongoose.Schema({
  
    name:{type:String},

 imgpath:String,
 date:{
    type:Date,
    default:Date.now
 }


});
module.exports=mongoose.model('user',productsSchema);