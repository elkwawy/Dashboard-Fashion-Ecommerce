import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

import { useDispatch, useSelector } from 'react-redux'
import {  specificCategory } from '../../../redux/slices/CategorySlice'

export default function CategoryCard({ product, setProduct }){
  const [category ,setcategoryid] = useState()
  const {categories,loading,error,subCategory,subid} = useSelector((state)=>state.categorySlice)
const dispatch = useDispatch()



const handelbrand = (e)=>{
  setProduct((prev)=>{
    const updatedProduct = {...prev}    
    updatedProduct.Brand = e.target.value
    return updatedProduct
  })
} 



useEffect(() => {
  if (subid) {
    dispatch(specificCategory({ id: subid }));
  }
}, [dispatch, subid]);

console.log(subCategory);
 

const handelSubcategory =(e)=>{
  setProduct((prev)=>{
    const updatedProduct = {...prev}
    updatedProduct.SubCategory = e.target.value
    return updatedProduct
  })
}


  return <>
  <div className=' space-y-2 border-2 border-gray-300 rounded-lg px-4 py-6 mb-6'>
    <h2 className=' text-2xl font-semibold'>SubCategory</h2>
    <form className='flex flex-col items-start justify-center gap-2 '>
  
   <div className='w-full'>
    <select className='w-full px-2 py-1 border border-gray-300 rounded text-black' name='subcategory' id='subcategory' required  onChange={handelSubcategory}>
     {subCategory.length === 0 ? (
       <option disabled>
    please select category first
       </option>
     ): subCategory.map((subcategory) =>
      <option  key={subcategory._id}  value={subcategory._id} >{subcategory.name}</option>
     )}
    </select>
   </div>


  {/* brand */}
  <div className='space-y-2 w-full'>

  <label htmlFor="brand" className='font-semibold text-xl'>Brand</label>
  <select className='w-full px-2 py-1 border border-gray-300 rounded text-black' name='brand' id='brand' required  onChange={handelbrand}>
  {subCategory.length === 0 ? (
  <option disabled> please select category first</option>
) : (
  subCategory.map((item) =>
    item.SubCategoryProducts.map((subcategory) => (
      <option key={subcategory._id} value={subcategory._id}>
        {subcategory.name}
      </option>
    ))
  )
)}
    </select>
  </div>
        </form>
    

  </div>
  
  </>
}
