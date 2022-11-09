


  import React,{useState} from "react";
import { NavLink } from "react-router-dom";
  import Credential from "./Credential";
  import "./css/form.css";

  

  function UserData() {

    const [files,setFileDetail]=useState([]);
    const [data, setdata] = useState([]);
    const [name,NameSet]=useState("");
     const[email,EmailSet]=useState("");
     let [mobile,MobileSet]=useState("");
     let [userId,IdSet]=useState("");
     let [NoofMatch,NoofSetMatch]=useState("");
     let [RunScore,RunScoreSet]=useState("");
     let APIPATH=Credential;
    let [ButtonName,ButtonSetName]=useState("Register User");


    


      const getData=(userIid="")=>{


    



      
        fetch(`${APIPATH}users`).then((result)=>{
          result.json().then((resp)=>{
          
           setdata(resp);
              
          });
        });



      }
      getData();
    
  const submitForm= async(e)=>{
    let actionForm="";
    let actionUrl="";
      e.preventDefault();
    
        if(userId===""||userId===undefined){
          actionForm ="POST";
          actionUrl   =`${APIPATH}registeruser`;
        }else{
          actionForm="PUT";
          actionUrl=`${APIPATH}update/${userId}`

        }
        console.log(actionForm);
        console.log(actionUrl);
      mobile=parseInt(mobile);
   
      
    let  formData=new FormData();

      formData.append("name",name);
      console.log(files.length);
    
      formData.append("file_user",files);
      console.log(FormData);
      
     fetch(`${actionUrl}`,{

     
         method:`${actionForm}`,
         headers:{
         
         },
      
       
         body:formData,
       
     }).then((result)=>{return result.text()}).then((finalresul)=>{
        console.log(finalresul);
    
          
      IdSet("");
  
      console.log(finalresul);
      ButtonSetName("Register User");
      NameSet("");
      EmailSet("");
      MobileSet("");
    

      getData();
      
     });
  
      
 }


const SelectFiles=(e)=>{
console.log(e.target.files[0]);
setFileDetail(e.target.files[0]);
}



  
    const styles={
      tr:{
       
       padding:"12px",
        
      },
         td:{
   border:"1px solid black",
   padding:"12px",

   textAlign:"center"
         },
       table:{
        border:"1px solid black",
        borderCollapse:"collapse",
        alignItem:"center",
        justifyContent:"center",
        margin:"auto",
        padding:"auto"

       },
       nodata:{
        textAlign:"center"
       }
    }







         const deleteRecord = id =>  {
          console.log(id);
          if(window.confirm("Are You Want to Delete")){
            fetch(`http://127.0.0.1:5000/deleteuser/${id}`,{method:"DELETE"}).then((result)=>{
              result.json().then((resp)=>{
                   console.log(resp);
            
                  getData();
                
                   
               });
            });
          }
        
        /*
        
        
             
        */
        } 
        function edit(id){
 
          IdSet(id);
          fetch(`http://127.0.0.1:5000/users/${id}`).then((result)=>{
            result.json().then((resp)=>{
                 console.log(resp);
        
                 let username=resp[0].name;
               
              NameSet(username);
          
              
                 
             });
        });                     
                                                    
          ButtonSetName("Update User");
        
        }




  return (
  
       

   <> 


    <table style={styles.table} >

      <tbody>

         <tr>
          <th>S.No</th>
          <th>Profile</th>
          <th>Image</th>
        <th>Name</th>

        <th>Register Date</th>
        <th>Register Time</th>
        <th>Register Day</th>
        <th colSpan="2">Action</th>

         </tr>
        {data.length>0?
          
           data.map((item,index)=><tr key={index} style={styles.td}>
           

                
                <td >{index+1}</td><td><NavLink to={"/player/"+item.name}>Profile</NavLink></td><td><img src={APIPATH+item.imgpath}alt="imgg"/></td><td>{item.name}</td><td>{new Date(item.date).toLocaleDateString([],{month:"short",year:"numeric",day:"numeric"}).replaceAll(" ","-")} </td><td>{new Date(item.date).toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit",hour12:true})} </td><td>{new Date(item.date).toLocaleDateString([],{weekday:"long"})}</td><td><button onClick={()=>{deleteRecord(item._id)}}>Delete</button></td><td><button onClick={()=>{edit(item._id)}}>Edit</button></td></tr>)
          :<tr><td colSpan="6" style={styles.nodata}>No Record Found</td></tr>
         
        }
           <tr>
            <td>Total Record</td>
            <td> : {data.length}</td>
           </tr>

             


          
           </tbody>
        </table>
        <div className="FormDiv">


<form onSubmit ={submitForm} encType="form-data/multipart">

Player Name <input type="text" value={name} onChange={(e)=>{NameSet(e.target.value)}} /><br/>

No of Match <input type="text"/><br/>

Run Scored <input type="text"/><br/>
<input type="file" onChange={(e)=>{SelectFiles(e)}}/>  
<input type="hidden" value={userId} onChange={(e)=>{IdSet()}}/>      
<input  type="submit" value={ButtonName} onChange={(e)=>{ButtonSetName()}} />
</form>
</div>


   </>
 
         
  )
}

export default UserData;