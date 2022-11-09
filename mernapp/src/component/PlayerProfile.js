import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Credential from "../Credential";
function PlayerProfile() {

    let [PlayerName,PlayerSetName]=useState();
    let [PlayerId,PlayerSetId]=useState("");
    let [BattingStyle,BattingStyleSet]=useState();
    let [bowlingStyle,bowlingStyleSet]=useState();
    let [PlaceBirth,PlaceBirt1hSet]=useState();
    let [birthdate,birthdateSet]=useState();
    const params= useParams();

    const {name}=params;
         useEffect(()=>{
           const Api="1aec0293-8769-40a3-a9a3-0ea405524bac";
           
          fetch(`https://api.cricapi.com/v1/players?apikey=${Api}&offset=0&search=${name}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
          })
          .then(async (  resultRes)=>{
            resultRes.json().then((finalResultId)=>{
               console.log(finalResultId);
               let PlayerIdGet=finalResultId.data[0].id;
               console.log(PlayerIdGet);
               PlayerSetName(finalResultId.data[0].name);
               PlayerSetId(finalResultId.data[0].id);
         
               fetch(`https://api.cricapi.com/v1/players_info?apikey=${Api}&id=${PlayerIdGet}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(async(resultFinalRe)=>{
               

         let   Resdata =await resultFinalRe.json();
            console.log(Resdata);
            let PlaceOfBirth=Resdata.data.placeOfBirth;
            bowlingStyle= Resdata.data.bowlingStyle;
            if(bowlingStyle===undefined){
                bowlingStyle="Not A bowler";
            }
            bowlingStyleSet(bowlingStyle);
            console.log(Resdata.data.battingStyle);
            console.log(Resdata.data.bowlingStyle);
            birthdateSet(Resdata.data.dateOfBirth);
            PlaceBirt1hSet(PlaceOfBirth);
            });



            });
          });    


         },[]);
       


     return(
      <> 
{PlayerId}
<h1  className="playerName">{PlayerName}</h1>
<h1>Place Of Birth: {PlaceBirth}</h1>
<h2>Bowling Style:   {bowlingStyle} </h2>
<h1>Date of Birth :{new Date(birthdate).toLocaleDateString([],{month:"short",year:"numeric",day:"numeric"}).replaceAll(" ","-")} </h1>
    <h1>Age:   { new Date().getFullYear() - new Date(birthdate).getFullYear() }</h1>  
      </>
     );  
}
export default PlayerProfile;