import React, { useEffect, useState } from 'react'
import { getAlcategories, setId } from '../../../redux/slices/CategorySlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../utils/Loader'



export default function GeneralInfo({ product, setProduct }) {
const { categories,loading,error} = useSelector((state)=>state.categorySlice)
  
  const dispatch = useDispatch()


  const handelName = (e)=>{
    setProduct((prev)=>{
      const updatedProduct = {...prev}
      updatedProduct.name = e.target.value
      return updatedProduct
    })
  }

  const handleDescription = (e)=>{
    setProduct((prev)=>{
      const updatedProduct = {...prev}
      updatedProduct.Desc = e.target.value
      return updatedProduct
    })
  }

  const handelSize = (e)=>{
    setProduct((prev)=>{
      const updatedProduct = {...prev}
      updatedProduct.size = [...prev.size, e.target.value]
      return updatedProduct
    })
  }
  
 
useEffect(()=>{
  dispatch(getAlcategories())
},[dispatch])


const handelCategory = (e)=>{
  setProduct((prev)=>{
    const updatedProduct = {...prev}
    updatedProduct.category = e.target.value
    dispatch(setId({id: e.target.id }))
    return updatedProduct
  })
}
 


  return <> 
  <form className='space-y-2 border-2 border-gray-300 rounded-lg p-4 mb-6' >
    <h2 className='text-2xl font-semibold'>General Information</h2>
    <div className='space-y-3'>
        {/* name */}
       <div className='flex flex-col items-start justify-between space-y-2 '>
       <label htmlFor="name">Name Product</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter name product"
        className="w-full p-2 border border-gray-300 rounded"
        onChange={handelName}
        value={product.name}
      />

     
       
       </div>
{/* description */}
       <div className='flex flex-col items-start justify-center space-y-2'>
       <label htmlFor=''>Description Product</label>
      <textarea id='description' name='description' placeholder='Enter description Product...' className='w-full h-32 p-2 border border-gray-300 rounded ' onChange={handleDescription}></textarea>
       </div>
{/* size general */}
<div className='space-y-2 lg:flex items-start justify-between gap-4'>
    {/* size */}
<div className='space-y-2 w-1/2'>
<h3 className='font-semibold'>Size</h3>
<p className='text-gray-500 text-nowrap'>Pick Available Size</p>
<div/>
<div className='flex items-center md:flex-wrap flex-wrap gap-2'>
{/* size box */}
<div className='py-2 px-2  text-xl rounded text-center w-[42px]'>
<label htmlFor='xs' className=''><input type='checkbox'  name='xs' id='xs'  className='hidden peer'  onChange={handelSize} value={"xs"}/>
<div className='py-2 px-2 text-xl bg-gray-200 w-[40px] rounded  flex-col items-center justify-center peer-checked:bg-blue-500  peer-checked:text-white'>XS</div>
</label>
</div>
{/* size box2 */}
<div className='peer py-2 px-2 cursor-pointer text-xl rounded text-center w-[42px]'>
<label htmlFor='s' className=''><input type='checkbox'  name='s' id='s'  className='hidden peer'  onChange={handelSize} value={"s"}/>
<div className='py-2 px-2 text-xl bg-gray-200 w-[40px] rounded  flex-col items-center justify-center peer-checked:bg-blue-500  peer-checked:text-white'>S</div>
</label>
</div>

 {/* size box3 */} 
<div className=' peer py-2 px-2 cursor-pointer text-xl rounded text-center w-[42px]'>
<label htmlFor='m' className=''><input type='checkbox'  name='m' id='m'  className='hidden peer' onChange={handelSize} value={"m"} />
<div className='py-2 px-2 text-xl bg-gray-200 w-[40px] rounded  flex-col items-center justify-center peer-checked:bg-blue-500  peer-checked:text-white'>M</div>
</label>
</div>

<div className=' peer py-2 px-2 cursor-pointer text-xl rounded text-center w-[42px]'>
<label htmlFor='L' className=''><input type='checkbox'  name='L' id='L'  className='hidden peer' onChange={handelSize} value={"L"}/>
<div className='py-2 px-2 text-xl bg-gray-200 w-[40px] rounded  flex-col items-center justify-center peer-checked:bg-blue-500  peer-checked:text-white'>L</div>
</label>
</div>

<div className=' peer py-2 px-2 cursor-pointer text-xl rounded text-center w-[42px]'>
<label htmlFor='XL' className=''><input type='checkbox'  name='XL' id='XL'  className='hidden peer' onChange={handelSize} value={"XL"}/>
<div className='py-2 px-2 text-xl bg-gray-200 w-[40px] rounded  flex-col items-center justify-center peer-checked:bg-blue-500  peer-checked:text-white'>XL</div>
</label>
</div>

<div className=' peer py-2 px-2 cursor-pointer text-xl rounded text-center  w-[42px]'>
<label htmlFor='XXL' className=''><input type='checkbox'  name='XXL' id='XXL'  className='hidden peer' onChange={handelSize} value={"XXL"} />
<div className='py-2 px-2 text-xl bg-gray-200 w-[40px] rounded flex flex-col items-center justify-center peer-checked:bg-blue-500  peer-checked:text-white'>XXL</div>
</label>
</div>

</div>

</div>


{/*Category */}

<div className='space-y-2 w-1/2'>
<h3 className='font-semibold'>Category</h3>
<p className='text-gray-500 text-nowrap'>Pick Available Category</p>
<div className='flex items-center lg:flex-wrap max-[349px]:flex-wrap justify-between'>
    {categories? categories.map((category,id) => (<div  className=' ' key={category._id}>
    <label htmlFor={category._id}  className="flex items-center space-x-reverse space-x-2">
  <input
    type="radio"
    id={category._id}
    name="category"
    value={category._id}
    className="peer hidden"
    onChange={handelCategory}
  />
  <div className="w-[20px] h-[20px] border border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500">
    <div className="w-[10px] h-[10px] rounded-full border border-gray-400 bg-white peer-checked:bg-blue-500 "></div>
  </div>
  <span>{category.name}</span>
</label>
    </div>)):<div className='flex items-center justify-center w-full h-full'> <Loader/> </div>}
   
</div>
</div>
</div>
    </div>
   
  </form>
  
  </>
}
