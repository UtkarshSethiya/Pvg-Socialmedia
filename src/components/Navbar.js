import React,{useContext} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { auth,db } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { updateDoc,doc } from 'firebase/firestore';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import './nav.css'



function Navbar() {
    const history=useNavigate()
const{user}=useContext(AuthContext);

    const handleSignout = async ()=>{
        await updateDoc(doc(db,'users',auth.currentUser.uid),{
            isOnline:false
        })
        await signOut(auth);
        history('/login')

    }
  return (
    <nav>
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