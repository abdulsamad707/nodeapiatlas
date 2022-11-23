
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../css/style.css";
 function PlayerProfile(){
 const params=useParams();
    let {id}=params;








               

    return(
        <>
  {id}

        </>
    );

}
export default PlayerProfile;