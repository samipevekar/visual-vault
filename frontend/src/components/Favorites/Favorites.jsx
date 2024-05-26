import React, { useContext, useEffect, useState } from 'react'
import './Favorites.css'
import ImageCard from '../ImageCard/ImageCard'
import shopContext from '../../Context/ShopContext'
import ImageSkeleton from '../skeletons/ImageSkeleton'

export default function Favorites() {


    const context = useContext(shopContext)         // getting functions from the shop context
    const {formatDate,favorite_images,imageData,loading} = context 

      useEffect(()=>{
        favorite_images()
      },[])
      

  return (
    <>
    {loading ? <ImageSkeleton/> : <div className='favoritesContainer'>
      {imageData.length === 0 && <span style={{fontSize:"20px"}}>No image to display</span> }
        {imageData.map(data=>{
          return <ImageCard key={data.id} id={data._id} source={data.image} favorite={data.favorite} date={formatDate(data.date)}  />
        })}
    </div>}
    </>
  )
}
