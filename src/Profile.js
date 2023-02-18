import React from 'react'
import userimg from './images/user.png'
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from './context/auth'
import { Navigate } from 'react-router-dom';
import {getStorage,ref,getDownloadURL,uploadBytes,deleteObject} from 'firebase/storage'
import {storage,db,auth} from './firebase/firebase'
import Camera from './components/svg/Camera'
import Delete from './components/svg/Delete';
import { getDoc,doc,updateDoc } from 'firebase/firestore';

export default function Profile() {
    const { user } = useContext(AuthContext);
    const[img,setimg]=useState('');
    const [userdetails, setUser] = useState({});

    console.log(userdetails)
   
useEffect(()=>{

  


   
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
        if (docSnap.exists) {
          setUser(docSnap.data());
        }
      });

if(img){
    const uploadimg=async()=>{
        const imgref=ref(storage,`profileimg/${new Date().getTime()} - ${img.name}`)
        try {
          if (userdetails.profilepath) {
            await deleteObject(ref(storage, userdetails.profilepath));
          }
            const snap= await uploadBytes(imgref,img)
            const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db,'users',auth.currentUser.uid),{
              profile:url,
              profilepath:snap.ref.fullPath
          })
          setimg('');  
        } catch (error) {
            console.log(error.message)
        }
      
    }
    uploadimg()
}

},[img])

    console.log(img)

   if(!user){
        return(
            <Navigate to="/login"/>
        )
       
    }



const deleteImage =async()=>{
  try {
    const confirm=window.confirm('Delete Profile Image?')
    if(confirm){
      await deleteObject(ref(storage,userdetails.profilepath))
      await updateDoc(doc(db,'users',auth.currentUser.uid),{
        profile:'',
        profilepath:''
      })
    }
    
  } catch (error) {
    
  }
}

  return (
    <div>
        <section>
      <div className="profile_container">
        <div className="img_container">
          <img src={ userdetails.profile ||  userimg } alt="avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
             <Camera/>
              </label>
              {userdetails.profile ? <Delete deleteImage={deleteImage} /> : null}
              <input type='file'  accept='image/*' style={{ display: "none" }}
                id="photo" onChange={(e)=>setimg(e.target.files[0])}  />
            
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
              
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>{userdetails.name}</h3>
          <p>{userdetails.email}</p>
          <hr />
          <small>Joined on:  </small>
        </div>
      </div>
    </section>  
        
     
        
    </div>
  )
}
