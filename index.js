const express =require("express");
const app =express();
const mongoose=require("mongoose");
const products=require('./products');
const users=require('./users');
const cors=require("cors");

  app.use(cors());
  app.use(express.json());
/*srv*
mongodb://Unigrocery:xgZHEW2MlTp3oRYR@cluster0.2zyy2qt.mongodb.net/groceryshop?retryWrites=true&w=majority*/

const uri = "mongodb://127.0.0.1/grocerystore";

   mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  
            app.get('/products',async function(req,res){
                  let ProductData=await products.find();
                   res.send(ProductData);
                
                   /*
                products.find({},function(err,products){
                      console.log(products);
                       res.json(products);
                  });*/
            });
            app.get('/users',async (req,res)=>{
              /*  users.find({},function(err,users){
                       res.json(users);
                  });
                  */
                 userData=await users.find();
                 res.send(userData);
            });
            app.post("/registeruser", async (reqe,res)=>{
              let userRegisterStatus=new users(reqe.body);
         
               let result =await userRegisterStatus.save();
                res.send({"message":"Data Save"});

            });
            app.get('*',(req,res)=>{
            
                   res.json([{"message":"Error"}]);
            });

    }).catch((err)=>{

        console.log("connection failed");
    });
 
    app.listen(5000);


