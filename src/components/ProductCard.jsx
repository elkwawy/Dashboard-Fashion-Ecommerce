import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {allProduct, deleteProduct } from '../redux/slices/productslice'
import { updateProduct} from '../redux/slices/addProductSlice'
import Loader from '../utils/Loader'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';
import sweetalert from '../utils/sweetalert';



export default function ProductCard() {
  const navegate = useNavigate()
   const dispatch = useDispatch()
   const {product, loading, error} = useSelector((state)=>state.productSlice)
const productDetails = product.data



const deletedProduct=(id)=>{
  dispatch(deleteProduct({id}))
}


const handelupdate = (product)=>{
  navegate("/products/newProduct",{ state: { product } })

}

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
      <div className='relative min-h-[345px] '>
        <img
          src={card.image}
          alt={card.name}
          className='w-full h-full min-h-[340px] lg:min-h-[350px] object-cover'
        />
        <div className='flex justify-center py-4 items-end opacity-0 hover:opacity-100 transition-all duration-300 text-white bg-black/20 w-full h-full absolute top-0 right-0 left-0'>
          <div className='mr-6 text-3xl cursor-pointer' onClick={()=>deletedProduct(card._id)}><RiDeleteBin6Line /> </div>
          <div className='mr-6 text-3xl cursor-pointer ' onClick={()=>handelupdate(card)}><FaEdit /></div>

        </div>
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
