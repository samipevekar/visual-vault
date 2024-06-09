import { useEffect, useState } from "react";
import shopContext from "./ShopContext";
import toast from "react-hot-toast";
import io from "socket.io-client";
import useConversation from "../zustand/userConversation";

export default function ContextApi(props) {

  const HOST = "https://visual-vault-backend.onrender.com";
  // const HOST = "http://localhost:4000";

  const [isOpen, setIsOpen] = useState(false);     // to handle user info menu
  const handle_toggle = () => setIsOpen(!isOpen);  

  function formatDate(dateString) {                 // convert date into given format
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    const [day, month, year] = formattedDate.split(' ');
    return `${day} ${month} ${year}`;
  }




  // api to get login user info
  const [userInfo, setUserInfo] = useState({});
  const getUser = async () => {
    try {
      const response = await fetch(`${HOST}/api/auth/getuser`, {
        method: "GET",
        headers: { "auth-token": localStorage.getItem("auth-token") }
      });
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      toast.error("Internal server error");
    }
  };



  // api to get all users
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${HOST}/api/auth/allusers`, {
        method: "GET",
        headers: { "auth-token": localStorage.getItem("auth-token") }
      });
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };


  // api to get all images
  const [imageData, setImageData] = useState([]);
  const all_images = async () => {
    try {
      setProgress(30);
      setLoading(true);
      const response = await fetch(`${HOST}/api/image/getallimages`, {
        method: "GET",
        headers: { "auth-token": localStorage.getItem("auth-token") }
      });
      setProgress(50);
      const data = await response.json();
      setImageData(data);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

  // api to get favorite images
  const favorite_images = async () => {
    try {
      setProgress(30);
      setLoading(true);
      const response = await fetch(`${HOST}/api/image/getfavoriteimage`, {
        method: "GET",
        headers: { "auth-token": localStorage.getItem("auth-token") }
      });
      setProgress(50);
      const data = await response.json();
      setImageData(data);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

  const [progress, setProgress] = useState(0);  // state to manage react top loading bar

  useEffect(() => {
    all_images();
    favorite_images();
    getUser();
    getMessages();
  }, []);

  // socket code here
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      const newSocket = io(HOST, {
        query: { userId: userInfo._id },
        transports: ['websocket', 'polling'],
      });

      newSocket.on('connect', () => {
        console.log('WebSocket connected');
      });

      newSocket.on('error', (error) => {
        console.error('WebSocket Error:', error.message);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Connection Error:", error);
        toast.error("Connection error");
      });

      newSocket.on('disconnect', (reason) => {
        console.log('WebSocket disconnected:', reason);
        if (reason === 'io server disconnect') {
          newSocket.connect();
        }
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
        setSocket(null);
      };
    }
  }, [userInfo]);


  // api to get all messages
  const { setMessages, selectedConversation } = useConversation();

  const getMessages = async () => {
    if(selectedConversation){
      setLoading(true);
    const response = await fetch(`${HOST}/api/messages/${selectedConversation._id}`, {
      method: "GET",
    headers: { "auth-token": localStorage.getItem("auth-token") }
  });
const data = await response.json();
setMessages(data);
setLoading(false);
};

}
  return (
    <shopContext.Provider value={{
      handle_toggle,
      isOpen,
      setIsOpen,
      getUser,
      userInfo,
      allUsers,
      imageData,
      all_images,
      setImageData,
      formatDate,
      favorite_images,
      progress,
      setProgress,
      HOST,
      getAllUsers,
      socket,
      onlineUsers,
      loading,
      getMessages
    }}>
      {props.children}
    </shopContext.Provider>
  );
}
