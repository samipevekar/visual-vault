import React, { useContext, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/userConversation';
import shopContext from '../../Context/ShopContext';
import toast from 'react-hot-toast';
export default function SearchInput() {

  const [search,setSearch] = useState("")
  const {setSelectedConversation} = useConversation()
  const {allUsers} = useContext(shopContext)

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!search) return;
    if(search.length < 3){
      return toast.error("search term must be at least 3 characters long")
    }

    const conversation = allUsers.find((c)=>c.name.toLowerCase().includes(search.toLocaleLowerCase()))

    if(conversation){
      setSelectedConversation(conversation)
      setSearch("")
    }else{
      toast.error("no such user found")
    }
  }

  return (
    <>
    <form className='flex pb-4' onSubmit={handleSubmit}>
      <input type="text" placeholder="Type here" value={search} onChange={(e)=>setSearch(e.target.value)} className=" input input-bordered rounded-full w-full " />
        <button type='submit' className='btn btn-circle  btn-error text-white mx-1'>
            <IoSearchSharp className='w-6 h-6 outline-none ' />
        </button>
    </form>
    <div className='divider my-0 py-0 h-1 '/>
    </>
  )
}
