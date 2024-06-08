import React, { useContext, useEffect, useState } from 'react'
import useConversation from '../../zustand/userConversation'
import shopContext from '../../Context/ShopContext'
import user2 from '../assets/user2.png'

export default function Conversation({ conversation, lastIdx }) {

    const { selectedConversation, setSelectedConversation, messages } = useConversation()


    const isSelected = selectedConversation?._id === conversation._id

    const { onlineUsers, HOST, userInfo } = useContext(shopContext)
    const isOnline = onlineUsers.includes(conversation._id)



    // get latest message 
    const [latestMessage, setLatestMessage] = useState([])

    const getlatestMessage = async () => {
        let response = await fetch(`${HOST}/api/messages/latestmessage/${conversation._id}`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        })
        let data = await response.json()
        setLatestMessage(data)
    }
    useEffect(() => {
        getlatestMessage()
    }, [latestMessage])

    const fromMe = latestMessage.senderId === userInfo?._id

    return (
        <>
            <div className={`flex p-2 items-center gap-3 hover:bg-red-500 rounded cursor-pointer ${isSelected ? " bg-red-500" : ""}`} onClick={() => setSelectedConversation(conversation)}>
                <div className={`avatar ${isOnline ? 'online' : ''} `}>
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
                    <div className={`text-[12px] ${isSelected ? 'text-black' : 'text-gray-500'}`}>{fromMe && 'You: '}{latestMessage.message && latestMessage.message.length > 12
    ? latestMessage.message.substring(0, 12) + '...' 
    : latestMessage.message}</div>
                </div>

            </div>
            {!lastIdx && <div className='divider my-0 py-0 h-1 ' />}
        </>
    )
}
