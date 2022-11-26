const express =require("express");
const app =express();
const mongoose=require("mongoose");
const products=require('./products');
const users=require('./users');
const PlayerStats=require('./PlayerStats');
const PlayerStatsODI=require('./PlayerStatsODI');
const PlayerStatsTest=require('./PlayerStatsTest');
const PlayerStatsbowl=require('./playerStatsbowl');
const PlayerStatsbowlODI=require('./playerStatsbowlODI');
const PlayerStatsbowlTest=require('./playerStatsbowlTest');
const cors=require("cors");
/* api key 1*/

app.use(cors());
   
const multer=require("multer");  
const fs=require("fs");
const { db } = require("./products");
const console = require("console");
const { url } = require("inspector");
const { Console } = require("console");


app.use(express.json());

app.use('/uploads',express.static("uploads"));
/*srv*

mongodb://127.0.0.1/grocerystore
mongodb://127.0.0.1/grocerystore

*/
const  upload= multer({
storage:multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"uploads")
  },filename:function(req,file,cb){
    filetype=file.mimetype;
    filetype=filetype.split("/");
    filetype=filetype[1];
  
    cb(null,Date.now()+"."+filetype);
  }
})

}).single("file_user");
const uri = "mongodb://127.0.0.1/grocerystore";

   mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
        
            app.get('/products',async function(req,res){
                  let ProductData=await products.find();
             
                   res.send(ProductData);
            });
              
            app.post("/registeruser",upload, async (reqe,res)=>{
                console.log(reqe.file);
          filecomplete=reqe.file;
          console.log(reqe.body);
            
              filetype=filecomplete.mimetype;
              filetype=filetype.split("/");
              filetype=filetype[1];  
    let {name,average,strikeRate,noofMatch,RunScore,NoofCenturies,NoofFifties,NoofMatch,NoofWicket,NooffiveWicket,EconomyRate,BestBowiingFigures,StartCareerDate,Stadium,Team}=reqe.body;

              username=name.toLowerCase();
              userData=await users.findOne({name:username});
       if(!userData){
              console.log(userData);
              let Insert=0;
              PlayerId=0;
        
              const options = {
            
                method: 'GET',
                headers: {
                  'X-RapidAPI-Key': 'b079f35196msh977648dbc180926p10242djsn9ae5f32ce427',
                  'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
                }

              };
        
          let APIKEY="48c5c2f7-9ab7-4351-8ad7-a8067ff1b28c";
            const urlhit = `https://api.cricapi.com/v1/players?apikey=${APIKEY}&offset=0&search=${username}`
            const PlayerDataRes=await fetch(urlhit,{method:"GET",headers:{
              "Content-Type":"application/json"
             }});
               const PlayerData=await PlayerDataRes.json();
               console.log(PlayerData);
            let  playerId= PlayerData.data[0].id;
          const PlayerStatsApi  =`https://api.cricapi.com/v1/players_info?apikey=${APIKEY}&id=${playerId}`;
          const PlayerStatRes=await fetch(PlayerStatsApi ,{method:"GET",headers:{
            "Content-Type":"application/json"
           }});
           const PlayerStatData=await PlayerStatRes.json();
              console.log(PlayerStatData.data.stats);
            let Stats=PlayerStatData.data.stats;
let hs="";
let bowlAvg=0;
               console.log(Stats);
let noofMatchTest=0;
let avgTest=0;
             let RunScoreTest=0;
            let hsTest=0;
            let NoofCenturiesTest=0;
          let NoofFiftiesTest=0;
         let strikeRateTest=0;
          let noofMatchODI=0;
         let avgODI=0;
        let RunScoreODI=0;
       let hsODI=0;
       let NoofCenturiesODI=0;
     let NoofFiftiesODI=0;
    let strikeRateODI=0;
   let NoofWicketODI=0;
  let  bowlAvgODI=0;
let  EconomyRateODI=0;
let BestBowiingFiguresODI=0;

  let NoofWicketTest=0;
  let  bowlAvgTest=0;
 let EconomyRateTest=0;
 let BestBowiingFiguresTest=0;

               Stats.map((item)=>{

          
                     /*test batting Stats*/
                  if(item.stat==="m" &&  item.matchtype==="test" && item.fn==="batting"){
                    noofMatchTest=item.value;
                     if(noofMatchTest===undefined){
                      noofMatchTest=0;
                     }
                  }
                  if(item.stat==="avg" &&  item.matchtype==="test" && item.fn==="batting"){
                    avgTest=item.value;
                    if(avgTest===undefined){
                      avgTest=0;
                     }
                  


                  }
                  if(item.stat==="runs" &&  item.matchtype==="test" && item.fn==="batting"){
                    RunScoreTest=item.value;
                    if(RunScoreTest===undefined){
                      RunScoreTest=0;
                     }
                  }
                  if(item.stat==="hs" &&  item.matchtype==="test" && item.fn==="batting"){
                    hsTest=item.value;
                    if(hsTest===undefined){
                      hsTest=0;
                     }
                  }
                  if(item.stat==="100s" &&  item.matchtype==="test" && item.fn==="batting"){
                    NoofCenturiesTest=item.value;
                    if(NoofCenturiesTest===undefined){
                      NoofCenturiesTest=0;
                     }
                    }
                    if(item.stat==="50s" &&  item.matchtype==="test" && item.fn==="batting"){
                      NoofFiftiesTest=item.value;
                      if(NoofFiftiesTest===undefined){
                        NoofFiftiesTest=0;
                       }
                      }
                  if(item.stat==="sr" &&  item.matchtype==="test" && item.fn==="batting"){
                    strikeRateTest=item.value;
                    if(strikeRateTest===undefined){
                      strikeRateTest=0;
                     }
                  }
                     
                  /*ODI Stats */
                  if(item.stat==="m" &&  item.matchtype==="odi" && item.fn==="batting"){
                    noofMatchODI=item.value;
                     if(noofMatchODI===undefined){
                      noofMatchODI=0;
                     }
                  }
                  if(item.stat==="avg" &&  item.matchtype==="odi" && item.fn==="batting"){
                    avgODI=item.value;
                    if(avgODI===undefined){
                      avgODI=0;
                     }
                  }
                  if(item.stat==="runs" &&  item.matchtype==="odi" && item.fn==="batting"){
                    RunScoreODI=item.value;
                    if(RunScoreODI===undefined){
                      RunScoreODI=0;
                     }
                  }
                  if(item.stat==="hs" &&  item.matchtype==="odi" && item.fn==="batting"){
                    hsODI=item.value;
                    if(hsTest===undefined){
                      hsODI=0;
                     }
                  }
                  if(item.stat==="100s" &&  item.matchtype==="odi" && item.fn==="batting"){
                    NoofCenturiesODI=item.value;
                    if(NoofCenturiesODI===undefined){
                      NoofCenturiesODI=0;
                     }
                    }
                    if(item.stat==="50s" &&  item.matchtype==="odi" && item.fn==="batting"){
                      NoofFiftiesODI=item.value;
                      if(NoofFiftiesODI===undefined){
                        NoofFiftiesODI=0;
                       }
                      }
                  if(item.stat==="sr" &&  item.matchtype==="odi" && item.fn==="batting"){
                    strikeRateODI=item.value;
                    if(strikeRateODI===undefined){
                      strikeRateODI=0;
                     }
                  }
                     

                        /*t20 batting Stats*/
                  if(item.stat==="m" &&  item.matchtype==="t20i" && item.fn==="batting"){
                    noofMatch=item.value;
                  }
                  if(item.stat==="avg" &&  item.matchtype==="t20i" && item.fn==="batting"){
                    average=item.value;
                  }
                  if(item.stat==="runs" &&  item.matchtype==="t20i" && item.fn==="batting"){
                    RunScore=item.value;
                  }
                  if(item.stat==="hs" &&  item.matchtype==="t20i" && item.fn==="batting"){
                    hs=item.value;
                  }
                  if(item.stat==="100s" &&  item.matchtype==="t20i" && item.fn==="batting"){
                    NoofCenturies=item.value;
                    }
                    if(item.stat==="50s" &&  item.matchtype==="t20i" && item.fn==="batting"){
                      NoofFifties=item.value;
                      }
                  if(item.stat==="sr" &&  item.matchtype==="t20i" && item.fn==="batting"){
                    strikeRate=item.value;
                  }
                      if(item.stat==="wkts" &&  item.matchtype==="t20i" && item.fn==="bowling"){
                          if(item.value==="-"){
                            NoofWicket=0;
                          }else{
                        NoofWicket=item.value;
                          }
                        }
                      if(item.stat==="avg" &&  item.matchtype==="t20i" && item.fn==="bowling"){
                          if(item.value==="-"){
                            bowlAvg=0.00;
                          }else{
                          bowlAvg=item.value;
                          }
                        }
                        if(item.stat==="econ" &&  item.matchtype==="t20i" && item.fn==="bowling"){
                          if(item.value==="-"){
                            EconomyRate=0.00;
                          }else{
                            EconomyRate=item.value;
                          }

                        }
                        if(item.stat==="bbm" &&  item.matchtype==="t20i" && item.fn==="bowling"){
                          if(item.value==="-"){
                            BestBowiingFigures="0/0";
                          }else{
                            BestBowiingFigures=item.value;
                          }
                          
                        }

                        if(item.stat==="wkts" &&  item.matchtype==="odi" && item.fn==="bowling"){
                          if(item.value==="-"|| item.value===undefined){
                            NoofWicketODI=0;
                          }else{
                        NoofWicketODI=item.value;
                          }
                        }
                        if(item.stat==="avg" &&  item.matchtype==="odi" && item.fn==="bowling"){
                          if(item.value==="-" || item.value===undefined){
                            bowlAvgODI=0.00;
                          }else{
                          bowlAvgODI=item.value;
                          }
                        }
                        if(item.stat==="econ" &&  item.matchtype==="odi" && item.fn==="bowling"){
                          if(item.value==="-"|| item.value===undefined){
                            EconomyRateODI=0.00;
                          }else{
                            EconomyRateODI=item.value;
                          }

                        }
                        if(item.stat==="bbm" &&  item.matchtype==="odi" && item.fn==="bowling"){
                          if(item.value==="-"||item.value===undefined){
                            BestBowiingFiguresODI="0/0";
                          }else{
                            BestBowiingFiguresODI=item.value;
                          }
                          
                        }
                        if(item.stat==="wkts" &&  item.matchtype==="test" && item.fn==="bowling"){
                          if(item.value==="-"|| item.value===undefined){
                            NoofWicketTest=0;
                          }else{
                        NoofWicketTest=item.value;
                          }
                        }
                        if(item.stat==="avg" &&  item.matchtype==="test" && item.fn==="bowling"){
                          if(item.value==="-" || item.value===undefined){
                            bowlAvgTest=0.00;
                          }else{
                          bowlAvgTest=item.value;
                          }
                        }
                        if(item.stat==="econ" &&  item.matchtype==="test" && item.fn==="bowling"){
                          if(item.value==="-"|| item.value===undefined){
                            EconomyRateTest=0.00;
                          }else{
                            EconomyRateTest=item.value;
                          }

                        }
                        if(item.stat==="bbm" &&  item.matchtype==="test" && item.fn==="bowling"){
                          if(item.value==="-"||item.value===undefined){
                            BestBowiingFiguresTest="0/0";
                          }else{
                            BestBowiingFiguresTest=item.value;
                          }
                          
                        }

               });  


              console.log(noofMatch);
          let  playername=PlayerStatData.data.name;
          username=playername.toLowerCase();
          let fimalResult =await fetch(`https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search?plrN=${username}`, options);
          let response =await fimalResult.json();
   
 
       
            
            
 

            
             var idex=0;
           
                 console.log(response.player);
                      response.player.map((item,i)=>{
            
                      if(item.name.toLowerCase()===playername.toLowerCase() && item.teamName==="Pakistan" ){
                          idex=i;
                        
                       }
            
                      });
                      let  Id=response.player[idex].id;
                      let getIfo =await fetch("https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/"+Id, options);
                      let  getIfodata= await getIfo.json();
                      console.log(getIfodata);
                     let biography =getIfodata.bio;
                     let teamsFrom=getIfodata.teams;
                     let t20RakingBat=getIfodata.rankings.bat[0].t20Rank;
                  
                   let getBattig=await fetch(`https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${Id}/batting`, options);
                   res= await getBattig.json();
              let  getcareer=await fetch(`https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${Id}/career`, options);
                    let getcareerData=await getcareer.json();
                     console.log(getcareerData);
                    var  team= getcareerData.values[0].debut.split(",");
                    var   team2=team[0];
                          

                     var  debutdate=team[1];
                           
                      var Stadiums=team[2];
            

     var birthdate=new Date(PlayerStatData.data.dateOfBirth).toLocaleDateString([],{month:"short",year:"numeric",day:"numeric"}).replaceAll(" ","-");;
            
              if(debutdate=="Not Played"){
 debutDate= new Date(StartCareerDate).toLocaleString([],{month:"short",year:"numeric",day:"numeric"}).replaceAll('','-');
              }else{
             debutDate= new Date(debutdate);
              }
                         if(team2!="Not Played"){
 var teamplayed=team2.replaceAll("vs","");


                         }else{
 var teamplayed=Team;
       
                        }
                       if (Stadiums=="Not Played"){
                           var StadiumPlayed=Stadium;
                      }else{
                         var StadiumPlayed=Stadiums;
                      }

             
            let  regobject= {
                name:username,
                cricPlayerId:playerId,
                dateOfBirth:PlayerStatData.data.dateOfBirth,
                imgpath:"uploads/"+filecomplete.filename,
                imageFullPath:"http://localhost:5000/uploads/"+filecomplete.filename,
                role:PlayerStatData.data.role,
                battingStyle:PlayerStatData.data.battingStyle,
                dateOfBirth:PlayerStatData.data.dateOfBirth,
                placeBirth:PlayerStatData.data.placeOfBirth,
                bowlingStyle:PlayerStatData.data.bowlingStyle,
                teamPlayed:teamsFrom
                   }
          
                   let userRegisterStatus=new users(regobject);
                   var  result =await userRegisterStatus.save(
      
                    );
                    InsertId=result._id;


                    if(biography!==undefined){
                      biographyplayer= biography.toString();
                      biographyplayer=biography.replaceAll(/(<([^>]+)>)/ig,"");
                      regobject2={playerId:InsertId,
                        NumberOfHudred:NoofCenturies,
                        biography:biographyplayer,
                        NumberOffifties:NoofFifties,
                        t20matchdebutTeam:teamplayed,
                        t20matchdebutStadium:StadiumPlayed,
                        t20matchdebutdate:  debutDate,
                        NumberOfmatch:noofMatch,
                        average:average,
                        runs:RunScore,
                        StrikeRate:strikeRate,
                        teamPlay:teamsFrom
                      };
                     }else{
                    
                      regobject2={playerId:InsertId,
                        NumberOfHudred:NoofCenturies,
                    
                        NumberOffifties:NoofFifties,
                        t20matchdebutTeam:teamplayed,
                        t20matchdebutStadium:StadiumPlayed,
                        t20matchdebutdate:  debutDate,
                        NumberOfmatch:noofMatch,
                        average:average,
                        runs:RunScore,
                        StrikeRate:strikeRate,
                        teamPlay:teamsFrom
                      };
                    
                    }
                     
                      regobject3={playerId:InsertId,
                        economyRate:EconomyRate,
                        totalWicket:NoofWicket,
                        bestBowlingmatch:BestBowiingFigures,
                        bowlAverage:  bowlAvg
                      };
                      regobject6={playerId:InsertId,
                        economyRate:EconomyRateODI,
                        totalWicket:NoofWicketODI,
                        bestBowlingmatch:BestBowiingFiguresODI,
                        bowlAverage:bowlAvgODI
                      };
                      regobject7={playerId:InsertId,
                        economyRate:EconomyRateTest,
                        totalWicket:NoofWicketTest,
                        bestBowlingmatch:BestBowiingFiguresTest,
                        bowlAverage:bowlAvgTest
                      };
                   let PlayerStat=new PlayerStats(regobject2);
                   let  PlayerStatsdata =await PlayerStat.save();
                    regobject4={
                      playerId:InsertId,
                      noofmatch:noofMatchTest,
                      average:avgTest,
                      runscore:RunScoreTest,
                      highestrun:hsTest,
                      noofcenturies:NoofCenturiesTest,
                      nooffifties:NoofFiftiesTest,
                      strikerate:strikeRateTest,
                    }
                    regobject5={
                    playerId:InsertId,
                    noofmatch:noofMatchODI,
                    average:avgODI,
                    runscore:RunScoreODI,
                    highestrun:hsODI,
                    noofcenturies:NoofCenturiesODI,
                    nooffifties:NoofFiftiesODI,
                    strikerate:strikeRateODI
                    }
                    let PlayerStatsbowls=new PlayerStatsbowl(regobject3);
                  await PlayerStatsbowls.save();
                  let PlayerStatsbowlsODI=new PlayerStatsbowlODI(regobject6);
                  await PlayerStatsbowlsODI.save();
                  let PlayerStatsbowlsTest=new PlayerStatsbowlTest(regobject7);
                  await PlayerStatsbowlsTest.save();
                  let PlayerStatODI=new PlayerStatsODI(regobject4);
                  let  PlayerStatsdataODI =await PlayerStatODI.save(
     
                   );
                   let PlayerStatTest=new PlayerStatsTest(regobject5);
                  let  PlayerStatsdataTest =await PlayerStatODI.save(
     
                   );
                     console.log(PlayerStatsbowls);
              console.log(PlayerStatData);
                    
                      
              
             
             
                
                   
               console.log(PlayerData);
                   console.log(reqe.file);
                   console.log(reqe.body);
                 
                  console.log(filetype);
                 
                  size=filecomplete.size;
            
                  var   result={"message":"Duplicate"};
                  res.send(result);

                   }else{
                 var   result={"message":"Duplicate"};
                 res.send(result);
                   }

                  
              

       
            
            });
            app.get('/player/:id',async(req,res)=>{
           
              // calling a endpoint to get response.
               let userId =  req.params.id;
                
                userData=await users.find({_id:userId});
                  console.log(userData);
                let PlayerName=userData[0].name;
                 console.log(PlayerName);
          let data= await  users.aggregate([
                {
                  $lookup: {
                    from: "match_stats",
                    localField: "_id",
                    foreignField: "playerId",
                    as: "battingStats",
                  },
                },
                {
                  $lookup: {
                    from: "match_stats_bowlings",
                    localField: "_id",
                    foreignField: "playerId",
                    as: "bowlingStats",
                  },
                },
                {
                  $lookup: {
                    from: "match_stats_odi_bowlings",
                    localField: "_id",
                    foreignField: "playerId",
                    as: "bowlingStatsODI",
                  },
                },
                {
                  $lookup: {
                    from: "match_stats_test_bowlings",
                    localField: "_id",
                    foreignField: "playerId",
                    as: "bowlingStatsTest",
                  },
                },
                {
                  $lookup: {
                    from: "match_test_stats",
                    localField: "_id",
                    foreignField: "playerId",
                    as: "battingStatsTest",
                  },
                },
                {
                  $lookup: {
                    from: "match_odi_stats",
                    localField: "_id",
                    foreignField: "playerId",
                    as: "battingStatsODI",
                  },
                },
                {$project:{imgpath:0}},

                { $match : { name:PlayerName } }
              ])

             
           res.send(data);
           
            });
            app.get('/users/:id?',async (req,res)=>{
               userId=req.params.id;
           
               if(userId==undefined){
              userData=await users.find();
               }else{
                userData=await users.find({_id:userId});
               }
              res.send(userData); 

       



            });


            app.put("/update/:_id",upload,async (req,res)=>{

          console.log(req.body);

                     console.log(req.body);
                     console.log(req.file);
                     filecomplete=req.file;
                  console.log(filecomplete);
                  if(filecomplete!=undefined){ 
                  updateobject= {
                      name:req.body.name,
                      imageFullPath:"http://localhost:5000/uploads/"+filecomplete.filename,
                    
                      imgpath:"uploads/"+filecomplete.filename
                   }
                  }else{
                    updateobject= {
                      name:req.body.name,
                    
                    
                     
                   }
                  }
                  userId=req.params._id;
                  console.log(userId);
                  userData=await users.find({_id:userId});
    
                if(filecomplete!=undefined){ 
                  if(fs.existsSync(userData[0].imgpath)){
                  fs.unlinkSync(userData[0].imgpath,(err)=>{
                    console.log(err);
                  });
                  }
                }



                  
                    let updateData=await users.updateOne(req.params,{$set:updateobject}); 
                    res.send({"message":"Data UPDATED","data":updateData});
                    console.log(updateobject);
            });
            app.delete("/deleteuser/:_id?",async (req,res)=>{

              userId=req.params._id;
          
              userData=await users.find({_id:userId});
              console.log(userId);
              console.log(userData[0].imgpath);

              if(fs.existsSync(userData[0].imgpath)){
              fs.unlinkSync(userData[0].imgpath,(err)=>{
                console.log(err);
              });
              }
              
              let deleteData=await users.deleteOne(req.params);
             /* playerId*/
                   
                remaining =await users.find();
              res.send(remaining);

            });
            app.get("/updateStats/:id",async function(req,res){
              userId=req.params.id;
          
              userData=await users.find({_id:userId});
              console.log(userData[0].name);
              
             let username= userData[0].name;
              console.log(username);
            let APIKEY="48c5c2f7-9ab7-4351-8ad7-a8067ff1b28c";
            const urlhit = `https://api.cricapi.com/v1/players?apikey=${APIKEY}&offset=0&search=${username}`
            const PlayerDataRes=await fetch(urlhit,{method:"GET",headers:{
              "Content-Type":"application/json"
             }});
               const PlayerData=await PlayerDataRes.json();
               console.log(PlayerData);
            let  playerId= PlayerData.data[0].id;
          const PlayerStatsApi  =`https://api.cricapi.com/v1/players_info?apikey=${APIKEY}&id=${playerId}`;
          const PlayerStatRes=await fetch(PlayerStatsApi ,{method:"GET",headers:{
            "Content-Type":"application/json"
           }});
           const PlayerStatData=await PlayerStatRes.json();
            
           let StatODI=await PlayerStatsODI.find({playerId:userId});
           let StatTest=await PlayerStatsTest.find({playerId:userId});
         let StatbowlOdi =await PlayerStatsbowlODI.find({playerId:userId}) ;
         let StatbowlTest =await PlayerStatsbowlTest.find({playerId:userId});

       console.log(StatbowlTest);
let noofMatchTest=0;
let avgTest=0;
let RunScoreTest=0;
let hsTest=0;
let NoofCenturiesTest=0;
let NoofFiftiesTest=0;
let strikeRateTest=0;
let noofMatchODI=0;
let avgODI=0;
let RunScoreODI=0;
let hsODI=0;
let NoofCenturiesODI=0;
let NoofFiftiesODI=0;
let strikeRateODI=0;
let Stats=PlayerStatData.data.stats;
let NoofWicket=0;
let bowlAvg=0;
let EconomyRate="";
let BestBowiingFigures="";
let RunPerWicket=0;
let RunPerWicketODI=0;
let NoofWicketODI=0;
let EconomyRateODI="";
let BestBowiingFiguresODI="";
let bowlAvgODI=0;



Stats.map((item)=>{


if(item.stat==="m" &&  item.matchtype==="test" && item.fn==="batting"){
  noofMatchTest=item.value;
   if(noofMatchTest===undefined){
    noofMatchTest=0;
   }
}
if(item.stat==="avg" &&  item.matchtype==="test" && item.fn==="batting"){
  avgTest=item.value;
  if(avgTest===undefined){
    avgTest=0;
   }
}
if(item.stat==="runs" &&  item.matchtype==="test" && item.fn==="batting"){
  RunScoreTest=item.value;
  if(RunScoreTest===undefined){
    RunScoreTest=0;
   }
}
if(item.stat==="hs" &&  item.matchtype==="test" && item.fn==="batting"){
  hsTest=item.value;
  if(hsTest===undefined){
    hsTest=0;
   }
}
if(item.stat==="100s" &&  item.matchtype==="test" && item.fn==="batting"){
  NoofCenturiesTest=item.value;
  if(NoofCenturiesTest===undefined){
    NoofCenturiesTest=0;
   }
  }
  if(item.stat==="50s" &&  item.matchtype==="test" && item.fn==="batting"){
    NoofFiftiesTest=item.value;
    if(NoofFiftiesTest===undefined){
      NoofFiftiesTest=0;
     }
    }
if(item.stat==="sr" &&  item.matchtype==="test" && item.fn==="batting"){
  strikeRateTest=item.value;
  if(strikeRateTest===undefined){
    strikeRateTest=0;
   }
}

if(item.stat==="m" &&  item.matchtype==="odi" && item.fn==="batting"){
  noofMatchODI=item.value;
   if(noofMatchODI===undefined){
    noofMatchODI=0;
   }
}
if(item.stat==="avg" &&  item.matchtype==="odi" && item.fn==="batting"){
  avgODI=item.value;
  if(avgODI===undefined){
    avgODI=0;
   }
}
if(item.stat==="runs" &&  item.matchtype==="odi" && item.fn==="batting"){
  RunScoreODI=item.value;
  if(RunScoreODI===undefined){
    RunScoreODI=0;
   }
}
if(item.stat==="hs" &&  item.matchtype==="odi" && item.fn==="batting"){
  hsODI=item.value;
  if(hsODI===undefined){
    hsODI=0;
   }
}
if(item.stat==="100s" &&  item.matchtype==="odi" && item.fn==="batting"){
  NoofCenturiesODI=item.value;
  if(NoofCenturiesODI===undefined){
    NoofCenturiesODI=0;
   }
  }
  if(item.stat==="50s" &&  item.matchtype==="odi" && item.fn==="batting"){
    NoofFiftiesODI=item.value;
    if(NoofFiftiesODI===undefined){
      NoofFiftiesODI=0;
     }
    }
if(item.stat==="sr" &&  item.matchtype==="odi" && item.fn==="batting"){
  strikeRateODI=item.value;
  if(strikeRateODI===undefined){
    strikeRateODI=0;
   }
}
if(item.stat==="wkts" &&  item.matchtype==="test" && item.fn==="bowling"){
  if(item.value==="-"){
    NoofWicket=0;
  }else{
NoofWicket=item.value;
  }
}

if(item.stat==="avg" &&  item.matchtype==="test" && item.fn==="bowling"){
  if(item.value==="-"){
    bowlAvg=0.00;
  }else{
  bowlAvg=item.value;
  }
}
if(item.stat==="econ" &&  item.matchtype==="test" && item.fn==="bowling"){
  if(item.value==="-"){
    EconomyRate=0.00;
  }else{
    EconomyRate=item.value;
  }

}
if(item.stat==="bbm" &&  item.matchtype==="test" && item.fn==="bowling"){
  if(item.value==="-"){
    BestBowiingFigures="0/0";
  }else{
    BestBowiingFigures=item.value;
  }
  
}

if(item.stat==="wkts" &&  item.matchtype==="odi" && item.fn==="bowling"){
  if(item.value==="-"){
    NoofWicketODI=0;
  }else{
NoofWicketODI=item.value;
  }
}

if(item.stat==="avg" &&  item.matchtype==="odi" && item.fn==="bowling"){
  if(item.value==="-"){
    bowlAvgODI=0.00;
  }else{
  bowlAvgODI=item.value;
  }
}
if(item.stat==="econ" &&  item.matchtype==="odi" && item.fn==="bowling"){
  if(item.value==="-"){
    EconomyRateODI=0.00;
  }else{
    EconomyRateODI=item.value;
  }

}
if(item.stat==="bbm" &&  item.matchtype==="odi" && item.fn==="bowling"){
  if(item.value==="-"){
    BestBowiingFiguresODI="0/0";
  }else{
    BestBowiingFiguresODI=item.value;
  }
  
}

          
               

});

regobjectTestbowl={playerId:userId,
  economyRate:EconomyRate,
  totalWicket:NoofWicket,
  bestBowlingmatch:BestBowiingFigures,
  bowlAverage:bowlAvg
};
regobjectOdibowl={playerId:userId,
  economyRate:EconomyRateODI,
  totalWicket:NoofWicketODI,
  bestBowlingmatch:BestBowiingFiguresODI,
  bowlAverage:bowlAvgODI
};

regobjectOdibat={
  playerId:userId,
  noofmatch:noofMatchODI,
  average:avgODI,
  runscore:RunScoreODI,
  highestrun:hsODI,
  noofcenturies:NoofCenturiesODI,
  nooffifties:NoofFiftiesODI,
  strikerate:strikeRateODI
  }
  regobjectTestbat={
    playerId:userId,
    noofmatch:noofMatchTest,
    average:avgTest,
    runscore:RunScoreTest,
    highestrun:hsTest,
    noofcenturies:NoofCenturiesTest,
    nooffifties:NoofFiftiesTest,
    strikerate:strikeRateTest
    }
    bowlOdi={playerId:userId,
      economyRate:EconomyRateODI,
      totalWicket:NoofWicketODI,
      bestBowlingmatch:BestBowiingFiguresODI,
      bowlAverage:bowlAvgODI
    };
    if(!StatbowlOdi[0]){

    let PlayerStatsbowlsODI=new PlayerStatsbowlODI(regobjectOdibowl);
    console.log(await PlayerStatsbowlsODI.save());
    }
    if(!StatbowlTest[0]){
    let PlayerStatsbowlsTest=new PlayerStatsbowlTest(regobjectTestbowl);
    console.log(await PlayerStatsbowlsTest.save());
    }
if(!StatTest[0]){


  let PlayerStatTest=new PlayerStatsTest(regobjectTestbat);
  let  PlayerStatsdataTest =await PlayerStatTest.save();
    console.log( PlayerStatsdataTest );
 }else{

console.log("dplicate");
 }






                res.send("i");
                
            });
         

    }).catch((err)=>{
        
       console.log("not connect"+err);
    });
 
    app.listen(5000);


