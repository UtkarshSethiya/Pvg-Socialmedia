
import Loading from './components/Loading'
import React, { useContext } from "react";
import { AuthContext } from './context/auth';
import { Navigate, Route } from "react-router-dom";
import Home from './Home';


function Privatepages() {
    const { user } = useContext(AuthContext);
  return (
    <div>
       { user ? <Home/> : <Navigate to="/login"/>}
    </div>
  )
}

export default Privatepages