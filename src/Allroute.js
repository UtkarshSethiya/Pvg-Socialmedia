
import React, { useContext } from "react";
import { AuthContext } from './context/auth';
import { Navigate } from "react-router-dom";
import chaticon from './images/chat-box.png'
import { Link } from "react-router-dom";
import Post from "./components/Post/Post";
import Postmapping from "./components/Post/Postmapping";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

function Allroute() {
    const { user } = useContext(AuthContext);


    if(!user){
        return(
            <Navigate to="/login"/>
        )
       
    }

  return (
    <div className="Allroutes">
        <div className="options" ><Options/></div>
        <div >  <Post />
        
        </div>
        <div className="notification" >
         <Notification user={user}/>
        </div>
  
     <Link to='/messenger'><img src={chaticon} className='chaticon'></img></Link>
    
    
    </div>
  )
}

export default Allroute