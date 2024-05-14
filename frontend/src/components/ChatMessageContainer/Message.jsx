import React, { useContext, useEffect } from 'react'
import shopContext from '../../Context/ShopContext'
import useConversation from '../../zustand/userConversation'
import { extractTime } from '../../utils/extracttime'

export default function Message({messages}) {

  const {getUser,userInfo} = useContext(shopContext)
  const {selectedConversation} = useConversation()

  const fromMe = userInfo._id === messages.senderId;
  const profilePic = fromMe ? userInfo.profilePic : selectedConversation.profilePic
  const formattedTime = extractTime(messages.createdAt)

  useEffect(()=>{
    getUser()
  },[])


  return (
    <>
    <div className={`chat  ${fromMe ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-7 h-7 rounded-full">
          <img alt="Tailwind CSS chat bubble component"  src={profilePic} />
        </div>
      </div>
    <div className={`chat-bubble ${fromMe? 'bg-red-500 text-white':'bg-gray-300 text-black'}`}>{messages.message}</div>
    <div className='text-[12px] chat-footer opacity-50 text-black flex gap-1 items-center pb-2' >{formattedTime}</div>
  </div>
    </>
  )
}
