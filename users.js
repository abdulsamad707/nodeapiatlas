const mongoose=require("mongoose");
let productsSchema=new mongoose.Schema({
  
    username:String,
    password:String,
    activestatus:Number
});
module.exports=mongoose.model('users',productsSchema);