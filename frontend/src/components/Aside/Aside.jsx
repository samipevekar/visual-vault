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
  const isLoggedIn = localStorage.getItem("auth-token");

  // const handleMenuItemClick = () => {
  //   setProgress(30); // Start the loading process
  //   setTimeout(() => {
  //     setProgress(100); // Finish the loading process after a delay
  //   }, 300); // Adjust the delay as needed
  // };

  return (
    <div>
      {isLoggedIn && (
        <Sidebar
          id="sidebar"
          className={!isOpen ? "bg-body-tertiary sidebar" : "sidebar bg-body-tertiary showSidebar"}
        >
          <Menu id="menu">
            <MenuItem className="menu_item" component={() => <Link to="/" />}>
              <div className="icons">
                <img src={home_icon} className="sidebar_icons" alt="Home" />
                <span>Home</span>
              </div>
            </MenuItem>
            <MenuItem className="menu_item" component={() => <Link to="/addimage" />}>
              <div className="icons">
                <img src={addimage_icon} className="sidebar_icons" alt="Add Image" />
                <span>Add Image</span>
              </div>
            </MenuItem>
            <MenuItem className="menu_item" component={() => <Link to="/collections" />}>
              <div className="icons">
                <img src={collection_icon} className="sidebar_icons" alt="Collection" />
                <span>Collection</span>
              </div>
            </MenuItem>
            <MenuItem className="menu_item" component={() => <Link to="/favorites" />}>
              <div className="icons">
                <img src={favorite_icon} className="sidebar_icons" alt="Favorites" />
                <span>Favorites</span>
              </div>
            </MenuItem>
            <MenuItem className="menu_item" component={() => <Link to="/chats" />}>
              <div className="icons">
                <img src={message_icon} className="sidebar_icons" alt="Messages" />
                <span>Messages</span>
              </div>
            </MenuItem>
            <MenuItem className="menu_item" component={() => <Link to="/displaysearch" />}>
              <div className="icons">
                <img src={search_icon} className="sidebar_icons" alt="Search Image" />
                <span>Search Image</span>
              </div>
            </MenuItem>
            <MenuItem className="menu_item" component={() => <Link to="/about" />}>
              <div className="icons">
                <img src={about_icon} className="sidebar_icons" alt="About" />
                <span>About</span>
              </div>
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
    </div>
  );
}
