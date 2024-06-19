import React, { useContext } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
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

  const isLoggedIn = localStorage.getItem("auth-token"); // Checks if user logged in

  return (
    <div>
      {isLoggedIn && (
        <Sidebar id='sidebar' className={!isOpen ? "bg-white sidebar" : "sidebar bg-body-tertiary showSidebar"}>
          <Menu id='menu'>
            <MenuItem className='menu_item' title='Home'>
              <Link to="/">
                <div className="icons">
                  <img src={home_icon} className='sidebar_icons' alt="Home Icon" />
                  <span>Home</span>
                </div>
              </Link>
            </MenuItem>

            <MenuItem className='menu_item' title='Add Image'>
              <Link to="/addimage">
                <div className="icons">
                  <img src={addimage_icon} className='sidebar_icons' alt="Add Image Icon" />
                  <span>Add Image</span>
                </div>
              </Link>
            </MenuItem>

            <MenuItem className='menu_item' title='Collections'>
              <Link to="/collections">
                <div className="icons">
                  <img src={collection_icon} className='sidebar_icons' alt="Collections Icon" />
                  <span>Collections</span>
                </div>
              </Link>
            </MenuItem>

            <MenuItem className='menu_item' title='Favorites'>
              <Link to="/favorites">
                <div className="icons">
                  <img src={favorite_icon} className='sidebar_icons' alt="Favorites Icon" />
                  <span>Favorites</span>
                </div>
              </Link>
            </MenuItem>

            <MenuItem className='menu_item' title='Messages'>
              <Link to="/chats">
                <div className="icons">
                  <img src={message_icon} className='sidebar_icons' alt="Messages Icon" />
                  <span>Messages</span>
                </div>
              </Link>
            </MenuItem>

            <MenuItem className='menu_item' title='Search Image'>
              <Link to="/displaysearch">
                <div className="icons">
                  <img src={search_icon} className='sidebar_icons' alt="Search Image Icon" />
                  <span>Search Image</span>
                </div>
              </Link>
            </MenuItem>

            <MenuItem className='menu_item' title='About'>
              <Link to="/about">
                <div className="icons">
                  <img src={about_icon} className='sidebar_icons' alt="About Icon" />
                  <span>About</span>
                </div>
              </Link>
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
    </div>
  );
}
