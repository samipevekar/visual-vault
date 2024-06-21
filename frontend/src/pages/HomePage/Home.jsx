import React from 'react';
import './Home.css';
import Aside from '../../components/Aside/Aside';
import Addimage from '../../components/Addimage/Addimage';
import { Routes, Route,Navigate } from 'react-router-dom';
import About from '../../components/About/About';
import Collection from '../../components/Collection/Collection';
import HomeContent from '../../components/HomeContent/HomeContent';
import Favorites from '../../components/Favorites/Favorites';
import DisplayImage from '../../components/DisplayImage/DisplayImage';
import DisplaySearch from '../../components/DisplaySearch/DisplaySearch';
import Chats from '../Chats/Chats';
import Signup from '../Signup/Signup';

export default function Home() {

  const authUser = localStorage.getItem("auth-token")

  return (
    <div className='homepage'>
      <Aside />
      <div className='homeComponents'>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/addimage" element={authUser ? <Addimage /> : <Navigate to="/signup"/>} />
          <Route path="/collections" element={authUser ? <Collection /> : <Navigate to="/signup"/>}/>
          <Route path="/favorites" element={authUser ? <Favorites /> : <Navigate to="/signup"/>} />
          <Route path="/displaysearch" element={authUser ? <DisplaySearch /> : <Navigate to="/signup"/>} />
          <Route path="/about" element={<About />} />
          <Route path="/image/:imageId" element={authUser ? <DisplayImage /> : <Navigate to="/signup"/>} />
          <Route path="/chats" element={authUser ? <Chats /> : <Navigate to="/signup"/>} />
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="*" element={<HomeContent/>}></Route>
        </Routes>
      </div>
    </div>
  );
}
