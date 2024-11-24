import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default function Products() {
  return <>
  <section>
   <div className='container py-4'>
   <h2 className='text-2xl font-semibold'>Products</h2>
   <div className='bg-white rounded-xl p-4 my-4'>
     
<div className='bg-gray-100  my-4 '>
{/* search input and add link */}
<div className='md:flex space-y-4 md:space-y-0 items-center justify-between bg-white'>
  {/* search input */}
<div className='relative md:w-[300px] lg:w-[500px] w-full '>
  <input type='text' placeholder='Search here...' className='w-full p-2 border border-gray-300 rounded' />
  <CiSearch className='absolute top-3 right-3'/>
</div>
{/* add product */}
<div className='w-full md:w-[220px]  bg-blue-500 py-2 flex items-center justify-center'>
  <NavLink to={'/products/newProduct'} className='w-full text-center  px-4  rounded text-white'><FaPlus className='inline-flex mr-2'/> Add Product</NavLink>
</div>

</div>

</div>
{/* cards */}
<ProductCard/>
    </div>
{/* numbers of page */}
    <div className='flex items-center justify-between'>
      <p>Showing 1-09 of 78</p>
      <div className=''>
        <button className='p-2 border border-gray-300 bg-white'><IoIosArrowBack /></button>
        <button className='p-2 border border-gray-300 bg-white'><IoIosArrowForward  /></button>
      </div>
    </div>
   </div>
  </section>
  </>
}
