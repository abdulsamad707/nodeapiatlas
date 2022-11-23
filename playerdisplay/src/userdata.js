


  import React,{useState} from "react";
import { NavLink } from "react-router-dom";
  import Credential from "./Credential";
  import "./css/style.css";

  

  function UserData() {



  /*  NoofCenturies
    NoofFifties
NoofWicket
NooffiveWicket
EconomyRate 
BestBowiingFiguress 
StartCareerDate 
Stadium
    */
    const [files,setFileDetail]=useState([]);
    const [data, setdata] = useState([]);
    const [name,NameSet]=useState("");
     const[Average,AverageSet]=useState("");
     let [StrikeRate,StrikeRateSet]=useState("");
     let [userId,IdSet]=useState("");
     let [NoofMatch,NoofSetMatch]=useState("");
     let [RunScore,RunScoreSet]=useState("");
     let [NoofCenturies,NoofCenturiesset]=useState();
     let [NoofFifties,NoofFiftiesSet]=useState();
     let [NoofWicket,NoofWicketSet]=useState();
     let [NooffiveWicket,NooffiveWicketSet]=useState();
   let  [EconomyRate,EconomyRateSet] =useState("");
   let   [BestBowiingFigures,BestBowiingFiguresSet] =useState("");
   let  [StartCareerDate,StartCareerDateSet]=useState("");
   let  [Stadium,Stadiumset]=useState("");
     let APIPATH=Credential;
     let [ButtonName,ButtonSetName]=useState("Register User");

let [team,teamSet]=useState();
    


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

   
      
    let  formData=new FormData();

  
  





      console.log(files.length);
      formData.append("name",name);
      formData.append("file_user",files);
      formData.append("average",Average);
 
      formData.append("strikeRate",StrikeRate);
      formData.append("noofMatch",NoofMatch);
      formData.append("RunScore",RunScore);
  formData.append("NoofCenturies",NoofCenturies);
  formData.append("NoofFifties",NoofFifties);
  formData.append("NoofMatch",NoofMatch);
  formData.append("NoofWicket",NoofWicket);
  formData.append("NooffiveWicket",NooffiveWicket);
  formData.append("EconomyRate",EconomyRate );
  formData.append("BestBowiingFigures",BestBowiingFigures );
  formData.append("StartCareerDate",StartCareerDate );
  formData.append("Stadium",Stadium);
  formData.append("team",team);
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
           

                
                <td >{index+1}</td><td><NavLink to={"/player/"+item._id}>Profile</NavLink></td><td><img src={APIPATH+item.imgpath}alt="imgg"/></td><td>{item.name}</td><td>{new Date(item.date).toLocaleDateString([],{month:"short",year:"numeric",day:"numeric"}).replaceAll(" ","-")} </td><td>{new Date(item.date).toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit",hour12:true})} </td><td>{new Date(item.date).toLocaleDateString([],{weekday:"long"})}</td><td><button onClick={()=>{deleteRecord(item._id)}}>Delete</button></td><td><button onClick={()=>{edit(item._id)}}>Edit</button></td></tr>)
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
No of Match <input type="text" onChange={(e)=>{NoofSetMatch(e.target.value) }}    /><br/>
Run Scored <input type="text  "onChange={(e)=>{RunScoreSet(e.target.value)}}/><br/>
Average   <input type="text" onChange={(e)=>{AverageSet(e.target.value)}}/><br/>

Strike Rate  <input type="text" onChange={(e)=>{StrikeRateSet(e.target.value)}}/><br/>
No of Centuries <input type="text" onChange={(e)=>{NoofCenturiesset(e.target.value)}} /><br/>
No of Fifties <input type="text" onChange={(e)=>{NoofFiftiesSet(e.target.value)}} /><br/>
No of Wicket <input type="text"onChange={(e)=>{NoofWicketSet(e.target.value)}} /><br/>
No of 5 wicket (in a match) <input type="text" onChange={(e)=>{NooffiveWicketSet(e.target.value)}}/><br/>
Economy Rate <input type="text" onChange={(e)=>{EconomyRateSet(e.target.value)}}/><br/>
Best Bowiing Figuress <input type="text" onChange={(e)=>{BestBowiingFiguresSet(e.target.value)}}/><br/>

Stadium <input type="text" onChange={(e)=>{Stadiumset(e.target.value)}} /><br/>
Team Against <input type="text" onChange={(e)=>{teamSet(e.target.value)}} /><br/>
Start Career Date <input type="date"onChange={(e)=>{StartCareerDateSet(e.target.value)}} /><br/>
<input type="file" onChange={(e)=>{SelectFiles(e)}}/>  
<input type="hidden" value={userId} onChange={(e)=>{IdSet()}}/>      
<input  type="submit" value={ButtonName} onChange={(e)=>{ButtonSetName()}} />
</form>
</div>


   </>
 
         
  )
}

export default UserData;