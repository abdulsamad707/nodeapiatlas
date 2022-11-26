const mongoose=require("mongoose");
let productsSchema=new mongoose.Schema({
  
    name:{type:String},

 imgpath:String,

 
 date:{
    type:Date,
    default:Date.now
 },
 dateOfBirth:{
   type:Date
 },
 role:String,
 battingStyle:String,
 bowlingStyle:String,
 placeBirth:String,
 cricPlayerId:String,
 teamPlayed:String,
 imageFullPath:String
});
module.exports=mongoose.model('user',productsSchema);