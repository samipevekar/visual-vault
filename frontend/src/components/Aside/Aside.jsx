import React, { useContext } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './Aside.css';
import home_icon from '../assets/home.png';
import addimage_icon from '../assets/addimage.png';
import collection_icon from '../assets/collection.png';
import about_icon from '../assets/about.png';
import favorite_icon from '../assets/favorite.png';
import search_icon from '../assets/search.png';
import message_icon from '../assets/message.png';
import shopContext from '../../Context/ShopContext';

export default function Aside() {
  const context = useContext(shopContext);
  const { isOpen, setProgress } = context;

  const isLoggedIn = localStorage.getItem("auth-token");     // Checks if user logged in
  
  const handleMenuItemClick = () => {
    setProgress(30); // Start the loading process
    setTimeout(() => {
      setProgress(100); // Finish the loading process after a delay
    }, 300); // Adjust the delay as needed
  };

  
  return (
    <div> 
        {isLoggedIn &&  <Sidebar id='sidebar' className={!isOpen ? "bg-body-tertiary sidebar" : "sidebar  bg-body-tertiary showSidebar"}>      
        
            <Menu id='menu'>              
                <MenuItem className='menu_item'  component={<Link to={"/"} onClick={handleMenuItemClick}></Link>}>
                  <div className="icons" > <img src={home_icon} className='sidebar_icons'/>
                    <span>Home</span>
                  </div>
                </MenuItem>
                
                <MenuItem className='menu_item' component={<Link to={"/addimage"} onClick={handleMenuItemClick}></Link>}>
                  <div className="icons"> <img src={addimage_icon} className='sidebar_icons'/>
                    <span>Add Image</span>
                  </div>
                </MenuItem>
                <MenuItem className='menu_item' component={<Link to={"/collections"} onClick={handleMenuItemClick}></Link>}>
                  <div className="icons"> <img src={collection_icon} className='sidebar_icons'/>
                    <span>Collection</span>
                  </div>
                </MenuItem>
                <MenuItem className='menu_item' component={<Link to={"/favorites"} onClick={handleMenuItemClick}></Link>}>
                  <div  className="icons"> <img src={favorite_icon} className='sidebar_icons'/>
                    <span>Favorites</span>
                  </div>
                </MenuItem>
                <MenuItem className='menu_item' component={<Link to={"/chats"} onClick={handleMenuItemClick}></Link>}>
                  <div  className="icons"> <img src={message_icon} className='sidebar_icons'/>
                    <span>Messages</span>
                  </div>
                </MenuItem>
                <MenuItem className='menu_item' component={<Link to={"/displaysearch"} onClick={handleMenuItemClick}></Link>}>
                  <div  className="icons"> <img src={search_icon} className='sidebar_icons'/>
                    <span>Search Image</span>
                  </div>
                </MenuItem>
                <MenuItem className='menu_item' component={<Link to={"/about"} onClick={handleMenuItemClick}></Link>}>
                  <div className="icons"> <img src={about_icon} className='sidebar_icons'/>
                    <span>About</span>
                  </div>
                </MenuItem>
            </Menu>
        </Sidebar>}
    </div>
  );
}
