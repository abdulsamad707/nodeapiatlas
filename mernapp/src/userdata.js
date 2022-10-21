import React,{useEffect,useState} from "react";




  function UserData() {

    const [data, setdata] = useState([]);
   

    useEffect(() => {

      
      fetch("http://127.0.0.1:5000/users").then((result)=>{
        result.json().then((resp)=>{
  
         setdata(resp);
            
        });
      });
  
    
    },[])

    const styles={
      tr:{
       backgroundColor:"yellow"
   
      },
       table:{
        border:"1px solid black",
        borderCollapse:"collapse"

       }
    }
    
  return (
  
       

   <> <table style={styles.table} >
        {
              data.map((item)=><tr style={styles.tr}><td>{item.username}</td><td>{item.email}</td></tr>)
                  
        }
        </table>
   </>
         
  )
}

export default UserData;
