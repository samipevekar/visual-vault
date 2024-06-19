import React, { useContext, useEffect} from 'react';
import Conversation from './Conversation';
import shopContext from '../../Context/ShopContext';
import ConversationSkeleton from '../skeletons/ConversationSkeleton';

export default function Conversations() {
  const { allUsers, getAllUsers, userLoading, onlineUsers } = useContext(shopContext)

  useEffect(() => {
      getAllUsers();
  }, []);

  // Function to sort users based on online status
  const sortedUsers = allUsers.slice().sort((a, b) => {
    const aIsOnline = onlineUsers.includes(a._id);
    const bIsOnline = onlineUsers.includes(b._id);
    if (aIsOnline && !bIsOnline) return -1;
    if (!aIsOnline && bIsOnline) return 1;
    return 0;
  });

  return (
    <div className='overflow-auto flex flex-col'>
      {sortedUsers && sortedUsers.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          name={conversation.name}
          profilePic={conversation.profilePic}
          lastIdx={idx === sortedUsers.length - 1}
        />
      ))}

      {userLoading && [...Array(5)].map((_, idx) => <ConversationSkeleton key={idx} />)}
    </div>
  );
}
