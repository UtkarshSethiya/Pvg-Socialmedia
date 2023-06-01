import React from 'react'
import userimage from '../svg/user.png'
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { getDoc,doc,updateDoc } from 'firebase/firestore';
import { db,auth,storage } from '../../firebase/firebase';
import { collection,query,where,onSnapshot ,addDoc, Timestamp,setDoc,getDocs,orderBy } from 'firebase/firestore'
import {ref,getDownloadURL,uploadBytes,deleteObject} from 'firebase/storage'
import Imagepost from '../svg/Imagepost';
import {  deleteDoc } from "firebase/firestore";
import File from '../svg/File';
import './post.css'
import { async } from '@firebase/util';
import Like from '../svg/Like';
import Comment from './Comment';
import BasicMenu from './Menu';

export default function MyPost() {
const[post,setPost]=useState([])
const[id,setId]=useState([])
const[postid,setPostid]=useState([])
const myuser=auth.currentUser.uid

console.log(postid.toString())


useEffect(()=>{
    const q = query(collection(db, "Post"),orderBy('createdAt','desc'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      setPost( querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
     
    });
    
    
    },[])

    const deletepost=async()=>{
    
      await deleteDoc(doc(db, "Post",postid.toString()) ) 
      
     
    }
 



return (
  <div className='mypostcont'> <div></div>
    <div className='card_wrapper '>
       <h3 style={{textAlign:"center",color:"grey"}}>My Posts</h3>
    {post.map((doc)=>{
      console.log(doc)
        if(doc==null){
          return(
            <>No Post Yet</>
          )
        }
        if(doc.media!=" "){
          var imgpost
          imgpost=<img  className='postimage' src={doc.media}></img>
        }
        
        if(doc.postuid===auth.currentUser.uid){
 return(
<div className='card_cont ' key={doc.id}>
<div style={{margin:"10px",textAlign:"end"}}><button onClick={()=>{deletepost();setPostid(doc.id)}} className='deletebutton'>Delete</button></div>
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
        }
    })}


    </div>
    <div></div>
    </div>
  )
}
