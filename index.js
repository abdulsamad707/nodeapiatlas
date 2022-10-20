const express =require("express");
const app =express();
const mongoose=require("mongoose");
const products=require('./products');
const users=require('./users');
const cors=require("cors");
  app.use(cors());
/*srv*
mongodb://Unigrocery:xgZHEW2MlTp3oRYR@cluster0.2zyy2qt.mongodb.net/groceryshop?retryWrites=true&w=majority*/

const uri = "mongodb://127.0.0.1/grocerystore";

   mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  
            app.get('/products',function(req,res){
                products.find({},function(err,products){
                      console.log(products);
                       res.json(products);
                  });
            });
            app.get('/users',function(req,res){
                users.find({},function(err,users){
                       res.json(users);
                  });
            });
            app.get('*',(req,res)=>{
            
                   res.json([{"message":"Error"}]);
            });

    }).catch((err)=>{

        console.log("connection failed");
    });
 
    app.listen(5000);


