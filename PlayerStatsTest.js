const mongoose=require("mongoose");
let statsSchematest=new mongoose.Schema({
playerId:mongoose.Schema.Types.ObjectId,
noofmatch:Number,
average:Number,
runscore:Number,
highestrun:Number,
noofcenturies:Number,
nooffifties:Number,
strikerate:Number,

});
module.exports=mongoose.model('match_test_stat',statsSchematest);