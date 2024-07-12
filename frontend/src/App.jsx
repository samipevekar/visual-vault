import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
// import Home from './pages/HomePage/Home'
const Home = React.lazy(()=>import('./pages/HomePage/Home')); 
import shopContext from './Context/ShopContext'
import LoadingBar from 'react-top-loading-bar'
import BackDrop from './components/BackDrop/BackDrop'
import { Toaster } from 'react-hot-toast';
import {ErrorBoundary} from "react-error-boundary"
import ErrorComponent from './components/ErrorBoundary/ErrorBoundary'
import Loader from './components/Loader/Loader';


export default function App() {

  const context = useContext(shopContext)  
  const {progress,isOpen} = context 

  return (
    <ErrorBoundary fallback={<ErrorComponent/>}>
    
      <Toaster/>
      <LoadingBar height={3} color='#f11946' progress={progress}/> 
      <Navbar/>
      {isOpen===true && <BackDrop/>}
      <React.Suspense fallback={<Loader/>}><Home/></React.Suspense>
      {/* <Routes>
       
      </Routes> */}
    </ErrorBoundary>
  )
}
