import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  deletesubCategory,
  setPage,
  spicificSubcategory,
} from "../../redux/slices/subCategoryslice";
import Loader from "../../utils/Loader";

export default function SubCategory() {
  const { loading, error, subCategory, currentPage, limit } = useSelector(
    (state) => state.subCategory
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const {categoryName} = useParams();
  
  console.log(subCategory);


  const totalPages = subCategory.totalDocuments
    ? Math.ceil(subCategory.totalDocuments / limit)
    : 0;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(spicificSubcategory({ id: id, page: currentPage, limit }));
    }
  }, [dispatch, id, currentPage, limit]);

  const filteredSubCategories = Array.isArray(subCategory.data)
    ? subCategory.data.filter((subcat) =>
        subcat.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handelDelet = async (id) => {
    await dispatch(deletesubCategory({ id }));
  };

  return (
    <section className="-mt-5">
      <div className="bg-white min-h-[500px] rounded-xl p-4 py-6 my-4">
        <div className="md:flex space-y-4 md:space-y-0 items-center justify-between bg-white">
          <div className="relative md:w-[300px] lg:w-[450px] w-full mr-4">
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 inputD"
            />
            <CiSearch className="absolute top-2.5 right-3 text-[#B3B3B3] text-xl" />
          </div>
          <div className="">
            <NavLink
              to={`/categories/${categoryName}/AddNewsubact/${id}`}
              className="w-full text-center px-4 text-white  md:w-[159px] rounded bg-main-color py-[9px] flex items-center justify-center"
            >
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
                    <th className="py-3.5 px-4 text-[18px] font-[600] tracking-wide text-left text-black">
                      SubCategory
                    </th>
                    <th className="px-12 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black">
                      Quantity
                    </th>
                    <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black">
                      Sale
                    </th>
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
                  ) : filteredSubCategories.length > 0 ? (
                    filteredSubCategories.map((subcat) => (
                      <tr key={subcat._id}>
                        <td className="px-2 pl-4 flex items-center justify-start gap-1 py-3 text-sm font-medium text-black whitespace-nowrap">
                          <span>{subcat.name}</span>
                        </td>
                        <td className="px-12 py-3 text-sm text-black whitespace-nowrap">
                          {subcat.SubCategoryProducts?.length || 0}
                        </td>
                        <td className="px-4 py-3 text-sm text-black whitespace-nowrap">
                        {(() => {
                            const discountTotal =
                              subcat.SubCategoryProducts.reduce(
                                (total, product) =>
                                  total +
                                  (product.price - product.priceAfterDiscount),
                                0
                              );

                            return discountTotal > 0
                              ? `${parseFloat(discountTotal.toFixed(10)).toString()} USD`
                              : "No Sale";
                          })()}
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <div className="flex items-center w-fit border border-[#D5D5D5] rounded-md overflow-hidden">
                            <NavLink
                             
                              className="transition-colors hover:bg-gray-100 bg-[#FAFBFD] py-1 px-2 border-r border-[#D5D5D5] duration-200 text-main-color focus:outline-none flex items-center justify-center"
                              to={"/subcat/updatsubact"}
                              state={{ id: subcat._id,name:subcat.name }}
                           
                            >
                              <FaEdit className="w-5 h-5" />
                            </NavLink>

                            <button
                              className="transition-colors hover:bg-gray-100 bg-[#FAFBFD] py-1 px-2 duration-200 text-red-500 focus:outline-none flex items-center justify-center"
                              onClick={() => handelDelet(subcat._id)}
                            >
                              <IoTrashOutline className="w-5 h-5" />
                            </button>

                            {/* Nav to subcat products */}
                            <NavLink
                              to={`/categories/${categoryName}/${subcat.slug}/${subcat._id}`}
                              state={{cateId: id}}
                              className="transition-colors border-l hover:bg-gray-100 bg-[#FAFBFD] py-1 px-2 border-r border-[#D5D5D5] duration-200 text-main-color focus:outline-none flex items-center justify-center"
                            >
                              <FaEye className="w-5 h-5" />
                            </NavLink>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) :filteredSubCategories.length ===0 && searchTerm ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-4 text-gray-500"
                      >
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

      {subCategory ? (
        <div className="flex items-center justify-between">
          <p>
            Showing <span>{subCategory.pageNumber}</span>of
            <span> {totalPages}</span>
          </p>
          <div className="py-2">
            <button
              className="p-2 border border-gray-300 bg-white"
              onClick={handlePreviousPage}
            >
              <IoIosArrowBack />
            </button>
            <button
              className="p-2 border border-gray-300 bg-white"
              onClick={handleNextPage}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
