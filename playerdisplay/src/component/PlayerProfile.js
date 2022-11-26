
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../css/style.css";
 function PlayerProfile(){
 const params=useParams();
 let [image,imageSet]=useState();
 let [playername,playernameSet]=useState();
 let [bio,bioSet]=useState();
 let [dateofbirth,dateobirthSet]=useState();
 let [role,roleSet]=useState();
let [teams,teamSet]=useState([]);
let [placeBirth,placeBirthSet]=useState("");
let [debutStadium,debutStadiumSet]=useState("");
let [debutTeam,debutTeamSet]=useState("");
let [debutDate,debutDateSet]=useState("");
let [debutDay,debutDaySet]=useState("");
let [bowlingStyle,bowlingStyleSet]=useState("");
    let {id}=params;
    useEffect(()=>{
        fetch(`http://localhost:5000/player/${id}`).then((res)=>{
            res.json().then((finalResult)=>{
             console.log(finalResult);
                let formTeamArray=finalResult[0].teamPlayed;
                formTeamArray=formTeamArray.split(",");
                console.log(formTeamArray);
          teamSet(t => (formTeamArray));

               imageSet(finalResult[0].imageFullPath);
               playernameSet(finalResult[0].name);
               bioSet(finalResult[0].battingStats[0].biography);
               roleSet(finalResult[0].role);
               placeBirthSet(finalResult[0].placeBirth);
               debutStadiumSet(finalResult[0].battingStats[0].t20matchdebutStadium);
               debutTeamSet(finalResult[0].battingStats[0].t20matchdebutTeam);
               debutDateSet(new Date(finalResult[0].battingStats[0].t20matchdebutdate).toLocaleDateString([],{month:"long",day:"numeric",year:"numeric"}).replaceAll(" ","-"));
               debutDaySet(new Date(finalResult[0].battingStats[0].t20matchdebutdate).toLocaleDateString([],{weekday:"long"}));
           

               bowlingStyleSet(finalResult[0].bowlingStyle);
               dateobirthSet(new Date(finalResult[0].dateOfBirth).toLocaleString([],{month:"long",day:"numeric",year:"numeric"}).replaceAll(" ","-"));
            })
     
         });
    },[id]);
  
console.log(id);






               

    return(
        <>
 <h1 className="playerProfile" >{playername}</h1> 


 <div className="containerplayer"  >
<img src={image} alt=" player"/>
Role:{role}<br/>
Date Of Birth : {dateofbirth}<br/>
Place Of Birth :{placeBirth}<br/>
Debut Stadium:{debutStadium}<br/>
Debut Against :{debutTeam} <br/>
Debut Date : {debutDate}<br/>
Debut Day:{debutDay} <br/>
Bowiing Style:{bowlingStyle!==undefined?bowlingStyle:"not a bowler"} <br/>
Age: {new Date().getFullYear() -new Date(dateofbirth).getFullYear()}
 </div>
 <h1>Team</h1>  
 {teams.map((item,i)=>(<h1 key={i}>{i+1} {item} </h1>) )}


    

<p> {bio} </p>
         <h1  className="playerProfile">batting stats</h1>
       <table>
 <thead>
         <tr>
            <th>Number of Matches</th>
            <th>Runs</th>
            <th>Average</th>
            <th>Strike Rate</th>
         </tr>
         </thead>
       </table>
        </>
    );

}
export default PlayerProfile;