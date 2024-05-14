import React, { useContext, useState } from 'react';
import { BsSend } from 'react-icons/bs';
import shopContext from '../../Context/ShopContext';
import useConversation from '../../zustand/userConversation';
import toast from "react-hot-toast"

export default function MessageInput() {
  const [message, setMessage] = useState('');
  const [loading,setLoading] = useState(false)

  const { selectedConversation , messages,setMessages} = useConversation();
  const { HOST } = useContext(shopContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    try {
      setLoading(true)
      const response = await fetch(`${HOST}/api/messages/send/${selectedConversation._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({ message }), // Sending message content in the request body
      });

      if (response.ok) {
        // Handle success
        const data = await response.json()
        setMessages([...messages, data]);
        setMessage(''); // Clear input field after sending message
        setLoading(false)
      } else {
        // Handle error
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error occurred while sending message:', error);
    }
  };


  return (
    <>
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            className="border-gray-500 border-2 text-sm rounded-lg block w-full p-2.5 text-black"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="absolute inset-y-0 end-0 flex items-center bg-transparent text-black pe-3">
           { loading ? <div className='loading loading-spinner'></div> : <BsSend/>}
          </button>
        </div>
      </form>
    </>
  );
}
