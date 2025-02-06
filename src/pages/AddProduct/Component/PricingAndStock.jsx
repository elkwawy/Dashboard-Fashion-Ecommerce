import React, { useEffect, useState } from 'react'

export default function PricingAndStock({ product, setProduct }) {
  const [priceErorr, setPriceErorr] = useState("")
  const [discount,setDiscount] = useState(0)

  const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/
  

  useEffect(()=>{
    if( priceRegex.test(product.price)){
      setPriceErorr("")
    }else{
      setPriceErorr("price must be a number")
    }
  },[product.price])

  const handelPrice = (e)=>{
    setProduct((prev)=>{
      const updatedProduct = {...prev}
      updatedProduct.price = e.target.value
      return updatedProduct
    })
  }

  const handelStock = (e)=>{
    setProduct((prev)=>{
      const updatedProduct = {...prev}
      updatedProduct.stock =e.target.value
      return updatedProduct
    })
  }
  
  

  const priceAfterDiscount = (e) => {
    const newPriceAfterDiscount = e.target.value; 
    setProduct((prev) => {
      const updatedProduct = { ...prev };
      updatedProduct.priceAfterDiscount = newPriceAfterDiscount; 
      return updatedProduct;
    });
  
    setDiscount(product.price 
      ? product.price - newPriceAfterDiscount
      : 0);
  };
  



  return <>
  <div className=' border-2 border-gray-300 rounded-lg p-4 mb-6'>
    <h2 className='text-2xl font-semibold'>Pricing and Stock</h2>
    <div className=' grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* base pricing */}
        <div className='flex flex-col items-start justify-center gap-2' >
            <label htmlFor='price' className='flex justify-between items-center w-full'><span>Base Price</span>{priceErorr && <span className='bg-red-200 text-sm text-red-600 px-2 rounded'>{priceErorr}</span>}</label>
           <input type="text" name='price' placeholder='$...' value={product.price} className='w-full px-2 py-1 border border-gray-300 rounded' onChange={handelPrice}/>
        </div>
        {/* stock */}
        <div className='flex flex-col items-start justify-center gap-2'>
            <label htmlFor='stock'>Stock</label>
           <input type="text" name='stock' placeholder='Enter number of stock...' value={product.stock} className= 'w-full px-2 py-1 border border-gray-300 rounded' onChange={handelStock}/>
        </div>


        {/* price after discount */}
        <div className='flex flex-col items-start justify-center gap-2'>
            <label htmlFor='priceafterdiscount'>Price After Discount</label>
           <input type="text" name='priceafterdiscount' placeholder='0%' value={product.priceAfterDiscount} className= 'w-full px-2 py-1 border border-gray-300 rounded' onChange={priceAfterDiscount}/>
        </div>
        {/* discount */}
        <div className='flex flex-col items-start justify-center gap-2'>
            <label htmlFor='discount'>Discount</label>
           <input type="text" name='discount' placeholder='0%' value={discount} className= 'w-full px-2 py-1 border border-gray-300 rounded'  />
        </div>

    </div>
  </div>
  
  </>
}
