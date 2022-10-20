const mongoose=require("mongoose");
let productsSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    activestatus:Number
});
module.exports=mongoose.model('users',productsSchema);