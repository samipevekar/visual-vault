import React from 'react';
import './Home.css';
import Aside from '../../components/Aside/Aside';
import Addimage from '../../components/Addimage/Addimage';
import { Routes, Route } from 'react-router-dom';
import About from '../../components/About/About';
import Collection from '../../components/Collection/Collection';
import HomeContent from '../../components/HomeContent/HomeContent';
import Favorites from '../../components/Favorites/Favorites';
import DisplayImage from '../../components/DisplayImage/DisplayImage';
import DisplaySearch from '../../components/DisplaySearch/DisplaySearch';
import Chats from '../Chats/Chats';
import Signup from '../Signup/Signup';

export default function Home() {
  return (
    <div className='homepage'>
      <Aside />
      <div className='homeComponents'>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="addimage" element={<Addimage />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/displaysearch" element={<DisplaySearch />} />
          <Route path="/about" element={<About />} />
          <Route path="/image/:imageId" element={<DisplayImage />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
      </div>
    </div>
  );
}
