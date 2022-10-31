


  import React,{useEffect,useState} from "react";
  function UserData() {

    const [data, setdata] = useState([]);
    const [name,NameSet]=useState("");
     const[email,EmailSet]=useState("");
     let [mobile,MobileSet]=useState("");
     let [userId,IdSet]=useState("");

    let [ButtonName,ButtonSetName]=useState("Register User");
  const submitForm= async(e)=>{
    let    actionForm="";
    let   actionUrl="";
      e.preventDefault();
    
        if(userId===""||userId===undefined){
          actionForm ="POST";
          actionUrl   ="http://localhost:5000/registeruser";
        }else{
          actionForm="PUT";
          actionUrl=`http://localhost:5000/update/${userId}`

        }
        console.log(actionForm);
        console.log(actionUrl);
      mobile=parseInt(mobile);
   
      

     fetch(`${actionUrl}`,{

     
         method:`${actionForm}`,

         body:JSON.stringify({mobile,email,name}),
         headers:{
             "Content-Type":"application/json"
         }
     }).then((result)=>{return result.json()}).then((finalresul)=>{


            
      IdSet("");
  
      console.log(finalresul);
      ButtonSetName("Register User");
      NameSet("");
      EmailSet("");
      MobileSet("");

      getData();
     });
 
      
 }
 useEffect(() => {
  getData();

},[]);
function edit(id){
 
  IdSet(id);
  fetch(`http://127.0.0.1:5000/users/${id}`).then((result)=>{
    result.json().then((resp)=>{
         console.log(resp);

         let username=resp[0].name;
       
      NameSet(username);
      EmailSet(resp[0].email);
      MobileSet(resp[0].mobile);
      
         
     });
});

  ButtonSetName("Update User");

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

    function getData(userIid=""){


    



      
      fetch("http://127.0.0.1:5000/users").then((result)=>{
        result.json().then((resp)=>{
  
         setdata(resp);
            
        });
      });
  
    
  
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
    
  return (
  
       

   <> 
  
    <table style={styles.table} >

      <tbody>

         <tr>
          <th>S.No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Register Date</th>
        <th>Register Time</th>
        <th>Register Day</th>
        <th colSpan="2">Action</th>

         </tr>
        {data.length>0?
          
           data.map((item,index)=><tr key={index} style={styles.td}>
           
                
                
                <td >{index+1}</td><td><img src="http://127.0.0.1:5000/img/pic1.jpg" alt="imgg"/></td><td>{item.name}</td><td>{item.email}</td><td>{item.mobile}</td><td>{new Date(item.date).toLocaleDateString([],{month:"short",year:"numeric",day:"numeric"}).replaceAll(" ","-")} </td><td>{new Date(item.date).toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit",hour12:true})} </td><td>{new Date(item.date).toLocaleDateString([],{weekday:"long"})} </td> <td><button onClick={()=>{deleteRecord(item._id)}}>Delete</button></td><td><button onClick={()=>{edit(item._id)}} >Edit</button></td></tr>)
          :<tr><td colSpan="6" style={styles.nodata}>No Record Found</td></tr>
         
        }
           <tr>
            <td>Total Record</td>
            <td> : {data.length}</td>
           </tr>

             


          
           </tbody>
        </table>
        <div className="FormDiv">

<form onSubmit ={submitForm}>

   UserName <input type="text" value={name} onChange={(e)=>{NameSet(e.target.value)}} /><br/>
 Email   <input type="text" value={email} onChange={(e)=>{EmailSet(e.target.value)}}   /> <br/>
 Mobile   <input type="text" value={mobile} onChange={(e)=>{MobileSet(e.target.value)}}   /> <br/>    
   <input type="hidden" value={userId} onChange={(e)=>{IdSet()}}/>      
    <input  type="submit" value={ButtonName} onChange={(e)=>{ButtonSetName()}} />
</form>
</div>



   </>
         
  )
}

export default UserData;