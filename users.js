const mongoose=require("mongoose");
let productsSchema=new mongoose.Schema({
  
    username:String,
    email:String,
    password:String,
    activestatus:Number
});
module.exports=mongoose.model('users',productsSchema);