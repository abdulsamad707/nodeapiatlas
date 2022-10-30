

import { useState } from "react";
import "./css/form.css";
import data from "./userdata";
const UserRegister =  ()=>{
    const [name,NameSet]=useState("");
     const[email,EmailSet]=useState("");
     const[mobile,MobileSet]=useState("");
    const [activateStatus,setStatus]=useState(1);
       const submitForm= async(e)=>{
            
             e.preventDefault();
           
     
              
             FormData=JSON.stringify({mobile,email,name,activateStatus});

            fetch("http://localhost:5000/registeruser",{

            
                method:"POST",

                body:FormData,
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((result)=>{return result.json()}).then((finalresul)=>{})
        
          console.log(data);
        }

    return <>


    <div className="FormDiv">

    <form onSubmit ={submitForm}>
    
        <input type="text" value={name} onChange={(e)=>{NameSet(e.target.value)}} /><br/>
        <input type="text" value={email} onChange={(e)=>{EmailSet(e.target.value)}}   /> <br/>
        <input type="text" value={mobile} onChange={(e)=>{MobileSet(e.target.value)}}   /> <br/>          
        <input  type="submit"  />
    </form>
    </div>
    </>
}
export default UserRegister;