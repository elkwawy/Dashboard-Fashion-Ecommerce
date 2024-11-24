import React from 'react'
import GeneralInfo from './Component/GeneralInfo'
import CategoryCard from './Component/CategoryCard'
import UploadImgCard from './Component/UploadImgCard'
import PricingAndStock from './Component/PricingAndStock'

export default function AddProduct() {
  return<>
  <section>
    <div className='container pb-4'>
    <h2 className='font-semibold text-2xl'>Add New Product</h2>
<div className='bg-white rounded-xl p-4 my-4'>
<div className='grid grid-cols-12 gap-2 md:gap-6'>
    <div className='col-span-12 md:col-span-12 lg:col-span-7 '>
    <GeneralInfo/>
    <PricingAndStock/>

    </div>
    <div className='col-span-12 md:col-span-12 lg:col-span-5  '>
    <UploadImgCard/>
    <CategoryCard/>
    </div>

</div>
{/* buttons */}
<div className='md:flex items-center justify-start gap-6'>
<button className='w-[150px] px-6 py-3 font-bold mt-2 rounded border-2 text-gray-400 mr-4'>Save Draft</button>
<button className='w-[150px] bg-blue-500 text-white px-6 py-3 font-bold mt-2 rounded'>Add Product</button>
</div>
</div>

    </div>
  </section>
  
  </>
}
