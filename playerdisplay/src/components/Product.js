

import { useState } from "react";

 function Product(){
  let [image,imageProductSet]=useState();
let [ProductName,ProductNameSet]=useState();
let [Price,PriceSet]=useState();
let [KeyWord,KeyWordSet]=useState();
let [productImage,productImageSet]=useState();

const submitForm = async(e)=>{
    e.preventDefault();
    console.log(`Today is ${new Date().toLocaleDateString([],{month:"long",day:"numeric",year:"numeric"})} ${ProductName}`);
      console.log(Price);
      console.log(KeyWord)
      let  formData=new FormData();
      formData.append("name",ProductName);
      formData.append("price",Price);
      formData.append("keyword",KeyWord);
      formData.append("uploadProducts",productImage);
   
console.log(productImage);
      /*uploadProducts*/
    /*  name:ProductName,
      price:ProductPrice,
      keyword:ProductKeyword,
      imgpath:"uploadProducts/"+filecomplete.filename,*/
   let actionUrl="http://localhost:5000/addProduct";
  /* uploadProducts */
      fetch(`${actionUrl}`,{

       /* "Content-Type":"application/json"
       JSON.stringify({product:ProductName,price:Price})
       */

        method:"POST",
        headers:{
        
        },
     
      
        body:formData,
    }).then(async(c)=>{
       console.log(c);
      console.log  (await c.json());

    });
    console.log(FormData);
    






}
function selectFile(e){
  console.log(e.target.files[0]);
  productImageSet(e.target.files[0]);
}
async function  ProductDetail(){
     
let productDetailApi =await fetch("http://localhost:5000/products");
let productDetail=await productDetailApi.json();
imageProductSet("http://localhost:5000/"+productDetail[0].imgpath);




    
}

ProductDetail();
    

    return (<>

    <img alt="product" src={image}></img>
    <h1>Products</h1>
    <form onSubmit={submitForm} encType="form-data/multipart">

Product Name <input type="text" onChange={(e)=>{ProductNameSet(e.target.value)}} /><br/>
Price <input type="text" onChange={(e)=>{PriceSet(e.target.value)}}    /><br/>
Image <input type="file"  onChange={(e)=>{selectFile(e)}}/><br/>
KeyWord   <input type="text" onChange={(e)=>{KeyWordSet(e.target.value)}} /><br/>
<input type="submit"></input>

</form>
         

    
    </>);

}
export default Product;