import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Signup from './pages/Signup/Signup'
import Home from './pages/HomePage/Home'
import Footer from './components/Footer/Footer'
import shopContext from './Context/ShopContext'
import LoadingBar from 'react-top-loading-bar'
import BackDrop from './components/BackDrop/BackDrop'
import { Toaster } from 'react-hot-toast';


export default function App() {

  const context = useContext(shopContext)  
  const {progress,isOpen} = context 

  return (
    <Router>
      <Toaster/>
      <LoadingBar height={2.5} color='#f11946' progress={progress}/> 
      <Navbar/>
      {isOpen===true && <BackDrop/>}
      <Home/>
      <Routes>
        <Route exact path='/signup' element={<Signup/>}></Route>
      </Routes> 
      <Footer/>
    </Router>
  )
}
