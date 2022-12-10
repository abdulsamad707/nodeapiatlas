
import './App.css';
import { Route,Routes,BrowserRouter,NavLink, Outlet } from "react-router-dom";
import UserData from "./userdata";

import PlayerProfile from "./components/PlayerProfile";
import HomeContainer from "./containers/HomeContainer";
import Product from "./components/Product";

function App() {
  return (
     <>
    <BrowserRouter>
    <ul>
    <li><NavLink className="nav-link" to="/user"> Players</NavLink></li>

    <li><NavLink  className="nav-link" to="/products">Product</NavLink></li>
    <Outlet/>

    </ul>
    <Routes>
      <Route path="/home" element={  <HomeContainer></HomeContainer>}></Route>
      <Route path="/products" element={<Product/>}></Route>
      <Route path="/user" element={<UserData/>}></Route>
      <Route path='/player/:id' element={<PlayerProfile/>}></Route>

</Routes>
</BrowserRouter>
</>
  )
    
}

export default App;
