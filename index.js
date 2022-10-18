const express =require("express");
const app =express();
const mongoose=require("mongoose");
const uri = "mongodb+srv://Unigrocery:jHhUHk29D78oS6iI@cluster0.2zyy2qt.mongodb.net/groceryshop?retryWrites=true&w=majority";

   mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
        curretTime=new Date();
             
        console.log(`connection succesfully at ${curretTime} Pakistan Aisa`);

    });

    


