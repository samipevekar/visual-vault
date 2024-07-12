import React from 'react';
import './Home.css';
import { Routes, Route,Navigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
const  Aside = React.lazy(()=>import("../../components/Aside/Aside")) ;
const About = React.lazy(()=>import('../../components/About/About'))  ;
const HomeContent = React.lazy(()=>import('../../components/HomeContent/HomeContent')) ;
const Addimage =  React.lazy(()=>import('../../components/Addimage/Addimage')) ;
const Collection = React.lazy(()=>import('../../components/Collection/Collection')) ;
const Favorites = React.lazy(()=>import('../../components/Favorites/Favorites')) ;
const DisplayImage = React.lazy(()=>import('../../components/DisplayImage/DisplayImage')) ;
const DisplaySearch = React.lazy(()=>import('../../components/DisplaySearch/DisplaySearch')) ;
const Chats = React.lazy(()=>import('../Chats/Chats')) ;
const Signup = React.lazy(()=>import('../Signup/Signup')) ;

export default function Home() {

  const authUser = localStorage.getItem("auth-token")

  return (
    <div className='homepage'>
      <React.Suspense fallback=''><Aside /></React.Suspense>
      <div className='homeComponents'>
          <DisplayImage/> 
        <Routes>
          <Route path="/" element={<React.Suspense fallback={<Loader/>}><HomeContent /></React.Suspense>} />
          <Route path="/addimage" element={authUser ? <React.Suspense fallback={<Loader/>}><Addimage /></React.Suspense>  : <Navigate to="/signup"/>} />
          <Route path="/collections" element={authUser ? <React.Suspense fallback={<Loader/>}><Collection /></React.Suspense>: <Navigate to="/signup"/>}/>
          <Route path="/favorites" element={authUser ? <React.Suspense fallback={<Loader/>}><Favorites /></React.Suspense> : <Navigate to="/signup"/>} />
          <Route path="/displaysearch" element={authUser ? <React.Suspense fallback={<Loader/>}><DisplaySearch /></React.Suspense> : <Navigate to="/signup"/>} />
          <Route path="/about" element={<React.Suspense fallback={<Loader/>}><About /></React.Suspense>} />
          <Route path="/chats" element={authUser ? <React.Suspense fallback={<Loader/>}><Chats /></React.Suspense> : <Navigate to="/signup"/>} />
          <Route path="/signup" element={<React.Suspense fallback={<Loader/>}><Signup /></React.Suspense>}></Route>
          <Route path="*" element={<HomeContent/>}></Route>
        </Routes>
      </div>
    </div>
  );
}
