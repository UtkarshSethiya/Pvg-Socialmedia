
import React, { useContext, useState } from "react";
import { AuthContext } from './context/auth';
import { Navigate } from "react-router-dom";
import chaticon from './images/chat-box.png'
import { Link } from "react-router-dom";
import Post from "./components/Post/Post";
import Postmapping from "./components/Post/Postmapping";
import { signOut } from "firebase/auth";
import Options from "./components/Options/Options";
import { useEffect } from "react";
import { doc,getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase/firebase";
import Notification from "./components/Notification/Notification";
import { auth } from './firebase/firebase';
import { sendSignInLinkToEmail } from "firebase/auth";
function Allroute() {
    const { user } = useContext(AuthContext);
    const history=useNavigate()
  const[disable,setdisable]=useState(false)
console.log(disable)
useEffect(()=>{
  getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setdisable(docSnap.data());
        
      }
    });
},[])
//console.log(disable.isDisabled

 // )
 const handleSignout=async()=>{
  await signOut(auth);
  history('/login')
  alert("You are blocked")
  document.location.reload();
}
if(!user){
  return(
      <Navigate to="/login"/>
  )
 
}
if(disable.isDisabled){
 handleSignout();

        
}

   
   /* 
}*/

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