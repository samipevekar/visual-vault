import React, { useContext } from 'react';
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
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
  const { isOpen } = context;

  const isLoggedIn = localStorage.getItem("auth-token");     // Checks if user logged in
  
  
  return (
    <div> 
        {isLoggedIn &&  <Sidebar id='sidebar' className={ !isOpen ? "bg-white sidebar z-50 border-r-[1.5px] border-gray-100" : "sidebar  bg-white showSidebar"}>      
        
            <Menu id='menu'>              
                <MenuItem className='menu_item' title='Home'  component={<Link to="/" ></Link>}>
                  <div className="icons" > <img src={home_icon} className='sidebar_icons'/>
                    <span>Home</span>
                  </div>
                </MenuItem>
                
                <MenuItem className='menu_item' title='Add Image' component={<Link to="/addimage" ></Link>}>
                  <div className="icons"> <img src={addimage_icon} className='sidebar_icons'/>
                    <span>Add Image</span>
                  </div>
                </MenuItem>
                <MenuItem className='menu_item' title='Collections' component={<Link to="/collections" ></Link>}>
                  <div className="icons"> <img src={collection_icon} className='sidebar_icons'/>
                    <span>Collections</span>
                  </div>
                </MenuItem>
                <MenuItem className='menu_item' title='Favorites'  component={<Link to="/favorites" ></Link>}>
                  <div  className="icons"> <img src={favorite_icon} className='sidebar_icons'/>
                    <span>Favorites</span>
                  </div>
                </MenuItem>
                <MenuItem className='menu_item' title='Messages' component={<Link to="/chats" ></Link>}>
                  <div  className="icons"> <img src={message_icon} className='sidebar_icons'/>
                    <span>Messages</span>
                  </div>
                </MenuItem>
                <MenuItem className='menu_item' title='Search Image' component={<Link to="/displaysearch" ></Link>}>
                  <div  className="icons"> <img src={search_icon} className='sidebar_icons'/>
                    <span>Search Image</span>
                  </div>
                </MenuItem>
                <MenuItem className='menu_item' title='About' component={<Link to="/about" ></Link>}>
                  <div className="icons"> <img src={about_icon} className='sidebar_icons'/>
                    <span>About</span>
                  </div>
                </MenuItem>
            </Menu>
        </Sidebar>}
    </div>
  );
}