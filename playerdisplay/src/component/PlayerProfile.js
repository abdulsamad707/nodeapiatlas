import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/style.css";
function PlayerProfile(){
const params=useParams();
const {name}=params;
let FetchApi=`https://api.cricapi.com/v1/players?apikey=86de5a08-7abf-4014-8b78-2c4f949e62fc&offset=0&search=${name}`;



useEffect(()=>{



},[]);


    return(
        <>
        <h1 className="playerProfile">{name}</h1>
        {FetchApi}

        </>
    );

}
export default PlayerProfile;