

import { Route,Routes,BrowserRouter,NavLink } from "react-router-dom";
import UserData from "./userdata";
import Welcome from "./Welcome";
import './css/nav.css';



  function App() {

    return(
      <>
    <BrowserRouter>
    <ul>
    <li><NavLink className="nav-link" to="/user">User</NavLink></li>

    <li><NavLink className="nav-link" to="/">Home</NavLink>  </li>
    <li> <NavLink className="nav-link"  to="/products">Product</NavLink></li>
    </ul>
    <Routes>
      <Route path="/" element={<Welcome/>}></Route>
      <Route path="/user" element={<UserData/>}></Route>
      
</Routes>
</BrowserRouter>
         
      </>
    )
    
    
    
    }

export default App;
