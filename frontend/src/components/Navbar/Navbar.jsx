import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import gallery_logo from '../assets/gallery_logo.png'
import user1 from '../assets/user1.png'
import user from '../assets/userinfo.png'
import hamburger_logo from '../assets/hamburger.png'
import shopContext from '../../Context/ShopContext'
import './Navbar.css'


export default function Navbar() {


  const contextMenuRef = useRef(null);   
  
  // To handle contextMenu outside click
  useEffect(() => {                                      
    function handleClickOutside(event) {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenuRef]);


  
  // handling sidebar menu click
  const context = useContext(shopContext)
  const {handle_toggle,setIsOpen,userInfo,getUser,isOpen} = context
  
  // handling logout 
  const logoutHandle = ()=>{
    localStorage.removeItem("auth-token")
    setIsOpen(false)
    window.location.href="/signup"
  }

 //handle dropdowan toggle
 const[isDropdownOpen,setIsDropdownOpen] = useState(false)

 const handle_dropdown = ()=>{
      setIsDropdownOpen(!isDropdownOpen)
      
 }

  useEffect(()=>{
      getUser()
    // eslint-disable-next-line
  },[])


  return (
    <>
      <nav className="navbar z-1 sticky-top navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    {localStorage.getItem("auth-token")?<img src={hamburger_logo} className={isOpen?'hamburger hamOpen':"hamburger"} onClick={handle_toggle}  alt="" />:<></>}
    <div className="logo">
      <img src={gallery_logo} id='logo' alt="" />
      <p>Visual Vault</p>
    </div>

    {/* If user is not Logged In then shows 'Home' button */}
    {localStorage.getItem("auth-token")?<></>:<ul className=" navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft:'20px'}}>
      <li className="nav-item" >
            <Link className="nav-link text-black " to="/" >Home</Link>
      </li>

    </ul>}


      {/* user information  */}
    <div ref={contextMenuRef} className="userLogo" onClick={handle_dropdown}>
      <img src={userInfo.profilePic} onError={(e) => {
                e.target.src = user1;
            }}
            alt=""/>
      <p>{localStorage.getItem("auth-token")?userInfo.name:""}</p>
    </div>
    <div className={isDropdownOpen?`dropdownModal dropdownOpen `:`dropdownModal `}>

      {localStorage.getItem("auth-token")?<div className="userInformation">
        <img src={userInfo.profilePic} alt="" onError={(e) => {
                e.target.src = user1;
            }} />
        <h5 className='my-2 font-semibold text-[20px]'>{userInfo.name}</h5>
        <p>{userInfo.username}</p>
      </div>:<></>}

      <div className='logoutandlogin'>
      {!localStorage.getItem("auth-token")?<div>
        <Link to="/signup" className="btn btn-primary mx-1" id='sign_btn'>Login</Link>
      </div>:<button  className="bg-red-500 p-2 my-3 rounded text-white" id='logout_btn'  onClick={logoutHandle}>Logout</button>}
      </div>


    </div>
  </div>
</nav>
    </>
  )
}
