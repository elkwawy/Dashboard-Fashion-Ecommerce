import React, { useEffect, useState } from 'react'
import GeneralInfo from './Component/GeneralInfo'
import SubCategoryCard from './Component/SubCategoryCard'
import UploadImgCard from './Component/UploadImgCard'
import PricingAndStock from './Component/PricingAndStock'
import { addProduct, updateProduct } from '../../redux/slices/addProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'


export default function AddProduct() {
const [disableBtn, setDisableBtn] = useState(false)
const [updateBtn, setUpdateBtn] = useState(false)
const [updatetext, setUpdatettext] =useState(false) 
const location = useLocation()
const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name:"",
    Desc: "",
    image:null ,
    size:[],
    images: [],
    size:[],
    price: 0,
    priceAfterDiscount:0,
    soldItems: 0,
    stock:0,
    colors: ["#000000", "#000000", "#000000"],
    category:"",
    SubCategory: "",
    priceAfterDiscount:0,
    Brand: "",
    rateavg: 0,
    rateCount:0,
  });
  

  
  useEffect(() => {
    if (
      location.state?.product){
        setProduct({
          name:location.state.product.name,
          Desc: location.state.product.Desc,
          image: location.state.product.image,
          size:location.state.product.size,
          images:location.state.product.images,
          price: location.state.product.price,
          priceAfterDiscount:location.state.product.priceAfterDiscount,
          soldItems: 0,
          stock:location.state.product.stock,
          colors: [],
          category:location.state.product.category,
          SubCategory: location.state.product.subCategory,
          rateavg: 0,
          rateCount:0,
        }
         
        )
        console.log(location.state.product);
        setUpdateBtn(true);
        setUpdatettext(true)
      }
  }, [location.state])


  const handleAddProduct = () => {
    dispatch(addProduct({product}));
    setDisableBtn(true);
    setTimeout(() => {
    setDisableBtn(false);
     },3000);
    console.log(product);
  };
  
   const handelupdate = () =>{
    dispatch(updateProduct({id: location.state.product._id, product}));
    setDisableBtn(true)
    setTimeout(() => {
    setDisableBtn(false);
     },3000);
    console.log(product);
    setUpdateBtn(true);
   }
 

  return<>
  <section>
    <div className='pb-4'>
    <h2 className='font-semibold text-2xl'>{updatetext? "Update Product" : "Add New Product"}</h2>
<div className='bg-white rounded-xl p-4 my-4'>
<div className='grid grid-cols-12 gap-2 md:gap-6'>
    <div className='col-span-12 md:col-span-12 lg:col-span-7 '>
    <GeneralInfo product={product} setProduct={setProduct}/>
    <PricingAndStock product={product} setProduct={setProduct}/>

    </div>
    <div className='col-span-12 md:col-span-12 lg:col-span-5  '>
    <UploadImgCard  product={product} setProduct={setProduct}/>
    <SubCategoryCard product={product} setProduct={setProduct}/>
    </div>

</div>
{/* buttons */}
<div className='md:flex items-center justify-start gap-6'>
<button className='w-[150px] px-6 py-3 font-bold mt-2 rounded border-2 text-gray-400 mr-4'>Save Draft</button>
{updateBtn? <button className={`w-[150px]  text-white px-6 py-3 font-bold mt-2 rounded  ${disableBtn ? "opacity-50 pointer-events-none bg-gray-400 " : 
  "bg-blue-500 "}`} disabled={disableBtn}  onClick={handelupdate}>Update</button>:(<button className={`w-[150px] text-white px-6 py-3 font-bold mt-2 rounded  ${disableBtn ? "opacity-50 pointer-events-none bg-gray-400 " : 
  "bg-blue-500 "}`} disabled={disableBtn} onClick={handleAddProduct}>Add Product</button>)}
</div>
</div>

    </div>
  </section>
  
  </>
}
