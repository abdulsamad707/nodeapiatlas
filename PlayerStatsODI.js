const mongoose=require("mongoose");
let statsSchemaODI=new mongoose.Schema({
playerId:mongoose.Schema.Types.ObjectId,
noofmatch:Number,
average:Number,
runscore:Number,
highestrun:Number,
noofcenturies:Number,
nooffifties:Number,
strikerate:Number,

});
module.exports=mongoose.model('match_odi_stat',statsSchemaODI);