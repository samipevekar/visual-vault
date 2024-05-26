import React from 'react'
import './ImageSkeleton.css'
import ImageSkeletonCard from './ImageSkeletonCard'

export default function ImageSkeleton() {
  return (
    <div className='image-skeleton'>
        <ImageSkeletonCard/>
        <ImageSkeletonCard/>
        <ImageSkeletonCard/>
        <ImageSkeletonCard/>
        <ImageSkeletonCard/>
        <ImageSkeletonCard/>
        <ImageSkeletonCard/>
        <ImageSkeletonCard/>
        <ImageSkeletonCard/>
        <ImageSkeletonCard/>
    </div>
  )
}
