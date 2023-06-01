import React,{useContext, useState} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { auth,db } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { updateDoc,doc,getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import './nav.css'
import { useEffect } from 'react';



function Navbar() {
    const history=useNavigate()
const{user}=useContext(AuthContext);
const[currentUser,setCurrentUser]=useState("");





    const handleSignout = async ()=>{
        await updateDoc(doc(db,'users',auth.currentUser.uid),{
            isOnline:false
        })
        await signOut(auth);
       
        history('/login')

    }
 
   
        if(user){
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if(currentUser.block==="true"){
                handleSignout()
              
            }
            if (docSnap.exists) {
              setCurrentUser(docSnap.data());
            }
          });
        }

      
  return (
    <nav className={currentUser.role=="teacher"?'prof':'stu'}>
        <div className='topleft'>
            <h3 className='pvg'>PVG's COET</h3>
            {user ? (
        <>
        <Link to='/home'>Home</Link>
       
        </>  
            ):
            "" }
       
        </div>
        

        <div>
            
            {user ? (
        <>
         <Link to='/Mypost'>My Posts</Link>
         <Link to='/register'>About</Link>
        <Link to='/profile'>Profile</Link>
        <button className='logoutbutton' onClick={handleSignout} >Logout</button>
        </>  
            ) 
        : 
        (
        <>
       
          <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
        </>
        )
      
        }
            
        </div>
        
        </nav>
  )
}

export default Navbar