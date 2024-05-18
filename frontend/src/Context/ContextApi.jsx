import { useEffect, useState } from "react";
import shopContext from "./ShopContext";
import toast from "react-hot-toast";
import io from "socket.io-client";

export default function ContextApi(props) {
  // const HOST = "http://localhost:4000"; 
  const HOST = "https://visual-vault-indol.vercel.app";

  // Creating sidebar with toggle button
  const [isOpen, setIsOpen] = useState(false);  
  const handle_toggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to get data in date/day/year format
  function formatDate(dateString) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    const [day, month, year] = formattedDate.split(' ');
    return `${day} ${month} ${year}`;
  }

  // API to get userInfo      
  const [userInfo, setUserInfo] = useState([]); // Getting userInfo 
  const getUser = async () => {
    try {
      const response = await fetch(`${HOST}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token")
        }
      });
      let data = await response.json();
      setUserInfo(data);
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  // API to get all users
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${HOST}/api/auth/allusers`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token")
        }
      });
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  // To get all image data
  const [imageData, setImageData] = useState([]);  

  // API to get all images
  const all_images = async () => {
    try {
      setProgress(30);
      const response = await fetch(`${HOST}/api/image/getallimages`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token")
        }
      });
      setProgress(50);
      let data = await response.json();
      setImageData(data);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setProgress(100);
    }
  };

  // API to get all favorite images   
  const favorite_images = async () => {
    try {
      setProgress(30);
      let response = await fetch(`${HOST}/api/image/getfavoriteimage`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token")
        }
      });
      setProgress(50);
      let data = await response.json();
      setImageData(data);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setProgress(100);
    }
  };

  // Creating top loading bar
  const [progress, setProgress] = useState(0);

  // Calling API functions
  useEffect(() => {
    all_images();
    favorite_images();
    getUser();
  }, []);

  // Socket code here    
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      const newSocket = io(HOST, {
        query: { userId: userInfo._id }
      });
      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });


      return () => {
        newSocket.close();
        setSocket(null)
      };
    }
  }, [userInfo]);

  return (
    <shopContext.Provider value={{ handle_toggle, isOpen, setIsOpen, getUser, userInfo, allUsers, imageData, all_images, setImageData, formatDate, favorite_images, alert, progress, setProgress, HOST, getAllUsers, socket, onlineUsers, loading }}>
      {props.children}
    </shopContext.Provider>
  );
}
