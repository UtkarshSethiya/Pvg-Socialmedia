

import React, { useContext } from "react";
import { AuthContext } from './context/auth';
import {doc,updateDoc } from 'firebase/firestore';
import { addDoc,setDoc,Timestamp,collection,query,where,getDocs } from 'firebase/firestore';
import { auth } from './firebase/firebase';
import { db } from './firebase/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword,signInWithPopup ,GoogleAuthProvider,sendEmailVerification, sendSignInLinkToEmail} from 'firebase/auth';
import { Link } from 'react-router-dom';
import Loading from './components/Loading';
function Login() {

    const[result,setresult]=useState([]);
    const provider=new GoogleAuthProvider()
  
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users",user.uid), {
        uid: user.uid,
        name: user.displayName,
        profile:user.photoURL,
        isOnline:true,
        
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  history('/home')
};

/*const signinwithgoogle=async()=>{
    try{
        await signInWithPopup(auth,provider).then((data)=>{
            setresult(data)
             
         })
         await setDoc(doc(db,"users",result.user.uid),{
            uid:result.user.uid,
            name:result.user.displayName,
            email,
            createdAt:Timestamp.fromDate(new Date()),
            isOnline:true,
        }
       
        )
    }catch (error) {
        console.log(error.message)
    }
   
    
}*/

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
        console.log(result)
        await updateDoc(doc(db,"users",result.user.uid),{
           
            isOnline:true,
        })
        console.log(result.user.emailVerified)
       
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
            <input placeholder='Enter Your Email' type='email' value={email} onChange={handlechange} name="email" />
            </div>
<div>{loading && <Loading/>}</div>
            <div className='input_container'>
            <label htmlFor='password'>Password</label>
            <input placeholder='Enter Your Password' type='password' value={password} onChange={handlechange}  name="password" />
            </div>
{error ? <p className='errormessage'>{error}</p>:null}
          <div className='btn_container'>
            <button className='registerbutton' disabled={loading} role='button'>{loading ? 'Pease wait..':'Login'}</button>
           
            </div>
            <br/>
            <br/>
            
          
    </form>
    <div style={{textAlign:"center",display:"flex",justifyContent:"space-around",verticalAlign:"center"}}><Link style={{color:"blue",fontSize:"14px"}} to='/Forgetpassword'>Forget Password?</Link> <button onClick={signInWithGoogle} className="google">Sign in with google</button> </div>
   
 </section>
  )
}

export default Login;