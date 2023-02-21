import React from 'react'
import userimage from '../svg/user.png'
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { getDoc,doc,updateDoc } from 'firebase/firestore';
import { db,auth,storage } from '../../firebase/firebase';
import { collection,query,where,onSnapshot ,addDoc, Timestamp,setDoc,getDocs,orderBy } from 'firebase/firestore'
import {ref,getDownloadURL,uploadBytes,deleteObject} from 'firebase/storage'
import Imagepost from '../svg/Imagepost';
import File from '../svg/File';
import './post.css'
import { async } from '@firebase/util';
import Like from '../svg/Like';
import Comment from './Comment';
import BasicMenu from './Menu';

export default function Postmapping() {
const[post,setPost]=useState([])
const[id,setId]=useState([])
const[postid,setPostid]=useState([])

console.log(post)


useEffect(()=>{
    const q = query(collection(db, "Post"),orderBy('createdAt','desc'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      setPost( querySnapshot.docs.map(doc => doc.data()));
     
    });
    
    
    },[])

    
 



return (
    <div className='card_wrapper'>
       
    {post.map((doc)=>{
        console.log(doc)
        if(doc.media!=" "){
          var imgpost
          imgpost=<img  className='postimage' src={doc.media}></img>
        }
        
 return(
<div className='card_cont' key={doc.id}>

           <div className='card_info'>
            
            <div className='user_info'>
           <img src={doc.profile } className='profileimage'  />
           <span className='postedby_name' style={{marginLeft:'5px'}}>{doc.postedBy} </span>
            </div>
           <span className='post_time'>{doc.createdAt.toDate().toDateString()}</span>
           </div>

           <div className='postcontent'>
              <p className='post_text' style={{textAlign:'left'}}>
               {doc.postcontent}
              </p>
           </div>

           <div >
            
         {imgpost}
           </div>
           <span> <Comment postid={doc.postid}  />  </span>  
         
        </div>


 )
    })}

 
    </div>
  )
}
