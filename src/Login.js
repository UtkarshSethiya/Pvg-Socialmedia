
import React from 'react'
import {doc,updateDoc } from 'firebase/firestore';
import { auth } from './firebase/firebase';
import { db } from './firebase/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loading from './components/Loading';
function Login() {

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
    if( !email || !password){
        setdata({...data,error:"*All fields are required"})
    }

    try {
        const result=await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        await updateDoc(doc(db,"users",result.user.uid),{
           
            isOnline:true,
        })
        
        
        
        setdata({name:"",email:"",password:"",error:null,loading:false});
        history('/home')
    }
    
    
    catch (error) {
        console.log(error)
        setdata({...data,error:error.message,loading:false})
    }
   
}

  return (
 <section>
    <h3>Log into your Account</h3>
    <form className='form' onSubmit={handleSubmit}>
           

            <div className='input_container'>   
            <label htmlFor='email'>Email</label>
            <input type='email' value={email} onChange={handlechange} name="email" />
            </div>
<div>{loading && <Loading/>}</div>
            <div className='input_container'>
            <label htmlFor='password'>Password</label>
            <input type='password' value={password} onChange={handlechange}  name="password" />
            </div>
{error ? <p className='errormessage'>{error}</p>:null}
          <div className='btn_container'>
            <button className='registerbutton' disabled={loading} role='button'>{loading ? 'Pease wait..':'Login'}</button>
            </div>  
    </form>

 </section>
  )
}

export default Login;