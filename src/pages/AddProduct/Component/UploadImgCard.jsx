import React from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'

export default function UploadImgCard() {
  return <>
  <div className='h-[570px] space-y-4 border-2 border-gray-300 rounded-lg p-4 mb-6'>
  <h2 className='text-2xl font-semibold'>Upload Img</h2>
  {/* upload img */}
    <div className='w-full border-2  border-blue-500 rounded-lg p-4 border-dashed '>
     
      <div className='min-h-[344px] flex flex-col items-center justify-center space-y-2 text-xl text-center'>
      <div><BiImageAdd className='text-6xl text-blue-500'/></div>
      <p className='w-[90%] sm:w-[90%] md:w-[80%] lg:w-[60%] text-center'>Drop your images here or select <a href='#' className='text-blue-500'>click to browse</a></p>
      </div>

    </div>
    {/*  */}
   <div className='w-full   grid grid-cols-3 gap-4'>
   <div className='w-full h-[90px] flex items-center justify-center border-2 m-auto border-blue-500 rounded-lg p-4 border-dashed '>
    <div className='bg-blue-100 text-blue-500 p-2 rounded-full'><FaPlus  className='text-2xl  '/></div>
    </div>

    <div className='w-full h-[90px] flex items-center justify-center border-2 m-auto border-blue-500 rounded-lg p-4 border-dashed '>
    <div className='bg-blue-100 text-blue-500 p-2 rounded-full'><FaPlus  className='text-2xl  '/></div>
    </div>

    <div className='w-full h-[90px] flex items-center justify-center border-2 m-auto border-blue-500 rounded-lg p-4 border-dashed '>
    <div className='bg-blue-100 text-blue-500 p-2 rounded-full'><FaPlus  className='text-2xl  '/></div>
    </div>
   </div>

  </div>
  
  </>
}
