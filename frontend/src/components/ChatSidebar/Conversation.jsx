import React, { useContext } from 'react'
import useConversation from '../../zustand/userConversation'
import shopContext from '../../Context/ShopContext'
import user2 from '../assets/user2.png'

export default function Conversation({conversation,lastIdx}) {

    const {selectedConversation,setSelectedConversation} = useConversation()

    const isSelected = selectedConversation?._id === conversation._id

    const {onlineUsers} = useContext(shopContext)
    const isOnline = onlineUsers.includes(conversation._id)





  return (
    <>
    <div className={`flex p-2 items-center gap-3 hover:bg-red-500 rounded cursor-pointer ${isSelected ? " bg-red-500" : ""}`} onClick={()=> setSelectedConversation(conversation)}>
        <div className={`avatar ${isOnline ? 'online':''} `}>
            <div className="w-12 rounded-full">
                <img src={conversation.profilePic} onError={(e) => {
                e.target.src = user2;
            }} />
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className={`font-bold  ${isSelected ? "text-white" : "text-black"}`}>{conversation.name}</p>
            </div>
        </div>
        
    </div>
    {!lastIdx && <div className='divider my-0 py-0 h-1 '/>}
    </>
  )
}
