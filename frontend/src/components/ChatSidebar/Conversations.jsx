import React, { useContext, useEffect } from 'react'
import Conversation from './Conversation'
import shopContext from '../../Context/ShopContext'
import ConversationSkeleton from '../skeletons/ConversationSkeleton'

export default function Conversations() {
  const {allUsers,getAllUsers,loading} = useContext(shopContext)

  useEffect(()=>{
    getAllUsers()
  },[])

  return (
    <div className='overflow-auto flex flex-col ' >
      {allUsers && allUsers.map((conversation,idx)=>{
        return <Conversation key={conversation._id} conversation={conversation} name={conversation.name} profilePic={conversation.profilePic} lastIdx={idx === allUsers.length - 1} />
      })}

      {loading && [...Array(5)].map((_,idx)=> <ConversationSkeleton key={idx} />) }
    </div>
  )
}
