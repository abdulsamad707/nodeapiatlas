

import { Route,Routes,BrowserRouter,Link } from "react-router-dom";
import UserData from "./userdata";




  function App() {

    return(
      <>
    <BrowserRouter>
  <Link  to="/user">User</Link>
    <Routes>
      <Route path="/" element={<UserData/>}></Route>
      
</Routes>
</BrowserRouter>
         
      </>
    )
    
    
    
    }

export default App;
