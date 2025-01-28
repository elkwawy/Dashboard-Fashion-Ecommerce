import React, { useEffect, useState } from 'react'
import { getAlcategories, setId } from '../../../redux/slices/CategorySlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../utils/Loader'
import {  specificCategory } from '../../../redux/slices/CategorySlice'



export default function GeneralInfo({ product, setProduct }) {
const { categories,loading,error} = useSelector((state)=>state.categorySlice)
  const [nameErorr,setnameErorr] = useState("")
  const [descError,setdescError] = useState("")
  const [selectedSizes, setSelectedSizes] = useState([])

  const dispatch = useDispatch()
 

  const nameRegex = /^.{3,}$/
  const descRegex = /^.{10,}$/

  useEffect(()=>{
    if(product.name.trim() !== "" &&  !nameRegex.test(product.name)){
      setnameErorr("min 3 letters")
    }else{
      setnameErorr("")
    }

    if(product.Desc.trim() !== ""&&!descRegex.test(product.Desc)){
      setdescError("min 10 letters")
    }else{
      setdescError("")
    }
  },[product.name,product.Desc])

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

  
  const handelSize = (e) => {
    const selectedSize = e.target.value;

    setProduct((prev) => {
      const updatedSizes = prev.size.includes(selectedSize)
        ? prev.size.filter((size) => size !== selectedSize) 
        : [...prev.size, selectedSize]; 
      return {
        ...prev,
        size: updatedSizes,
      };
    });

    setSelectedSizes((prev) => {
      return prev.includes(selectedSize)
        ? prev.filter((size) => size !== selectedSize) 
        : [...prev, selectedSize]; 
    });
  };
  
 
useEffect(()=>{
  dispatch(getAlcategories())
},[dispatch])


const handelCategory = (e) => {
  const {id, value } = e.target;

  setProduct((prev) => {
    if (prev.category !== value) {
      dispatch(setId({ id: id }));
    }

    return {
      ...prev,
      category: value,
    };
  });
};




  return <> 
  <form className='space-y-2 border-2 border-gray-300 rounded-lg p-4 mb-6' >
    <h2 className='text-2xl font-semibold'>General Information</h2>
    <div className='space-y-3'>
        {/* name */}
       <div className='flex flex-col items-start justify-between space-y-2 '>
       <label htmlFor="name" className='flex items-center justify-between w-full'><span className=' '>Product Name</span>{nameErorr &&<span className='text-nowrap bg-red-200 text-red-600 text-sm px-2 rounded'>{nameErorr}</span>}</label>
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
       <label htmlFor='' className='flex items-center justify-between w-full'><span>Product Description</span> {descError && <span className='text-sm bg-red-200 text-red-600 px-2 rounded'>{descError}</span>}</label>
      <textarea id='description' name='description' value={product.Desc} placeholder='Enter description Product...' className='w-full h-32 p-2 border border-gray-300 rounded ' onChange={handleDescription}></textarea>
       </div>
{/* size general */}

    {/* size */}

    <div className="flex flex-wrap  gap-x-4">
  {/* Size Section */}
  <div className="space-y-2 ">
    <h3 className="font-semibold">Size</h3>
    <p className="text-gray-500 text-nowrap">Pick Available Size</p>
    <div className="flex items-center md:flex-wrap flex-wrap gap-2">
      <div className="flex items-center max-[1290px]:flex-wrap gap-2">
        {["S", "M", "L", "XL", "XXL"].map((size, index) => (
          <div
            key={index}
            className="peer py-2 px-2 cursor-pointer text-xl rounded text-center max-w-[55px]"
          >
            <label
              htmlFor={`size-${index}`}
              className="flex items-center justify-center"
            >
              <input
                type="checkbox"
                name="size"
                id={`size-${index}`}
                className="hidden peer"
                onChange={handelSize}
                value={size}
                checked={product.size.includes(size)}
              />
              <div
                className={`py-2 px-2 text-xl w-[40px] rounded flex items-center justify-center ${
                  selectedSizes.includes(size)
                    ? "bg-gray-200 text-gray-700"
                    : "bg-blue-500 text-white"
                }`}
              >
                {size}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Category Section */}
  <div className="space-y-2">
    <h3 className="font-semibold">Category</h3>
    <p className="text-gray-500 text-nowrap">Pick Available Category</p>
    <div className="flex items-center   py-4 max-[950px]:py-0 lg:flex-wrap max-[372px]:flex-wrap justify-between">
      {categories ? (
        categories.map((category) => (
          <div className=" " key={category._id}>
            <label
              htmlFor={category._id}
              className="flex items-center space-x-reverse space-x-2"
            >
              <input
                type="radio"
                id={category._id}
                name="category"
                value={category._id }
                checked={product.category === category._id}
                className="peer hidden"
                onChange={handelCategory}
              />
              <div className="w-[20px] h-[20px] border border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500">
                <div className="w-[10px] h-[10px] rounded-full border border-gray-400 bg-white peer-checked:bg-blue-500"></div>
              </div>
              <span>{category.name}</span>
            </label>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      )}
    </div>
  </div>
</div>

    </div>
   
  </form>
  
  </>
}
