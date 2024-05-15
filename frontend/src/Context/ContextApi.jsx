import { useEffect, useState } from "react";
import shopContext from "./ShopContext";
import toast from "react-hot-toast";
import io from "socket.io-client"



export default function ContextApi(props) {

  // const HOST = "http://localhost:4000" 
  const HOST = "https://visual-vault-indol.vercel.app" 

    // creating sidebar with toggle button
    const [isOpen,setIsOpen] = useState(false)  
    const handle_toggle = ()=>{
        setIsOpen(!isOpen)
    }

    // Function to get data in date/day/year format
    function formatDate(dateString) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
      
      // Split the formatted date by comma to separate day, month, and year
      const [day, month, year] = formattedDate.split(' ');
  
      // Return the formatted date in the desired format: day-month-year
      return `${day} ${month} ${year}`;
  }
  



      // API to get userInfo      
      const[userInfo,setUserInfo] = useState([]) // Getting userInfo 
      const getUser = async()=>{
      try {
        const response = await fetch(`${HOST}/api/auth/getuser`,{
          method:"GET",
          headers:{
            "auth-token":localStorage.getItem("auth-token")
          }
        })
        let data = await response.json()
        setUserInfo(data)
  
      }
        
       catch (error) {
        toast.error("Internal server error")
      }
    }


    // Api to get all users
    const [allUsers,setAllUsers] = useState([])
    const [loading,setLoading] = useState(false)
    const getAllUsers = async() => {
      setLoading(true)
      try {
        const response = await fetch(`${HOST}/api/auth/allusers`,{
          method:"GET",
          headers:{
            "auth-token":localStorage.getItem("auth-token")
          }
    
        })
        const data = await response.json()
        setAllUsers(data)
        setLoading(false)
        
      } catch (error) {
        toast.error("Internal server error")
      }

  }


    //to get all image data
    const [imageData,setImageData] = useState([])  


    //API to get all images
    const all_images = async()=>{
      
      try {
        setProgress(30)
        const response = await fetch(`${HOST}/api/image/getallimages`,{
          method:"GET",
          headers:{
            "auth-token":localStorage.getItem("auth-token")
          }
        })
        setProgress(50)
        let data = await response.json()
        setImageData(data)
        
      } catch (error) {
        toast.error("Internal server error")
      }

        setProgress(100)

    }

    // API to get all favorite images   
     const favorite_images = async()=>{
      try {
        setProgress(30)
        let response = await fetch(`${HOST}/api/image/getfavoriteimage`,{
          method:"GET",
          headers:{
            "auth-token":localStorage.getItem("auth-token")
           }
         })
         setProgress(50)
         let data = await response.json()
         setImageData(data)
        
      } catch (error) {
        toast.error("Internal server error")
      }
      setProgress(100)
    }

    // Creating top loading bar
    const [progress,setProgress] = useState(0)


    // Calling API functions
    useEffect(()=>{
      all_images()
      favorite_images()
      getUser()
    },[])



    // socket code here    
    const [socket, setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])



    useEffect(()=>{
        if(userInfo){
            const socket = io(`${HOST}`,{
                query:{
                    userId:userInfo._id
                }
            })
            setSocket(socket)

            // socket.on() is used to listen to the events. can be used both on lcient and server side io

            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users)
            })
            
            return ()=>socket.close()
        }
        else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[userInfo])

    


    return (
      <shopContext.Provider value={{handle_toggle,isOpen,setIsOpen,getUser,userInfo,allUsers,imageData,all_images,setImageData,formatDate,favorite_images,alert,progress,setProgress,HOST,getAllUsers,socket,onlineUsers,loading }}>
        {props.children}
    </shopContext.Provider>
  )
}
