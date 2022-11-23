const express =require("express");
const app =express();
const mongoose=require("mongoose");
const products=require('./products');
const users=require('./users');
const PlayerStats=require('./PlayerStats');
const PlayerStatsbowl=require('./playerStatsbowl');
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
               Stats.map((item)=>{
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
                
                  if(item.stat==="sr" &&  item.matchtype==="t20i" && item.fn==="batting"){
                  strikeRate=item.value;
                  }
                  if(item.stat==="100s" &&  item.matchtype==="t20i" && item.fn==="batting"){
                    NoofCenturies=item.value;
                    }
                    if(item.stat==="50s" &&  item.matchtype==="t20i" && item.fn==="batting"){
                      NoofFifties=item.value;
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
 debutDate= new Date(StartCareerDate);
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

                        if(biography!==undefined){
                      biographyplayer= biography.toString();
                      biographyplayer=biography.replaceAll(/(<([^>]+)>)/ig,"");

                     }else{
                       
    biographyplayer=`${username} was in ${PlayerStatData.data.placeOfBirth} on   He started his t20 career on ${debutDate}`;
                     }
             
            let  regobject= {
                name:username,
                cricPlayerId:playerId,
                dateOfBirth:PlayerStatData.data.dateOfBirth,
                imgpath:"uploads/"+filecomplete.filename,
                imageFullPath:"http://localhost/uploads/"+filecomplete.filename,
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
                      regobject3={playerId:InsertId,
                        economyRate:EconomyRate,
                        totalWicket:NoofWicket,
                     
                        bestBowlingmatch:BestBowiingFigures,
                        bowlAverage:  bowlAvg
                     
                      };
                   let PlayerStat=new PlayerStats(regobject2);
                   let  PlayerStatsdata =await PlayerStat.save(
      
                    );
                    let PlayerStatsbowls=new PlayerStatsbowl(regobject3);
                  await PlayerStatsbowls.save();
                     console.log(PlayerStatsbowls);
              console.log(PlayerStatData);
                    
                      
              
             
             
                
                   
               console.log(PlayerData);
                   console.log(reqe.file);
                   console.log(reqe.body);
                 
                  console.log(filetype);
                 
                  size=filecomplete.size;
            
          

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
              console.log(userId);
              userData=await users.find({_id:userId});

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
            app.post("/upload",upload,function(req,res){
                res.send("i");
                
            });
         

    }).catch((err)=>{
        
       console.log("not connect"+err);
    });
 
    app.listen(5000);


