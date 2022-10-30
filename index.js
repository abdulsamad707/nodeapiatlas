const express =require("express");
const app =express();
const mongoose=require("mongoose");
const products=require('./products');
const users=require('./users');
const cors=require("cors");
app.use(express.json());
  app.use(cors());

/*srv*

mongodb://127.0.0.1/grocerystore
mongodb://127.0.0.1/grocerystore

*/

const uri = "mongodb://127.0.0.1/grocerystore";

   mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
        console.log("connect");
            app.get('/products',async function(req,res){
                  let ProductData=await products.find();
             
                   res.send(ProductData);
            });
        
            app.post("/registeruser", async (reqe,res)=>{
         
              
              let userRegisterStatus=new users(reqe.body);


              let result =await userRegisterStatus.save();
              res.send(result);

           console.log(result);
              console.log(reqe.body);
            
            });
            app.get('/users/:id?',async (req,res)=>{
               userId=req.params.id;
               console.log(userId);
               if(userId==undefined){
              userData=await users.find();
               }else{
                userData=await users.find({_id:userId});
               }
              res.send(userData);
            });


            app.put("/update/:_id",async (req,res)=>{
                    let updateData=await users.updateOne(req.params,{$set:req.body}); 
                    res.send({"message":"Data UPDATED","data":updateData});
            });
            app.delete("/deleteuser/:_id?",async (req,res)=>{
              let deleteData=await users.deleteOne(req.params);
              res.send(deleteData);

            })
            app.get('*',(req,res)=>{
            
                   res.json([{"message":"Error"}]);
            });

    }).catch((err)=>{
        
       console.log("not connect");
    });
 
    app.listen(5000);


