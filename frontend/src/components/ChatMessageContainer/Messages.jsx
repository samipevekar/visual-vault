import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import useConversation from '../../zustand/userConversation';
import shopContext from "../../Context/ShopContext"
import useListenMessage from '../../hooks/useListenMessage';
import MessageSkeleton from '../skeletons/MessageSkeleton';

export default function Messages() {
  const { messages, setMessages, selectedConversation} = useConversation();
  const { getMessages, userInfo,markMessagesAsSeen, msgLoading  } = useContext(shopContext);
  const messagesContainerRef = useRef(null);

  useListenMessage();

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Fetch messages when the selected conversation changes
  useEffect(() => {
    if (selectedConversation._id) {
      getMessages();
    }
  }, [selectedConversation._id,setMessages]);

  // Scroll to bottom when messages change
  useEffect(scrollToBottom, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto h-[430px]' ref={messagesContainerRef}>
      {messages.map((message) => (
        <div key={message._id}>
          <Message message={message} />
        </div>
      ))}

      {msgLoading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!msgLoading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
}