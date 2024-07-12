import React from 'react'
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar'
import ChatMessageContainer from '../../components/ChatMessageContainer/ChatMessageContainer'

export default function Chats() {
  return (
    <div className='flex m-2 h-[550px] z-0' >
      <ChatSidebar/>
      <ChatMessageContainer/>
    </div>
  )
}
