const mongoose=require("mongoose");
let productsSchema=new mongoose.Schema({
  
    name:String,
 mobile:Number,
 email:String

});
module.exports=mongoose.model('user',productsSchema);