import React, { useContext } from 'react'
import './BackDrop.css'
import shopContext from '../../Context/ShopContext'

export default function BackDrop() {
    const {setIsOpen} = useContext(shopContext)

    const handleBackdropClick = ()=>{
        setIsOpen(false)
    }
  return (
    <div className='backdrop -z-10' onClick={handleBackdropClick}>
      
    </div>
  )
}
