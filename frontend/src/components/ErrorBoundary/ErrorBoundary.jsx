import React from 'react'
import error_png from '../assets/error.png'

export default function ErrorBoundary() {
  return (
    <div className='relative '>
      <img src={error_png} className='w-full  object-cover' onClick={() => window.location.href="/"} alt="Error" />
    </div>
  )
}
