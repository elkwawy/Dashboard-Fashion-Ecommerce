import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {allProduct } from '../redux/slices/productslice'
import Loader from '../utils/Loader'

export default function ProductCard() {
   const dispatch = useDispatch()
   const {product, loading, error} = useSelector((state)=>state.productSlice)

const productDetails = product.data

   useEffect(()=>{
       dispatch(allProduct())
   },[])

   if(loading){
    return <>
      <div className='w-full h-screen flex justify-center items-center'>
        <Loader />
  </div>
    </>
   }

  return <>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8 '>
  {Array.isArray(productDetails) &&   
  productDetails.map((card, index) => (
    <div key={index} className='space-y-1 '>
      <div className=' '>
        <img
          src="https://s3-alpha-sig.figma.com/img/4a35/dd7a/42e6e08fff673065cf94613ac5eddd58?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PDYV5rB0V4PhSotGVzEqXDSQ3uK9boaCJOZprUWIB66C2LMW2oqBKoEMec2X~CKsVwjDVWkqQDeNMXuo~qaHSWBG6shMSOI5H-TplWumgcs0t~rwYYFkqQhUx4jD8RVQcR1C4jVc0Dv6Guy8Da4vETaatWmjX-bi0YfZi1l1BxWVucszRgiyKIYrsOXxYaqwCEW4btSvZKB1isAm12QAqPDwvRGzAeE0MJ8sUNqGYCtgmRip56dAnCETjBzz79prxGGj0wCdU29o2SHW-7PRY2kgAizioAr2QqxcOLye4ifykZjGkXjRcobMhFNDgOpQBYKNijFWZHRbCUZX5FQNXg__"
          alt={card.name}
          className='w-full h-full min-h-[330px] lg:min-h-[300px] object-cover'
        />
      </div>
      <h2 className='line-clamp-1'>{card.name}</h2>
      <p className='font-bold'>{card.price}</p>
      <div className='flex gap-2 md:gap-[0.5px] lg:gap-2 flex-wrap'>
        {card.colors.map((color, index) => (
          <div
            key={index}
            className='w-7 h-7 border-2 rounded-full'
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  ))
 }
  </div>
  
  </>
}
