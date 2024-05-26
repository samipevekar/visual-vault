import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route } from "react-router-dom"
import Signup from './pages/Signup/Signup'
import Home from './pages/HomePage/Home'
import Footer from './components/Footer/Footer'
import shopContext from './Context/ShopContext'
import LoadingBar from 'react-top-loading-bar'
import BackDrop from './components/BackDrop/BackDrop'
import { Toaster } from 'react-hot-toast';
import ImageSkeleton from './components/skeletons/ImageSkeleton'
import {ErrorBoundary} from "react-error-boundary"
import ErrorComponent from './components/ErrorBoundary/ErrorBoundary'


export default function App() {

  const context = useContext(shopContext)  
  const {progress,isOpen} = context 

  return (
    <ErrorBoundary fallback={<ErrorComponent/>}>
    
      <Toaster/>
      <LoadingBar height={2.5} color='#f11946' progress={progress}/> 
      <Navbar/>
      {isOpen===true && <BackDrop/>}
      <Home/>
      <Routes>
        <Route exact path='/signup' element={<Signup/>}></Route>
      </Routes> 
      <Footer/>
      <ImageSkeleton/>
    
    </ErrorBoundary>
  )
}
