import React from 'react'
import Moment from 'react-moment'
import { useRef,useEffect } from 'react'

export default function Message({msg,user1,key}) {
    console.log(user1)

const scrollRef=useRef()
useEffect(()=>{
scrollRef.current.scrollIntoView({behavior:"smooth"})
},[msg])



    return (
        <div className={`message_wrapper ${msg.from === user1 ? "own" : ""}`} ref={scrollRef}>
            <p className={msg.from === user1 ? "me" : "friend"}>
                {msg.media ? <img src={msg.media} alt={msg.text}  />:null}
            {msg.text}
           <div>
           <small>
                <Moment fromNow>
                    {msg.createdAt.toDate()}
                </Moment>
            </small>
           </div>
            
            </p>
            </div>
      )
}
