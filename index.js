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
const nodemon = require("nodemon");
const { createBrotliCompress } = require("zlib");


app.use(express.json());
app.use('/uploads',express.static("uploads"));
app.use('/uploadProducts',express.static("uploadProducts"));

/*srv*

mongodb://127.0.0.1/grocerystore
mongodb://127.0.0.1/grocerystore
*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, 'uploadProducts');
  },
  filename: (req, file, callback) => {
    filetype=file.mimetype;
    filetype=filetype.split("/");
    filetype=filetype[1];
      callback(null, Date.now() + '.' + filetype);
  }
});
let fileFilter = function (req, file, cb) {

  var allowedMimes = ['image/jpeg', 'image/png'];
console.log(file);
 
  if (!allowedMimes.includes(file.mimetype)) {
    cb(null, false);
    return cb( new Error ("Type of File You Upload is not Supported .only jpeg png are allowed"));
  } 
  const fileSize = parseInt(req.headers['content-length']);
  console.log(fileSize);
  if(fileSize > 40000){
    cb(null, false);
    return cb( new Error ("huge file"));
  }
 console.log( file.size); 


  cb (null,true);
};
let obj = {
  storage: storage,

fileFilter:fileFilter


};


const uploads = multer(obj).single('uploadProducts');


    
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
const  uploadProduct= multer({

  storage:multer.diskStorage({
    destination:function(req,file,cb){
    
      cb(null,"uploadProducts")
    },filename:function(req,file,cb){
      filetype=file.mimetype;
      filetype=filetype.split("/");
      filetype=filetype[1];
 
    cb(null,Date.now()+"."+filetype);

    } 
  

    
  
   
  })

  
  }).single("uploadProducts");

const uri = "mongodb://127.0.0.1/grocerystore";

   mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{

            app.get('/products',async function(req,res){
                  let ProductData=await products.find();
             
                   res.send(ProductData);
            });
              app.post("/addProduct",async(reqe,res,next)=>{
        
         
         

  uploads(reqe,res,async function(err){
    console.log(reqe.body);
    console.log(reqe.file);
    var fileNotExist =reqe.file===undefined;
    console.log(fileNotExist);
       
    
       if(err){
        
         return res.send({msg:err.message});
         
       }
       if(reqe.file===undefined){
        return res.send({msg:"Please Upload Product Image"});
      }
       let ProductName=reqe.body.name;
       let filecomplete=reqe.file;
       let ProductPrice= reqe.body.price;
      let ProductKeyword =reqe.body.keyword;
     let fileComplete=reqe.file; 
         console.log(fileComplete);
      if(ProductName===""){
       return res.send({"msg":"please provide product name"});
       
      }else{
       let ProductNamePattern=/[A-Za-z]/;
       let ProductPricePattern=/[0-9 d]/;
          if(ProductPrice===""){
           return res.send({"msg":"please provide product price"});
       
          
          }
          if(!ProductPricePattern.test(ProductPrice)){
           return res.send({"msg":"please  provide correct product price"});
         
          }

        if(!(ProductNamePattern.test(ProductName))){
         
       return   res.send({"msg":"please provide correct product name"});
       
        }else{
       let ProductData=await products.findOne({name:ProductName});
           if(!ProductData){
             let ProductObject={ 
              name:ProductName,
              price:ProductPrice,
              keyword:ProductKeyword,
              imgpath:"uploadProducts/"+filecomplete.filename,
             };
             let ProductInsertStatus=new products(ProductObject);
             console.log(ProductInsertStatus);
       let pdata=ProductInsertStatus.save();

            res.send({msg:"Product Added  Successfully"});
           }else{
            res.send({msg:"Product Already Exist"});
           }
   
  
        }
      }
  


      })

                 
                  
               
          
           
              });
            app.post("/registeruser",upload, async (reqe,res)=>{
              let PlayerName =reqe.body.name;
               console.log(PlayerName);  
              let APIKEY="1aec0293-8769-40a3-a9a3-0ea405524bac";
              const urlhit = `https://api.cricapi.com/v1/players?apikey=${APIKEY}&offset=0&search=${PlayerName}`
              const PlayerDataRes=await fetch(urlhit,{method:"GET",headers:{
                "Content-Type":"application/json"
               }});
              
               const PlayerData=await PlayerDataRes.json();
               let PlayerId=PlayerData.data[0].id;
               console.log(PlayerId);

                console.log(PlayerData);
              console.log(reqe.body);
      

                  
              
       
            
            });
            app.get('/stats/:id',async(req,res)=>{
           // calling a endpoint to get response.
           let userId =  req.params.id;
                
           userData=await users.find({_id:userId});

             console.log(userData);
           let PlayerName=userData[0].name;
let APIKEY="48c5c2f7-9ab7-4351-8ad7-a8067ff1b28c";
       const urlhit = `https://api.cricapi.com/v1/players?apikey=${APIKEY}&offset=0&search=${PlayerName}`
       const PlayerDataRes=await fetch(urlhit,{method:"GET",headers:{
         "Content-Type":"application/json"
        }});
          const PlayerData=await PlayerDataRes.json();
        
       let  playerId= PlayerData.data[0].id;
     const PlayerStatsApi  =`https://api.cricapi.com/v1/players_info?apikey=${APIKEY}&id=${playerId}`;
     const PlayerStatRes=await fetch(PlayerStatsApi ,{method:"GET",headers:{
       "Content-Type":"application/json"
      }});
      const PlayerStatData=await PlayerStatRes.json();
          res.send(PlayerStatData);

         
   
            });
            app.get('/player/:id',async(req,res)=>{
           
              // calling a endpoint to get response.
               let userId =  req.params.id;
                
                userData=await users.find({_id:userId});

                  console.log(userData);
                let PlayerName=userData[0].name;
  let APIKEY="48c5c2f7-9ab7-4351-8ad7-a8067ff1b28c";
       
             
           
       
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
           
               if(userId==null){
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
                  if(filecomplete!=null){ 
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
    
                if(filecomplete!=null){ 
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
             
            let  playerId= PlayerData.data[0].id;
          const PlayerStatsApi  =`https://api.cricapi.com/v1/players_info?apikey=${APIKEY}&id=${playerId}`;
          const PlayerStatRes=await fetch(PlayerStatsApi ,{method:"GET",headers:{
            "Content-Type":"application/json"
           }});
           const PlayerStatData=await PlayerStatRes.json();
            console.log(PlayerStatData);
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

res.send(Stats);

Stats.map((item)=>{


if(item.stat==="m" &&  item.matchtype==="test" && item.fn==="batting"){
  noofMatchTest=item.value;
   if(noofMatchTest===null){
    noofMatchTest=0;
   }
}
if(item.stat==="avg" &&  item.matchtype==="test" && item.fn==="batting"){
  avgTest=item.value;
  if(avgTest===null){
    avgTest=0;
   }
}
if(item.stat==="runs" &&  item.matchtype==="test" && item.fn==="batting"){
  RunScoreTest=item.value;
  if(RunScoreTest===null){
    RunScoreTest=0;
   }
}
if(item.stat==="hs" &&  item.matchtype==="test" && item.fn==="batting"){
  hsTest=item.value;
  if(hsTest===null){
    hsTest=0;
   }
}
if(item.stat==="100s" &&  item.matchtype==="test" && item.fn==="batting"){
  NoofCenturiesTest=item.value;
  if(NoofCenturiesTest===null){
    NoofCenturiesTest=0;
   }
  }
  if(item.stat==="50s" &&  item.matchtype==="test" && item.fn==="batting"){
    NoofFiftiesTest=item.value;
    if(NoofFiftiesTest===null){
      NoofFiftiesTest=0;
     }
    }
if(item.stat==="sr" &&  item.matchtype==="test" && item.fn==="batting"){
  strikeRateTest=item.value;
  if(strikeRateTest===null){
    strikeRateTest=0;
   }
}

if(item.stat==="m" &&  item.matchtype==="odi" && item.fn==="batting"){
  noofMatchODI=item.value;
   if(noofMatchODI===null){
    noofMatchODI=0;
   }
}
if(item.stat==="avg" &&  item.matchtype==="odi" && item.fn==="batting"){
  avgODI=item.value;
  if(avgODI===null){
    avgODI=0;
   }
}
if(item.stat==="runs" &&  item.matchtype==="odi" && item.fn==="batting"){
  RunScoreODI=item.value;
  if(RunScoreODI===null){
    RunScoreODI=0;
   }
}
if(item.stat==="hs" &&  item.matchtype==="odi" && item.fn==="batting"){
  hsODI=item.value;
  if(hsODI===null){
    hsODI=0;
   }
}
if(item.stat==="100s" &&  item.matchtype==="odi" && item.fn==="batting"){
  NoofCenturiesODI=item.value;
  if(NoofCenturiesODI===null){
    NoofCenturiesODI=0;
   }
  }
  if(item.stat==="50s" &&  item.matchtype==="odi" && item.fn==="batting"){
    NoofFiftiesODI=item.value;
    if(NoofFiftiesODI===null){
      NoofFiftiesODI=0;
     }
    }
if(item.stat==="sr" &&  item.matchtype==="odi" && item.fn==="batting"){
  strikeRateODI=item.value;
  if(strikeRateODI===null){
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


