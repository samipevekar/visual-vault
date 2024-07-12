import React, { useContext } from 'react'
import shopContext from '../../Context/ShopContext'

export default function BackDrop() {
    const {setIsOpen} = useContext(shopContext)

    const handleBackdropClick = ()=>{
        setIsOpen(false)
    }
  return (
    <div className='backdrop z-10 w-full h-full bg-gray-200 absolute' onClick={handleBackdropClick}>
      
    </div>
  )
}
