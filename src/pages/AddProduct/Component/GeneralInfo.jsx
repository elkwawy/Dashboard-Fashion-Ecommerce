import React from 'react'

export default function GeneralInfo() {
    const sizedetails = [
        {size:"xs"},
        {size:"S"},
        {size:"M"},
        {size:"L"},
        {size:"Xl"},
        {size:"2XL"},
    ]

  return <> 
  <div className='space-y-2 border-2 border-gray-300 rounded-lg p-4 mb-6'>
    <h2 className='text-2xl font-semibold'>General Information</h2>
    <div className='space-y-3'>
        {/* name */}
       <div className='flex flex-col items-start justify-between space-y-2 '>
       <label htmlFor='name'>Name Product </label>
       <input type='text' id='name' name='name' placeholder='Enter name product' className='w-full p-2 border border-gray-300 rounded'/>
       </div>
{/* description */}
       <div className='flex flex-col items-start justify-center space-y-2'>
       <label htmlFor=''>Description Product</label>
      <textarea id='description' name='description' placeholder='Enter description Product...' className='w-full h-32 p-2 border border-gray-300 rounded '></textarea>
       </div>
{/* size general */}
<div className='space-y-2 lg:flex items-start justify-between gap-4'>
    {/* size */}
<div className='space-y-2 w-1/2'>
<h3 className='font-semibold'>Size</h3>
<p className='text-gray-500 text-nowrap'>Pick Available Size</p>
<div className='flex gap-2  lg:flex-wrap flex-nowrap max-[335px]:flex-wrap  items-center '>
    {sizedetails.map((size,index)=>
    <span className='py-2 px-2 text-xl bg-gray-200 w-[40px] rounded text-center'>{size.size}</span>
    )}
</div>
</div>
{/* general */}

<div className='space-y-2 w-1/2'>
<h3 className='font-semibold'>Gender</h3>
<p className='text-gray-500 text-nowrap'>Pick Available Gender</p>
<div className='flex items-center lg:flex-wrap max-[349px]:flex-wrap justify-between'>
    <div  className=' '>
    <label htmlFor="men" className="flex items-center space-x-reverse space-x-2">
  <input
    type="radio"
    id="men"
    name="gender"
    value="men"
    className="peer hidden"
  />
  <div className="w-[20px] h-[20px] border border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500">
    <div className="w-[10px] h-[10px] rounded-full border border-gray-400 bg-white peer-checked:bg-blue-500 "></div>
  </div>
  <span>Men</span>
</label>
    </div>
    <div className='flex items-center mx-2 max-[349px]:mx-0 md:mx-0'>
    <label htmlFor="women" className="flex items-center space-x-reverse space-x-2">
  <input
    type="radio"
    id="women"
    name="gender"
    value="women"
    className="peer hidden"
  />
  <div className="w-[20px] h-[20px] border border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500">
    <div className="w-[10px] h-[10px] rounded-full border border-gray-400 bg-white peer-checked:bg-blue-500 "></div>
  </div>
  <span>Women</span>
</label>
    </div>

    <div  className=''>
    <label htmlFor="children" className="flex items-center space-x-reverse space-x-2">
  <input
    type="radio"
    id="children"
    name="gender"
    value="children"
    className="peer hidden"
  />
  <div className="w-[20px] h-[20px] border border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500">
    <div className="w-[10px] h-[10px] rounded-full border border-gray-400 bg-white peer-checked:bg-blue-500 "></div>
  </div>
  <span>Children</span>
</label>
    </div>
</div>
</div>
</div>
    </div>
   
  </div>
  
  </>
}
