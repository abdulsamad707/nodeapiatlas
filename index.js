const express =require("express");
const app =express();
const mongoose=require("mongoose");
const products=require('./products');
const users=require('./users');
const cors=require("cors");


app.use(cors());
   
const multer=require("multer");  
const fs=require("fs");
const { db } = require("./products");
const console = require("console");

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
             
             regobject= {
                name:reqe.body.name,
                email:reqe.body.email,
                mobile:reqe.body.mobile,
                imgpath:"uploads/"+filecomplete.filename
             }
             console.log(regobject);
             let userRegisterStatus=new users(regobject);
                   console.log(reqe.file);
                   console.log(reqe.body);
                 
                  console.log(filetype);

                  size=filecomplete.size;

              let result =await userRegisterStatus.save(

              );
              console.log(result._id);
                   InsertId=result.id;
                   console.log(InsertId);
              res.send(result);




       
            
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
                      email:req.body.email,
                      mobile:req.body.mobile,
                    
                      imgpath:"uploads/"+filecomplete.filename
                   }
                  }else{
                    updateobject= {
                      name:req.body.name,
                      email:req.body.email,
                      mobile:req.body.mobile
                    
                     
                   }
                  }
                  userId=req.params._id;
                  console.log(userId);
                  userData=await users.find({_id:userId});
    
                  console.log(userData[0].imgpath);
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


