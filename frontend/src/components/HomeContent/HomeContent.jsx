import React from 'react'
import './HomeComponent.css'
import { Link } from 'react-router-dom'
import gallery_logo from '../assets/gallery_logo.png'
import Footer from '../Footer/Footer'

export default function HomeContent() {


  return (
    <div className='flex-col '>
    <div className="home-container">
        <img src={gallery_logo} className='home-logo' alt="" />
        <h1 className="home-heading fadeIn">Welcome to Visual Vault</h1>
        <p className="home-paragraph fadeIn">Your go-to platform for storing and organizing your images.</p>
        <p className="home-paragraph fadeIn">With Visual Vault, you can securely store your images and access them anytime, anywhere.</p>
        <p className="home-paragraph fadeIn">Also you can chat with any user.</p>
        {localStorage.getItem("auth-token")?<p className="home-paragraph home1-para fadeIn">Enjoy Your Own Gallery!</p>:<p className="home-paragraph home1-para fadeIn">Sign up now to get started!</p>}
        {localStorage.getItem("auth-token")?<></>:<Link to={"/signup"} className="home-button fadeIn">Continue</Link>}
    </div>

    
    <Footer/>
    </div>

  )
}
