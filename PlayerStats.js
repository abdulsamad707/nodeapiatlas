const mongoose=require("mongoose");
let statsSchema=new mongoose.Schema({
playerId:mongoose.Schema.Types.ObjectId,
t20matchdebutdate:Date,
biography:String,
t20matchdebutTeam:String,
t20matchdebutStadium:String,
NumberOffifties:Number,
NumberOfHudred:Number,
NumberOfmatch:Number,
average:Number,
runs:Number,
StrikeRate:Number,
teamPlay:String,
});
module.exports=mongoose.model('match_stat',statsSchema);