import { useEffect, useState } from "react";
import shopContext from "./ShopContext";
import toast from "react-hot-toast";
import io from "socket.io-client";

export default function ContextApi(props) {
  // const HOST = "https://visual-vault-indol.vercel.app";
  const HOST = "http://localhost:4000";

  const [isOpen, setIsOpen] = useState(false);
  const handle_toggle = () => {
    setIsOpen(!isOpen);
  };

  function formatDate(dateString) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    const [day, month, year] = formattedDate.split(' ');
    return `${day} ${month} ${year}`;
  }

  const [userInfo, setUserInfo] = useState({});
  const getUser = async () => {
    try {
      const response = await fetch(`${HOST}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token")
        }
      });
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      toast.error("Internal server error");
    }
  };

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

  const [imageData, setImageData] = useState([]);
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
      const data = await response.json();
      setImageData(data);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setProgress(100);
    }
  };

  const favorite_images = async () => {
    try {
      setProgress(30);
      const response = await fetch(`${HOST}/api/image/getfavoriteimage`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token")
        }
      });
      setProgress(50);
      const data = await response.json();
      setImageData(data);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setProgress(100);
    }
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    all_images();
    favorite_images();
    getUser();
  }, []);

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      const newSocket = io(HOST, {
        query: { userId: userInfo._id },
        transports: ['websocket'],
        upgrade: false
      });
      setSocket(newSocket);

      newSocket.on("connect_error", (error) => {
        console.error("Connection Error:", error);
        toast.error("Connection error");
      });

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
        setSocket(null);
      };
    }
  }, [userInfo]);

  return (
    <shopContext.Provider value={{ handle_toggle, isOpen, setIsOpen, getUser, userInfo, allUsers, imageData, all_images, setImageData, formatDate, favorite_images, progress, setProgress, HOST, getAllUsers, socket, onlineUsers, loading }}>
      {props.children}
    </shopContext.Provider>
  );
}
