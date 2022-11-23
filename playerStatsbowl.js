const mongoose=require("mongoose");
let statsbowlSchema=new mongoose.Schema({
playerId:mongoose.Schema.Types.ObjectId,
economyRate:Number,
totalWicket:Number,
fiveWickets:Number,
bestBowlingmatch:String,
bowlAverage:Number
});
module.exports=mongoose.model('match_stats_bowlings',statsbowlSchema);