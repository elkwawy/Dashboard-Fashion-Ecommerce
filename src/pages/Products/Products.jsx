import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { allProduct, setPage } from '../../redux/slices/productslice'
import Loader from '../../utils/Loader'


export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const dispatch = useDispatch()
  const {product, loading, error,currentPage, limit} = useSelector((state)=>state.productSlice)
 
const totalPages = product.totalDocuments ? Math.ceil(product.totalDocuments / limit) : 0;
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    } else {
      dispatch(setPage(1));
    }
  };
  

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    } else {
      dispatch(setPage(totalPages));
    }
  };

  
  useEffect(() => {
    dispatch(allProduct({ page: currentPage, limit, search: searchQuery  }));
    
  }, [dispatch, currentPage, limit,searchQuery]);

   
  return <>
  <section className=''>
   <div className='py-2'>
   <div className='bg-white min-h-screen rounded-xl p-4 my-4'>
     
<div className='bg-gray-100  my-4 '>
{/* search input and add link */}
<div className='md:flex space-y-4 md:space-y-0 items-center justify-between bg-white'>
  {/* search input */}
<div className='relative md:w-[300px] lg:w-[500px] w-full '>
  <input type='text' placeholder='Search here...' className='w-full p-2 border border-gray-300 rounded' 
  value={searchQuery}
  onChange={(e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() !== '') {
      dispatch(allProduct({ page: currentPage, limit, search: value }));
    }
  }}
  
  />
  <CiSearch className='absolute top-3 right-3' />
</div>
{/* add product */}
<div className='w-full md:w-[220px]  bg-blue-500 py-2 flex items-center justify-center'>
  <NavLink to={'/products/newProduct'} className='w-full flex items-center justify-center  px-4  rounded text-white  text-semibold'><FaPlus className='inline-flex mr-2'/> Add New Product</NavLink>
</div>

</div>

</div>
{/* cards */}
{product?.data?.length === 0 && !loading && !error ?(
  <div className="text-center h-screen text-gray-500 py-4">
    <p>No Results Found</p>
  </div>
) : ( <ProductCard />) }
 
    </div>
{/* numbers of page */}

    {product ? <div className='flex items-center justify-between'><p>Showing <span>{product.pageNumber}</span>of <span>{totalPages}</span></p>
      <div className='py-2'>
        <button className='p-2 border border-gray-300 bg-white' onClick={handlePreviousPage}  disabled={currentPage === 1}><IoIosArrowBack /></button>
        <button className='p-2 border border-gray-300 bg-white' onClick={handleNextPage}><IoIosArrowForward  /></button>
      </div> 
      </div>:""}
    </div>
  
  
  </section>
  </>
}
