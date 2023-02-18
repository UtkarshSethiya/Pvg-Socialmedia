
import './App.css';
import { db } from './firebase/firebase';
import firebase from 'firebase/compat/app'
import Chatdataservice from './firebase/chatfunction'
import {auth,provider} from './firebase/firebase'
import { signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Home from './Homei';

function Signin() {
    const[userdetails,setuserdetails]=useState()
    const[value,setvalue]=useState()
    const[alert,setalert]=useState(false)
 //   let temp=true;

  // if(value=="sethiyautkarsh@gmail.com"){
   // temp=true;
   
  // }
  // else{
   // localStorage.clear()
//
  // }
 // 


console.log(value);

const handleclick=()=>{
  

    signInWithPopup(auth,provider).then((data)=>{
setvalue(data.user.email)
setuserdetails(data)
localStorage.setItem("email",data.user.email)
    })

    }

useEffect(()=>{
    setvalue(localStorage.getItem("email"))
})

    return (
        <div className="App">
{value? <Home userdetails={userdetails} />:

    <button onClick={handleclick}>Sign in with Google</button>
    
}

        </div>
      );


}


 



export default Signin;
