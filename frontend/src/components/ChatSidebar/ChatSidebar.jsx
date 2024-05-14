import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import './ChatSidebar.css'

export default function ChatSidebar() {
  return (
    <div className=' bg-slate-50 max-w-[400px] min-w-[250px]   p-4 flex flex-col chat-sidebar '>
      <SearchInput/>
      <Conversations/> 
    </div>
  )
}
