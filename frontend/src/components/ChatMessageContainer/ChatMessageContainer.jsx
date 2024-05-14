import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from 'react-icons/ti'
import { FaArrowLeft } from "react-icons/fa";
import useConversation from '../../zustand/userConversation'
import './ChatMessageContainer.css'

export default function ChatMessageContainer() {

  const {selectedConversation,setSelectedConversation} = useConversation();
  
  return (
    <div className={`min-w-[400px] max-w-[650px] bg-slate-50 messageContainer ${selectedConversation ? 'z-10' : ''}`}>
       {!selectedConversation ? (<NoChatSelected/>) :
        (<><div className=' px-4 py-2 mb-2 flex items-center border-b-2  ' >
                <FaArrowLeft className='cursor-pointer text-black' onClick={()=>setSelectedConversation(null)} />
                <img src={selectedConversation.profilePic} className='w-8 h-8 ml-4 border-black border-1 rounded-full' alt="" />
                <span className='text-black font-bold mx-2 '>{selectedConversation.name}</span>{" "}
        </div>
        <Messages/>
        <MessageInput/></>)
        }
    </div>
  )
}


const NoChatSelected = ()=>{
  return(
    <div className='flex items-center justify-center flex-col h-[550px] gap-3 text-black no-chat-selected'>
      <h5 className='text-[25px] font-[500]'>Welcome 👋 sami pevekar 🧑‍🎓</h5>
      <h4 className='text-[20px] font-[500]'>Select a chat to start message</h4>
      <TiMessages className='text-3xl md:text-6xl text-center'/>

    </div>
  )
}
