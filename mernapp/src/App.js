

import { Route,Routes,BrowserRouter,NavLink } from "react-router-dom";
import UserData from "./userdata";
import Welcome from "./Welcome";
import PlayerProfile from "./component/PlayerProfile";




  function App() {

    return(
      <>
    <BrowserRouter>
    <ul>
    <li><NavLink className="nav-link" to="/user"> Players</NavLink></li>

    <li><NavLink  className="nav-link" to="/products">Add Players</NavLink></li>
    
  
    </ul>
    <Routes>
      <Route path="/" element={<Welcome/>}></Route>
      <Route path="/user" element={<UserData/>}></Route>
    
      <Route path="/player/:name" element={<PlayerProfile />}></Route>
</Routes>
</BrowserRouter>
         
      </>
    )
    
    
    
    }

export default App;
