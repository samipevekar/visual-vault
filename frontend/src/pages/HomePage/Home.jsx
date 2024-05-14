import React from 'react'
import './Home.css'
import Aside from '../../components/Aside/Aside'
import Addimage from '../../components/Addimage/Addimage'
import { Routes,Route } from 'react-router-dom'
import About from '../../components/About/About'
import Collection from '../../components/Collection/Collection'
import HomeContent from '../../components/HomeContent/HomeContent'
import Favorites from '../../components/Favorites/Favorites'
import DisplayImage from '../../components/DisplayImage/DisplayImage'
import DisplaySearch from '../../components/DisplaySearch/DisplaySearch'
import Chats from '../Chats/Chats'

export default function Home() {


  return (
    <>
    <div className='homepage'>  
     <Aside/>
      <div className='homeComponents'>
        <Routes>
            <Route exact path='/' element={<HomeContent/>}></Route>
            <Route exact path='/addimage' element={<Addimage/>}></Route>
            <Route exact path='/collections' element={<Collection />}></Route>
            <Route exact path='/favorites' element={<Favorites/>}></Route>            
            <Route exact path='/displaysearch' element={<DisplaySearch/>}></Route>            
            <Route exact path='/about' element={<About/>}></Route>    
            <Route exact path='/image/:imageId' element={<DisplayImage/>}/>   
          <Route exact path='/chats' element={<Chats/>}></Route>
        </Routes>         
      </div>
      </div>
    </>
    
  )
}
