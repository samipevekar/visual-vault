import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gallery_logo from '../assets/gallery_logo.png';
import user1 from '../assets/user1.png';
import hamburger_logo from '../assets/hamburger.png';
import shopContext from '../../Context/ShopContext';
import './Navbar.css';

export default function Navbar() {
  const context = useContext(shopContext);
  const { handle_toggle, setIsOpen, userInfo, getUser, isOpen } = context;

  const logoutHandle = () => {
    localStorage.removeItem('auth-token');
    setIsOpen(false);
    window.location.href = '/signup';
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handle_dropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if(userInfo){
      getUser();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <nav className="navbar z-10 border-b-[1.5px] border-gray-100 bg-white">
        <div className="container mx-auto flex justify-between  ">
          {localStorage.getItem('auth-token') ? (
            <img
              src={hamburger_logo}
              className={isOpen ? 'hamburger hamOpen' : 'hamburger'}
              onClick={handle_toggle}
              alt=""
            />
          ) : (
            <></>
          )}
          <Link to="/">
            <div className="logo flex items-center">
              <img src={gallery_logo} id="logo" alt="" className="mr-2" />
              <p>Visual Vault</p>
            </div>
          </Link>
          {localStorage.getItem('auth-token') ? (
            <></>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-5"></ul>
          )}
          <div className="userLogo flex items-center" onClick={handle_dropdown}>
            <img
              src={userInfo.profilePic}
              onError={(e) => {
                e.target.src = user1;
              }}
              alt=""
              className=""
            />
            <p>{localStorage.getItem('auth-token') ? userInfo.name : ''}</p>
          </div>
          <div className={isDropdownOpen ? `dropdownModal dropdownOpen z-50` : `dropdownModal z-50`}>
            {localStorage.getItem('auth-token') ? (
              <div className="userInformation text-center">
                <img
                  src={userInfo.profilePic}
                  alt=""
                  onError={(e) => {
                    e.target.src = user1;
                  }}
                />
                <h5 className="my-2 font-semibold text-[20px]">{userInfo.name}</h5>
                <p>{userInfo.username}</p>
              </div>
            ) : (
              <></>
            )}
            <div className="logoutandlogin text-center">
              {!localStorage.getItem('auth-token') ? (
                <div>
                  <Link to="/signup" className="btn btn-primary mx-1" id="sign_btn">
                    Login
                  </Link>
                </div>
              ) : (
                <button
                  className="bg-red-500 p-2 my-3 rounded text-white"
                  id="logout_btn"
                  onClick={logoutHandle}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
