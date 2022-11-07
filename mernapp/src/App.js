

import { Route,Routes,BrowserRouter,NavLink } from "react-router-dom";
import UserData from "./userdata";
import Welcome from "./Welcome";




  function App() {

    return(
      <>
    <BrowserRouter>
    <ul>
    <li><NavLink className="nav-link" to="/user">User</NavLink></li>

    <li><NavLink  className="nav-link" to="/products">Product</NavLink></li>
    <li><NavLink  className="nav-link" to="/order">Orders</NavLink></li>
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
