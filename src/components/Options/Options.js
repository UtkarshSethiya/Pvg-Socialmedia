import React from 'react'
import './options.css'
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { getDoc,doc,updateDoc } from 'firebase/firestore';
import { db,auth,storage } from '../../firebase/firebase';
import userimg from '../svg/user.png'
import Query from './Query';
import { Link } from 'react-router-dom';

export default function Options() {

  const[user,setUser]=useState('')
  const[query,setQuery]=useState(true);
 
console.log(user)

useEffect(()=>{
  getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
},[])

console.log(user)
  return (
    <div className='option_container'>



      <div className='profileoption'>
      <div className="prof_img_container">  <img src={ user.profile ||  userimg } alt="avatar" /></div>
       <div>
        <div className='prof_name'>{user.name}</div>
        <div className='prof_info'>Designation: Student</div>
        <div className='prof_info'>Class: BE Computer</div>
        <div className='prof_info'>Email: dummy_mail@gmail.com</div>
        
        </div> 
      </div>
    
         <br/>

        
        <div className='option_wrappers '><Query user={user} /></div>
        <div className='option_wrappers '><button className='feedback btn'>Feedback / Support</button></div>
       
        <div className='option_wrappers '><button className='messenger btn'>Messenger</button></div>
        <div className='option_wrappers '><button  className='my_users btn'> My Users</button></div>

    </div>
  )
}
