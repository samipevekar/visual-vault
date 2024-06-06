import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import useConversation from '../../zustand/userConversation';
import shopContext from "../../Context/ShopContext"
import useListenMessage from '../../hooks/useListenMessage';
import MessageSkeleton from '../skeletons/MessageSkeleton';

export default function Messages() {

  const {messages,setMessages,selectedConversation} = useConversation()
  const [loading,setLoading] = useState(false)
  const {getMessages} = useContext(shopContext)

  const messagesContainerRef = useRef(null);

  useListenMessage()

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  };
  

  useEffect(()=>{
    if(selectedConversation?._id){
      getMessages()

    }
  },[selectedConversation?._id,setMessages])

  useEffect(scrollToBottom, [messages]);


  return (
    <div  className='px-4 flex-1 overflow-auto h-[430px]' ref={messagesContainerRef}>
      {messages.map((messages)=>{
        return  <div key={messages._id}>
                  <Message messages={messages} />
                </div>
      })}

      {loading && [...Array(3)].map((_,idx)=><MessageSkeleton  key={idx} />) }

{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}

    </div>
  )
}
