import React, { useContext, useEffect, useState, useRef } from 'react';
import shopContext from '../../Context/ShopContext';
import useConversation from '../../zustand/userConversation';
import { extractTime } from '../../utils/extracttime';
import { IoIosCopy } from "react-icons/io";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import toast from 'react-hot-toast';
import dots_icon from '../assets/dots.png';
import user1 from '../assets/user1.png';
import user2 from '../assets/user2.png';

export default function Message({ messages }) {
  const [isOpen, setIsOpen] = useState(false);
  const contextMenuRef = useRef(null);

  const { getUser, userInfo, HOST, getMessages, socket } = useContext(shopContext);
  const { selectedConversation } = useConversation();

  const fromMe = userInfo?._id === messages.senderId;
  const profilePic = fromMe ? userInfo?.profilePic : selectedConversation?.profilePic;
  const formattedTime = extractTime(messages.createdAt);

  // useEffect() to fetch user info
  useEffect(() => {
    getUser();
  }, []);

  // function to handle outside click of contextmenu
  useEffect(() => {
    function handleClickOutside(event) {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenuRef]);

  // useEffect() to listen delete messages
  useEffect(() => {
    if (socket) {
      socket.on('deleteMessage', (messageId) => {
        getMessages();
      });


      return () => {
        socket.off('deleteMessage');
      };
    }
  }, [socket, getMessages, messages]);

  // function to copy messages
  const handleCopyClick = () => {
    navigator.clipboard.writeText(messages.message).then(() => {
      toast.success('Message copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
    setIsOpen(false);
  };

  // function to handle delete from everyone api
  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`${HOST}/api/messages/deletemessages/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("auth-token")
        }
      });
      const data = await response.json();
    } catch (err) {
      console.error('Error:', err);
    }
    setIsOpen(false);
  };
  
  // function to handle delete from me messages
  const handleDeleteForMeClick = async (id) => {
    try {
      const response = await fetch(`${HOST}/api/messages/deleteforuser/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("auth-token")
        }
      });
      const data = await response.json();
    } catch (err) {
      console.error('Error:', err);
    }
    setIsOpen(false);
  };

  // Emit seen event for incoming messages
  useEffect(() => {
    if (!fromMe && socket) {
      socket.emit('messageSeen', { messageId: messages._id, userId: userInfo._id });
    }
  }, []);

  return (
    <div className={`chat ${fromMe ? 'chat-end' : 'chat-start'} relative group`}>
      <div className="chat-image avatar">
        <div className="w-7 h-7 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} onError={(e)=>e.target.src = fromMe ? user1 : user2} />
        </div>
      </div>

      <div onContextMenu={(e)=>e.preventDefault()} className={`chat-bubble break-words ${fromMe ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}>
        {messages.message}
      </div>

      <div className='text-[12px] chat-footer opacity-50 text-black flex gap-1 items-center pb-2'>
        {formattedTime}
        {fromMe && messages.seenBy?.includes(selectedConversation?._id) && <span>(Seen)</span>}
      </div>

      <span
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden group-hover:block absolute bottom-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${fromMe ? 'left-3' : 'right-3'}`}>
        <img src={dots_icon} className='w-4 h-4' alt="" />
      </span>

      {isOpen && (
        <div
          ref={contextMenuRef}
          className={`absolute top-20 z-10 transform -translate-y-1/2 w-24 bg-white border rounded ${
            fromMe ? 'left-12' : 'right-12'
          }`}
        >
          <div onClick={handleCopyClick} className='p-2 flex items-center justify-between gap-1 cursor-pointer hover:bg-gray-100'>Copy <span><IoIosCopy /></span></div>

          {fromMe && <hr className='m-1' />}
          {!fromMe && <hr className='m-1' />}

          <div onClick={() => handleDeleteForMeClick(messages._id)} className='p-2 cursor-pointer flex items-center justify-between gap-1 hover:bg-gray-100'>Delete<span><RiDeleteBin2Fill className='text-red-500' /></span></div>

          {fromMe && <hr className='m-1' />}

          {fromMe && <div onClick={() => handleDeleteClick(messages._id)} className='p-2 cursor-pointer flex items-center justify-between gap-1 hover:bg-gray-100'>Unsend<span><TiDelete className='text-red-500' /></span></div>}
        </div>
      )}
    </div>
  );
}
