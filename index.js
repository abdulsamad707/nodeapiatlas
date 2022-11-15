const express =require("express");
const app =express();
const mongoose=require("mongoose");
const products=require('./products');
const users=require('./users');
const cors=require("cors");
/* api key 1*/

app.use(cors());
   
const multer=require("multer");  
const fs=require("fs");
const { db } = require("./products");
const console = require("console");
const { url } = require("inspector");

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
              filetype=filecomplete.mimetype;
              filetype=filetype.split("/");
              filetype=filetype[1];  
              email=reqe.body.email;
              mobile=reqe.body.user;
              username=reqe.body.name;
              userData=await users.findOne({name:username});
              console.log(userData);
              let Insert=0;
              PlayerId=0;
    

        
           if(!userData){

            const urlhit = `https://api.cricapi.com/v1/players?apikey=86de5a08-7abf-4014-8b78-2c4f949e62fc&offset=0&search=${username}`
            const PlayerDataRes=await fetch(urlhit,{method:"GET",headers:{
              "Content-Type":"application/json"
             }});
               const PlayerData=await PlayerDataRes.json();
            let  playerId= PlayerData.data[0].id;
          const PlayerStatsApi  =`https://api.cricapi.com/v1/players_info?apikey=86de5a08-7abf-4014-8b78-2c4f949e62fc&id=${playerId}`;
          const PlayerStatRes=await fetch( PlayerStatsApi ,{method:"GET",headers:{
            "Content-Type":"application/json"
           }});
           const PlayerStatData=await PlayerStatRes.json();


          regobject= {
                name:reqe.body.name,
                cricPlayerId:playerId,
                dateOfBirth:PlayerStatData.data.dateOfBirth,
                imgpath:"uploads/"+filecomplete.filename,
                role:PlayerStatData.data.role,
                battingStyle:PlayerStatData.data.battingStyle,
                dateOfBirth:PlayerStatData.data.dateOfBirth,
                placeBirth:PlayerStatData.data.placeOfBirth,
                bowlingStyle:PlayerStatData.data.bowlingStyle
             }
             console.log(regobject);
            let userRegisterStatus=new users(regobject);
             let result =await userRegisterStatus.save(

              );
              console.log(result._id);
                   InsertId=result.id;
                   console.log(InsertId);
                   res.send(result);
               /*
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
               cricPlayerId:String
                 */
               console.log(PlayerData);
                   console.log(reqe.file);
                   console.log(reqe.body);
                 
                  console.log(filetype);

                  size=filecomplete.size;
            }else{
              res.send({"message":"User Already Exists"});
            }
           
            
            



       
            
            });
            app.get('/player/:name',async(req,res)=>{
              userId=req.params.name;
            
              console.log(userId);
            
         var data=await users.aggregate([
     
          {
            $match: { "name":userId }
          },
    
          
          {   
              
           $lookup: {
                  from: "match_stats",
                  localField: "_id",
                  foreignField: "player_id",
                  as: "career_stats",
                },
               
              },
        

            
            
             
            ]);
          res.send(data);
          
            console.log(data);
              // calling a endpoint to get response.
           
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
                remaining =await users.find();
              res.send(remaining);

            });
            app.post("/upload",upload,function(req,res){
                res.send("i");
                
            });
         

    }).catch((err)=>{
        
       console.log("not connect");
    });
 
    app.listen(5000);


