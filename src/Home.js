import React from 'react'
import Users from './components/Users'
import MessageForm from './components/MessageForm'
import './home.css'
import { useEffect,useState } from 'react'
import { db,auth,storage } from './firebase/firebase'
import { collection,query,where,onSnapshot ,addDoc, Timestamp ,setDoc,doc} from 'firebase/firestore'
import {getStorage,ref,getDownloadURL,uploadBytes,deleteObject} from 'firebase/storage'
import Message from './components/Message'
import Rightmenu from './components/svg/Rightmenu'
import Allroute from './Allroute'
import { Link } from 'react-router-dom'

 function Home(){
const [users, setUsers] = useState([]);
const [getuser, selectUser] = useState([]);
const [chat, setChat] = useState("");
const [text, setText] = useState("");
const [img, setImg] = useState("");
const [msgs,setMsgs]=useState([])


useEffect(() => {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
     
    });
    return () => unsub();
  }, []);

const user1=auth.currentUser.uid
const handleSubmit=async e=>{
    e.preventDefault()
    const user2= chat.uid
    const id=user1>user2 ? `${user1+user2}`:`${user2+user1}`


    let url;
    if(img){
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }
    await addDoc(collection(db,'messages',id,'chat'),{
        text,
        from:user1,
        to:user2,
        createdAt:Timestamp.fromDate(new Date()),
        media:url || ""
    })

await setDoc(doc(db,"lastMessage",id),{
  text,
  from:user1,
  to:user2,
  createdAt:Timestamp.fromDate(new Date()),
  media:url || "",
  unread:true
})





setText('');
setImg('');
}


  return (
    <div className="home_container">
    <div className="users_container">
     
      {users.map((user) => (
        <Users
       
       
        msgs={msgs}
        setMsgs={setMsgs}
       
          key={user.uid}
          users={user}
          selectUser={selectUser}
          setChat={setChat}
          user1={user1}
          chat={chat}
        />
      ))}
    </div>
    <div className="messages_container">


        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
             
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
      
         <MessageForm handleSubmit={handleSubmit}  setImg={setImg} setText={setText} text={text}  />
          </>
        ) : (
            <>
            <h3 className="no_conv">Select a user to start conversation</h3>
          
           
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
            </>
            
          
        )}


      </div>
  </div>
  )
}
export default Home;