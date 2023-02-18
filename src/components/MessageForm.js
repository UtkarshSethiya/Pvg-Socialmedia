import React from 'react'
import Attachment from './svg/Attachment'

import './Message.css'


const MessageForm = ({handleSubmit,text,setText,setImg}) => {
  return (
    <form className='message_form' onSubmit={handleSubmit}>
      
        <label htmlFor='img'>
            <Attachment/>
        </label>
        <input type='file' id="img" accept="image/*" onChange={(e)=>setImg(e.target.files[0])} style={{display:'none'}}  />
        <input type='text' placeholder='Send Message' required value={text} onChange={(e)=>setText(e.target.value)}  />
        <button className='bn632-hover bn24'>Send</button>
       
    </form>
  )
}

export default MessageForm