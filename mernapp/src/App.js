
import React,{useEffect,useState} from "react";
import User from './header';



  function App() {

    const [data, setdata] = useState([]);
   

    useEffect(() => {

      
      fetch("http://127.0.0.1:5000/users").then((result)=>{
        result.json().then((resp)=>{
  
         setdata(resp);
            
        });
      });
  
    
    },[])


    
  return (
  
       <>  
   
         
        
           {data.map((item,index)=>
                     <User data={item} key={index}/>
                
           )}
        
       </>
  );
}

export default App;
