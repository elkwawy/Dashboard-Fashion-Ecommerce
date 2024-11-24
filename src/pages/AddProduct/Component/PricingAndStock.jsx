import React from 'react'

export default function PricingAndStock() {
  return <>
  <div className=' border-2 border-gray-300 rounded-lg p-4 mb-6'>
    <h2 className='text-2xl font-semibold'>Pricing and Stock</h2>
    <div className=' grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* base pricing */}
        <div className='flex flex-col items-start justify-center gap-2' >
            <label htmlFor='price'>Base Price</label>
           <input type="text" name='price' placeholder='$...' className='w-full px-2 py-1 border border-gray-300 rounded'/>
        </div>
        {/* stock */}
        <div className='flex flex-col items-start justify-center gap-2'>
            <label htmlFor='stock'>Stock</label>
           <input type="text" name='stock' placeholder='Enter number of stock...' className= 'w-full px-2 py-1 border border-gray-300 rounded'/>
        </div>
        {/* discount */}
        <div className='flex flex-col items-start justify-center gap-2'>
            <label htmlFor='discount'>Discount</label>
           <input type="text" name='discount' placeholder='0%' className= 'w-full px-2 py-1 border border-gray-300 rounded'/>
        </div>

    </div>
  </div>
  
  </>
}
