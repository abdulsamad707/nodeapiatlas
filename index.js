
const express =require("express");
const app =express();
const mongoose=require("mongoose");
const url="mongodb+srv://Unigrocery:jHhUHk29D78oS6iI@cluster0.2zyy2qt.mongodb.net/?retryWrites=true&w=majority/groceryshop";

function getData(a=4){
     let y=3;
     a=a*4;
     console.log(a);
    mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
        curretTime=new Date();
        console.log(`connection succesfully at ${curretTime}`);
    })
    
}
getData(10);