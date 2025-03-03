import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAllOrders, setPage } from '../../redux/slices/orderSlice';
import { CiSearch } from 'react-icons/ci';
import { FaEye, FaPlus } from 'react-icons/fa6';
import Loader from '../../utils/Loader';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoEyeSharp, IoTrashOutline } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import Cookies from "js-cookie";


export default function Orders() {
    const { loading, error, orders,currentPage ,limit } = useSelector((state) => state.orderSlice);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [update,setApdate] = useState(false)
  const [viewOrders,setViewOrders] = useState(false)
  const location = useLocation()
 const [Loading,setLoading] =useState(false)
  const [users, setUsers] = useState([]);
  
     console.log(orders);
     
     const fetchUserName = async (id) => {
      if (!id) return "unknown user";
      const token = JSON.parse(Cookies.get("token"));
     
      try {
      } catch (error) {
        
        return "unknown user";
      }
    
      try {
        const res = await fetch(`https://ecommerce-dot-code.vercel.app/api/user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        });
    
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
    
        const userData = await res.json();
        return userData?.data?.name || "unknown user";  
      } catch (error) {
        return "unknown user";
      }
    };
    
    
     useEffect(() => {
      const fetchAllUsers = async () => {
        setLoading(true);
    
        const userMap = {};
        await Promise.all(
          orders.map(async (order) => {
            if (!userMap[order.user]) {
              userMap[order.user] = await fetchUserName(order.user);
            }
          })
        );
    
        setUsers(userMap);
        setLoading(false);
      };
    
      if (orders.length > 0) {
        fetchAllUsers();
      }
    }, [orders]);
    
     

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
                  <th className="py-3.5 px-4 text-[18px] font-[600] tracking-wide text-left text-black text-nowrap">name</th>
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
                {users[order.user] || <div className='w-20 h-4 rounded bg-gray-300'> </div>}
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

                       <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                <div className="flex items-center w-fit border border-[#D5D5D5] rounded-md overflow-hidden">
                                                  <NavLink
                                                   
                                                    className="transition-colors hover:bg-gray-100 bg-[#FAFBFD] py-1 px-2 border-r border-[#D5D5D5] duration-200 text-main-color focus:outline-none flex items-center justify-center"
                                                    to={""}
                                                  >
                                                    <FaEdit className="w-5 h-5" />
                                                  </NavLink>
                                                  <div
                                                    onClick={()=>{ handleOrderClick(order)}}
                                              
                                                    className="cursor-pointer transition-colors border-l hover:bg-gray-100 bg-[#FAFBFD] py-1 px-2 border-r border-[#D5D5D5] duration-200 text-main-color focus:outline-none flex items-center justify-center"
                                                  >
                                                    <FaEye className="w-5 h-5" />
                                                  </div>


                                                   <button
                                                 className="transition-colors bg-[#FAFBFD] py-1 px-2 duration-200 text-red-500 focus:outline-none flex items-center justify-center" >
                                                                                <IoTrashOutline className="w-5 h-5" />
                                                                              </button>
                                                </div>
                                              </td>
                    </tr>
                  ))
                ) :filteredorders.length === 0 && searchTerm ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No results found for "{searchTerm}"
                    </td>
                  </tr>
                ):( <tr className="relative h-[325px]">
                  <td colSpan="4" className="relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Loader />
                    </div>
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </section>
  )
}
