import React, { useEffect} from 'react'
import './Collection.css'
import ImageCard from '../ImageCard/ImageCard'
import { useContext } from 'react';
import shopContext from '../../Context/ShopContext';


export default function Collection() {

  const context = useContext(shopContext)
  const {imageData,all_images,formatDate} = context  // Getting functions from shop context 

  

  // Calling functions 
  useEffect(()=>{
    all_images()
  },[]) 
  
  return (
    <>
    <div className='collection'>
       {imageData.length === 0 && <span style={{fontSize:"20px"}}>No image to display</span>}  {/* If no data then show this     */}
      {imageData && imageData.map((data)=>{     // If data found then map the data
        return <ImageCard  key={data.id} id={data._id} favorite={data.favorite} date={formatDate(data.date)}  source={data.image} />
      })}
    </div>
    </>
  )
}
