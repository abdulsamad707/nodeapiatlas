const express =require("express");
const app =express();
const mongoose=require("mongoose");
const products=require('./products');
const users=require('./users');
const cors=require("cors");

  app.use(cors());
  app.use(express.json());
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
              res.send({"message":"Data Save"});
            });
            app.get('/users',async (req,res)=>{
              userData=await users.find();
              res.send(userData);
            });


            app.put("/update/:_id",async (req,res)=>{
                    let updateData=await users.updateOne(req.params,{$set:req.body}); 
                    res.send({"message":"Data UPDATED"});
            });
            app.delete("/deleteuser/:name?",async (req,res)=>{
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


