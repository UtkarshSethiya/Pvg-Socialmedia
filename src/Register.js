
import React from 'react'
import { setDoc,doc,Timestamp } from 'firebase/firestore';
import { auth } from './firebase/firebase';
import { db } from './firebase/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Loading from './components/Loading';
function Register() {

const[data,setdata]=useState({
    name:'',
    email:'',
    password:'',
    error:null,
    loading:false,
})

const history=useNavigate()
const{name,email,password,error,loading}=data;
const handlechange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value});
}
const handleSubmit=async(e)=>{
    e.preventDefault();
    setdata({...data,error:null,loading:true})
    if(!name || !email || !password){
        setdata({...data,error:"*All fields are required"})
    }

    try {
        const result=await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        await setDoc(doc(db,"users",result.user.uid),{
            uid:result.user.uid,
            name,
            email,
            createdAt:Timestamp.fromDate(new Date()),
            isOnline:true,
        })
        
        
        
        setdata({name:"",email:"",password:"",error:null,loading:false});
        history('/login')
    }
    
    
    catch (error) {
        console.log(error)
        setdata({...data,error:error.message,loading:false})
    }
   
}

  return (
 <section>
    <h3>Create an Account</h3>
    <form className='form' onSubmit={handleSubmit}>
            <div className='input_container'>
            <label htmlFor='name'>Name</label>
            <input required type='text' value={name} onChange={handlechange} name="name" />
            </div>
            <div>{loading && <Loading/>}</div>
            <div className='input_container'>   
            <label htmlFor='email'>Email</label>
            <input required type='email' value={email} onChange={handlechange} name="email" />
            </div>

            <div className='input_container'>
            <label htmlFor='password'>Password</label>
            <input required type='password' value={password} onChange={handlechange}  name="password" />
            </div>
{error ? <p className='errormessage'>{error}</p>:null}
          <div className='btn_container'>
            <button className='registerbutton' disabled={loading} role='button'>{loading ? 'Validating...':'Register'}</button>
            </div>  
    </form>
 </section>
  )
}

export default Register