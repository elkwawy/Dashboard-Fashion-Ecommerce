import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaPlus } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../../utils/Loader";
import { deleteCategory, getAlcategories } from "../../redux/slices/CategorySlice";
import { list } from "postcss";



export default function AllCategory() {
    const [searchTerm, setSearchTerm] = useState("");
   const {categories,loading,error} = useSelector((state)=>state.categorySlice)
    const dispatch = useDispatch();
    const { id } = useParams();
  
  
    useEffect(() => {
      if (id) {
        dispatch(getAlcategories());
      }
    }, [dispatch, id]);
  
    const filteredCategories = Array.isArray(categories)
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  
    

    const handelDelet = async(id)=>{
      await dispatch(deleteCategory({id}))
    }
    
    return (
      <section className="-mt-5">
        <div className="bg-white rounded-xl p-4 py-6 my-4">
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
            <div className="w-full md:w-[159px] rounded bg-main-color py-[9px] flex items-center justify-center">
              <NavLink to={`/addNewCategory`} className="w-full text-center px-4 text-white">
                <FaPlus className="inline-flex mr-2" /> Add New
              </NavLink>
            </div>
          </div>
  
          <div className="flex flex-col mt-5">
            <div className="inline-block min-w-full">
              <div className="inline-block min-w-full max-w-[250px] overflow-y-auto overflow-x-auto border border-[#D5D5D5] md:rounded">
                <table className="min-w-full">
                  <thead className="bg-[#F8F9FC] border-b border-[#D5D5D5]">
                    <tr>
                      <th className="py-3.5 px-4 text-[18px] font-[600] tracking-wide text-left text-black">Category</th>
                      <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black">Actions</th>
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
                    ) : filteredCategories.length > 0 ? (
                      filteredCategories.map((cat) => (
                        <tr key={cat._id}>
                          <td className="px-2 flex items-center justify-start gap-1 py-3 text-sm font-medium text-black whitespace-nowrap">
                            <img
                              src={cat.image || "/shop-clothing-clothes-shop-hanger-modern-shop-boutique.jpg"}
                              alt={cat.name}
                              className="min-w-14 w-14 h-14 min-h-14 rounded-lg"
                            />
                            <span>{cat.name}</span>
                          </td>
                          
                          
                          <td className="px-4 py-3 text-sm whitespace-nowrap">
                            <div className="flex items-center w-fit border border-[#D5D5D5] rounded-md overflow-hidden">
                              <NavLink
                              
                                to={`/cattegory/updatCategory/${cat._id}`}
                                className="transition-colors bg-[#FAFBFD] py-1 px-2 border-r border-[#D5D5D5] duration-200 text-main-color focus:outline-none flex items-center justify-center"
                              >
                                <FaEdit className="w-5 h-5" />
                              </NavLink>
                              
                              <button
                                className="transition-colors bg-[#FAFBFD] py-1 px-2 duration-200 text-red-500 focus:outline-none flex items-center justify-center"
                                onClick={() => handelDelet(cat._id)}
                              >
                                <IoTrashOutline className="w-5 h-5" />
                              </button>
                            </div>
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
