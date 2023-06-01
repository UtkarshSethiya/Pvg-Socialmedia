import React, { useState ,useEffect} from 'react'
import img from '../images/user.png'
import './Users.css'
import { collection,query,orderBy,onSnapshot,doc, getDoc, updateDoc} from 'firebase/firestore'
import { db } from '../firebase/firebase'


function Users({users,selectUser,setChat,user1,setMsgs,msgs,chat}) {





const chathandler=async()=>{
    selectUser(users)
    setChat(users)
    const user2= users.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));
    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
    console.log(msgs)
   const docSnap= await getDoc(doc(db,'lastMessage',id))
   if(docSnap.data.from!==user1){
    await updateDoc(doc(db,'lastMessage',id),{
      unread:false
    })
   }
}

const user2=users?.uid
const[data,setdata]=useState('')

useEffect(()=>{
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  let unsub=onSnapshot(doc(db,"lastMessage",id),(doc)=>{
    setdata(doc.data())
  })
 
  return()=>unsub()

},[])

  return (
   
    <div className={`user_wrapper ${chat.name === users.name && "selected_user"}`} onClick={chathandler}>
    
        <div className='user_info'>
<div className='user_detail'>
  <div>
  <img src={users.profile || img} className='profileimage'  />
  </div> 
    
 <div >
      <div  className='username'>{users.name}</div> 

    <div  className='lastmessage_wrapper'>
    {data && (
          <div className="truncate">
            <strong>{data.from === user1 ? " Me: " : null}</strong>
            {data.text}
          </div>
        )}
      </div>

      </div>
     
    {data?.from !== user1 && data?.unread && (
              <small className="unread">New</small>
            )}
</div>
<div className={`user_status ${users.isOnline ? "online" : "offline"}`}></div>
        </div>
       
    </div>
    
  )
}

export default Users