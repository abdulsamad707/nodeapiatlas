
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
let [t20Run,t20RunSet]=useState("");
let [t20Match,t20MatchSet]=useState("");
let [t20StrikeRate,t20StrikeRateSet]=useState("");
let [t20average,t20averageSet]=useState("");
let [t20hundred,t20hundredSet]=useState("");
let[t20Fifties,t20FiftiesSet]=useState("");
let[TestFifties,TestFiftiesSet]=useState("");
let [ODIFifties,ODIFiftiesSet]=useState('');
let [Testhundred,TesthundredSet]=useState("");
let [TestStrikeRate,TestStrikeRateSet]=useState();
let [Testaverage,Testaverageset]=useState("");
let [TestRun,TestRunSet]=useState("");
let [TestMatch,TestMatchSet]=useState("");
let [ODIhundred,ODIhundredSet]=useState("");
let [ODIStrikeRate,ODIStrikeRateSet]=useState();
let [ODIaverage,ODIaverageset]=useState("");
let [ODIRun,ODIRunSet]=useState("");
let [ODIMatch,ODIMatchSet]=useState("");
let[bowlAverage,T2OBowlAverageSet]=useState();
let [T20Wicket,T20WicketSet]=useState(0);
let [T2OBBF,T2OBBFSet]=useState();
let [t20Eco,t20EcoSet]=useState();
let[ODIbowlAverage,ODIBowlAverageSet]=useState();
let [ODIWicket,ODIWicketSet]=useState();
let [ODIBBF,ODIBBFSet]=useState();
let [ODIEco,ODIEcoSet]=useState();
let[TestBBF,TestBBFSet]=useState();
let [TestWicket,TestWicketSet]=useState();
let[TestEco,TestEcoSet]=useState();
let [TestBowlAverage,TestBowlAverageSet]=useState();
let [T20hs,T20Set]=useState();
let [ODIhs,ODIhsSet]=useState();
let [Tesths,TesthsSet]=useState();
    let {id}=params;
    useEffect(()=>{
        fetch(`http://localhost:5000/player/${id}`).then((res)=>{
            res.json().then((finalResult)=>{
             console.log(finalResult);
                let formTeamArray=finalResult[0].teamPlayed;
                formTeamArray=formTeamArray.split(",");
                console.log(formTeamArray);
     
          teamSet(t => (formTeamArray));
          t20MatchSet(finalResult[0].battingStats[0].NumberOfmatch);
               imageSet(finalResult[0].imageFullPath);
               playernameSet(finalResult[0].name);
               bioSet(finalResult[0].battingStats[0].biography);
               roleSet(finalResult[0].role);
               placeBirthSet(finalResult[0].placeBirth);
               debutStadiumSet(finalResult[0].battingStats[0].t20matchdebutStadium);
               debutTeamSet(finalResult[0].battingStats[0].t20matchdebutTeam);
               debutDateSet(new Date(finalResult[0].battingStats[0].t20matchdebutdate).toLocaleDateString([],{month:"long",day:"numeric",year:"numeric"}).replaceAll(" ","-"));
               debutDaySet(new Date(finalResult[0].battingStats[0].t20matchdebutdate).toLocaleDateString([],{weekday:"long"}));
               t20RunSet(finalResult[0].battingStats[0].runs);
               t20MatchSet(finalResult[0].battingStats[0].NumberOfmatch);
               t20StrikeRateSet(finalResult[0].battingStats[0].StrikeRate);
               bowlingStyleSet(finalResult[0].bowlingStyle);
               t20averageSet(finalResult[0].battingStats[0].average);
               t20hundredSet(finalResult[0].battingStats[0].NumberOfHudred);
               t20FiftiesSet(finalResult[0].battingStats[0].NumberOffifties);
             let TestFifty=finalResult[0].battingStatsTest[0];
              let ODIFifty=finalResult[0].battingStatsODI[0].nooffifties;
              
              ODIFiftiesSet(ODIFifty);

           console.log(T2OBBF);

               if(TestFifty){
                TestFifty=finalResult[0].battingStatsTest[0].nooffifties;
              var   Testhundreds=finalResult[0].battingStatsTest[0].noofcenturies;
             var  TestStrikeRates=finalResult[0].battingStatsTest[0].strikerate;
             TestMatchSet(finalResult[0].battingStatsTest[0].noofmatch);
             TestRunSet(finalResult[0].battingStatsTest[0].runscore);
             Testaverageset(finalResult[0].battingStatsTest[0].average);
               }else{
                TestFifty=0;
                Testhundreds=0;
                TestStrikeRates=0;
                TestMatchSet(0);
                TestRunSet(0);


               }
               ODIhsSet(finalResult[0].battingStatsODI[0].highestrun);
               T20Set(finalResult[0].battingStats[0].highestrun);
               TesthsSet(finalResult[0].battingStatsTest[0].highestrun);
               ODIBBFSet(finalResult[0].bowlingStatsODI[0].bestBowlingmatch);
               ODIEcoSet(finalResult[0].bowlingStatsODI[0].economyRate);
               ODIBowlAverageSet(finalResult[0].bowlingStatsODI[0].average);
               ODIWicketSet(finalResult[0].bowlingStatsODI[0].totalWicket);
        TestBBFSet(finalResult[0].bowlingStatsTest[0].bestBowlingmatch);
               TestEcoSet(finalResult[0].bowlingStatsTest[0].economyRate);
               TestBowlAverageSet(finalResult[0].bowlingStatsTest[0].bowlAverage);
               TestWicketSet(finalResult[0].bowlingStatsTest[0].totalWicket);
               ODIhundredSet(finalResult[0].battingStatsODI[0].noofcenturies);
               ODIStrikeRateSet(finalResult[0].battingStatsODI[0].strikerate);
               ODIaverageset(finalResult[0].battingStatsODI[0].average);
               ODIRunSet(finalResult[0].battingStatsODI[0].runscore);
               ODIMatchSet(finalResult[0].battingStatsODI[0].noofmatch);
               TestFiftiesSet(TestFifty);
               TesthundredSet(Testhundreds);
               TestStrikeRateSet(TestStrikeRates);
               T2OBBFSet(finalResult[0].bowlingStats[0].bestBowlingmatch);
              let  tweWick=finalResult[0].bowlingStats[0].totalWicket;
              
                  if(tweWick===undefined){
                     T20WicketSet(0);

                  }else{
                     T20WicketSet(finalResult[0].bowlingStats[0].totalWicket);
                  }

               T2OBowlAverageSet(finalResult[0].bowlingStats[0].bowlAverage);
               t20EcoSet(finalResult[0].bowlingStats[0].economyRate);
               ODIBowlAverageSet(finalResult[0].bowlingStatsODI[0].bowlAverage);
               dateobirthSet(new Date(finalResult[0].dateOfBirth).toLocaleString([],{month:"long",day:"numeric",year:"numeric"}).replaceAll(" ","-"));
            })
     
         });
    },[  ]);
  
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
 {teams.map((item,i)=>( i<7?<h1 key={i}>{i+1} {item} </h1>:""  )  )}


    

<p> {bio} </p>
<h1  className="playerProfile">batting stats</h1>
<table>
 <thead>
         <tr>
            <th>Format</th>
            <th>Number of Matches</th>
            <th>Runs</th>
            <th>Average</th>
            <th>Strike Rate</th>
            <th>Hundreds</th>
            <th>Fifties</th>
            <th>Highest Run</th>
         </tr>
         </thead>
         <tbody>
            <tr>
            <td>T20i</td>
            <td>{t20Match}</td>
               <td>{t20Run}</td> 
               <td>{t20average}</td>
              <td>{t20StrikeRate}</td> 
             <td>{t20hundred}</td> 
             <td>{t20Fifties}</td>
             <td>{T20hs}</td> 
            </tr>
            <tr>
               <td>ODI</td>
            <td>{ODIMatch}</td>

               <td>{ODIRun}</td> 
               <td>{ODIaverage}</td>
              <td>{ODIStrikeRate}</td> 
             <td>{ODIhundred}</td> 
             <td>{ODIFifties}</td>
           <td> {ODIhs}</td> 
            </tr>
            <tr>
            <td>Test</td>
            <td>{TestMatch}</td>
               <td>{TestRun}</td> 
               <td>{Testaverage}</td>
              <td>{TestStrikeRate}</td> 
             <td>{Testhundred}</td> 
             <td>{TestFifties}</td>
            <td> {Tesths}</td>
            </tr>
         </tbody>
       </table>
       <h1  className="playerProfile">Bowling stats</h1>
       <table>
 <thead>
         <tr>
            <th>Format</th>
            <th>Number of Wickets</th>
            <th>Best Figures</th>
            <th>Bowl Average</th>
            <th>Economy Rate</th>
        
        </tr>
         </thead>
           <tbody>
            <tr>
               <td>T20i</td>
     
               <td>{T20Wicket===undefined?0:T20Wicket}</td>
               <td>{T2OBBF===null?0:T2OBBF }</td>
               <td>{bowlAverage===undefined?0:bowlAverage}</td>
               <td>{t20Eco===undefined?0:t20Eco}</td>
            </tr>
               <tr>
                  <td>ODI</td>
                  <td>{ODIWicket}</td>
                  <td>{ODIBBF}</td>
                 <td>{ODIbowlAverage}</td> 
                 <td>{ODIEco}</td>
               </tr>
               <tr>
                  <td>Test</td>
                  <td> {TestWicket}</td>
                  <td> {TestBBF}</td>
        
                  <td>{TestBowlAverage}</td>
                  <td> {TestEco}</td>
               
               </tr>
           </tbody>
         </table>
        </>
    );

}
export default PlayerProfile;