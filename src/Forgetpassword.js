
import React from 'react'
import {doc,updateDoc } from 'firebase/firestore';
import { auth } from './firebase/firebase';
import { db } from './firebase/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword,signInWithPopup ,GoogleAuthProvider,sendPasswordResetEmail} from 'firebase/auth';
import Loading from './components/Loading';
function Forgetpassword() {

    const[result,setresult]=useState([]);
    const provider=new GoogleAuthProvider()
    


const[data,setdata]=useState({
 
    email:'',
    password:'',
    error:null,
    loading:false,
})

const history=useNavigate()
const{email,password,error,loading}=data;
const handlechange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value});
}
const handleSubmit=async(e)=>{
    e.preventDefault();
    setdata({...data,error:null,loading:true})
    if( !email ){
        setdata({...data,error:"*All fields are required"})
    }

    try {
        const result=await sendPasswordResetEmail(
           auth,
            email
            
        )
        
        
        
        
        setdata({email:"",loading:false});
        alert("Reset password Link send ,check your email ")
        history('/Login')
    }
    
    
    catch (error) {
        console.log(error)
        setdata({...data,error:error.message,loading:false})
    }
   
}

  return (
 <section>
    <h3>Reset your Account</h3>
    <form className='form' onSubmit={handleSubmit}>
           
    <div className='input_container'>   
            <label htmlFor='email'>Email</label>
            <input placeholder='Enter Your Email' required type='email' value={email} onChange={handlechange} name="email" />
            </div>
            
<div>{loading && <Loading/>}</div>
            
{error ? <p className='errormessage'>{error}</p>:null}
          <div className='btn_container'>
            <button className='registerbutton' disabled={loading} role='button'>{loading ? 'Pease wait..':'Reset'}</button>
            </div>  
    </form>
    
 </section>
  )
}

export default Forgetpassword;