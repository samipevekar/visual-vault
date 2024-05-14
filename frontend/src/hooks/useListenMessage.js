import { useContext, useEffect } from "react"
import useConversation from "../zustand/userConversation"
import shopContext from "../Context/ShopContext"

const useListenMessage = ()=>{
    const {socket} = useContext(shopContext)
    const {messages,setMessages} = useConversation()

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            setMessages([...messages,newMessage])
        })

        return ()=> socket?.off("newMessage")
    },[socket,setMessages,messages])
}



export default useListenMessage