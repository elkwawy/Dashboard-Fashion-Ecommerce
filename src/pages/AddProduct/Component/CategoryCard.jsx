import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

export default function CategoryCard() {
  return <>
  <div className=' space-y-2 border-2 border-gray-300 rounded-lg p-4 mb-6'>
    <h2 className=' text-2xl font-semibold'>Category</h2>
    <form className='flex flex-col items-start justify-center gap-2 '>
   <div className='relative space-y-2 w-full'>
   <label htmlFor="productCategory">Product Category</label>
<input list="category" name="category" id="category" placeholder="" className='w-full px-2 py-1 border border-gray-300 rounded'/>
<IoIosArrowDown className='absolute bottom-2 right-3' />
   </div>
<button className='bg-blue-500 text-white px-6 py-3 font-bold mt-2 rounded'>Add Category</button>
        </form>
    

  </div>
  
  </>
}
