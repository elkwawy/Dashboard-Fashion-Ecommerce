import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { getAllOrders, setPage } from '../../redux/slices/orderSlice';
import { CiSearch } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa6';
import Loader from '../../utils/Loader';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoEyeSharp, IoTrashOutline } from 'react-icons/io5';


export default function Orders() {
    const { loading, error, orders,currentPage ,limit } = useSelector((state) => state.orderSlice);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [update,setApdate] = useState(false)
  const [viewOrders,setViewOrders] = useState(false)
  
     console.log(orders);
     

  useEffect(() => {
   
      dispatch(getAllOrders());
    
  }, [dispatch, currentPage ,limit]);
  const handleOrderClick = (order) => {
    navigate(`/order/orderDetails/${order._id}`, { state: { order } });
  };

  const filteredorders = Array.isArray(orders)
  ? orders.filter((order) =>
      order.shippingAddress.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  
  return (
    <section className="-mt-5 relative">
    <div className="bg-white min-h-[500px] rounded-xl p-4 py-6 my-4">
      <div className="md:flex space-y-4 md:space-y-0 items-center justify-between bg-white">
        <div className="relative md:w-[300px] lg:w-[450px] w-full mr-4">
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-[#B3B3B3] transition focus:outline-main-color rounded"
          />
          <CiSearch className="absolute top-2.5 right-3 text-[#B3B3B3] text-xl" />
        </div>
        
      </div>

      <div className="flex flex-col mt-5">
        <div className="inline-block min-w-full">
          <div className="inline-block min-w-full max-w-[250px] overflow-y-auto overflow-x-auto border border-[#D5D5D5] md:rounded">
            <table className="min-w-full">
              <thead className="bg-[#F8F9FC] border-b border-[#D5D5D5]">
                <tr>
                  <th className="py-3.5 px-4 text-[18px] font-[600] tracking-wide text-left text-black text-nowrap">userId</th>
                  <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black text-nowrap">Total Price</th>
                  <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black text-nowrap">Payment Status</th>
                  <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black">Phone</th>
                  <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black">
               Actions
              </th>
                </tr>
              </thead>
              <tbody className="divide-y relative divide-gray-[#D5D5D5]">
                {loading ? (
                  <tr className="relative h-[325px]">
                    <td colSpan="4" className="relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader />
                      </div>
                    </td>
                  </tr>
                ) : filteredorders.length > 0 ? (
                  filteredorders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-4 py-3 text-sm text-black whitespace-nowrap cursor-pointer" onClick={() => handleOrderClick(order)}>
                          {order.user}
                      </td>
                      
                     
                      <td className="px-4 py-3 text-sm text-black whitespace-nowrap">
                      {parseFloat((order.totalOrderPrice).toFixed(10)).toString()}
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                      {order.isPaid ? <div className='bg-green-100 px-2 py-1 text-green-800 rounded-lg min-w-[30px] max-w-[70px] text-center'>Paid</div> : <div className='bg-red-100 px-2 py-1 text-red-800 rounded-lg w-fit'>Not Paid</div>}
                      </td>
                      <td className="px-4 py-3 text-sm text-black whitespace-nowrap">
                      {order.shippingAddress.phone}
                      </td>

                      <td className='px-4 py-3 text-xl whitespace-nowrap text-[#3b82f6] cursor-pointer '  onClick={() => handleOrderClick(order)}>
                      
                        <IoEyeSharp />

                      
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No results found for "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

   

  </section>
  )
}
