import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Loader from "../../utils/Loader";
import useUserHook from "../../hooks/useUserHook";
export default function UsersList() {
  const { getAllUsers, users, loading, totalUsers, deleteUser, runUseEffect } =
    useUserHook();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getAllUsers(
      `?role=user&limit=${usersPerPage}&sort=-createdAt&page=${currentPage}&search=${searchTerm}`
    );
  }, [currentPage, runUseEffect, searchTerm]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const navigate = useNavigate();

  const handelUpdate = (user) => {
    navigate(`/user/updateUser/${user._id}`, {
      state: { user },
    });
  };

  return (
    <section className="-mt-5">
      <div className="bg-white rounded-xl p-4 py-6 my-4">
        {/* search input and add user link */}
        <div className="md:flex space-y-4 md:space-y-0 items-center justify-between bg-white">
          {/* search input */}
          <div className="relative md:w-[300px] lg:w-[450px] w-full mr-4">
            <input
              type="text"
              placeholder="Search here..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-[#B3B3B3] transition focus:outline-main-color rounded"
            />
            <CiSearch className="absolute top-2.5 right-3 text-[#B3B3B3] text-xl" />
          </div>
          {/* add user */}
          <div className="w-full md:w-[159px] rounded bg-main-color py-[9px] flex items-center justify-center">
            <NavLink
              to={"/user/newUser"}
              className="w-full text-center px-4 text-white"
            >
              <FaPlus className="inline-flex mr-2" /> Add User
            </NavLink>
          </div>
        </div>

        {/* users table */}
        <div className="flex flex-col mt-5">
          <div className="inline-block min-w-full">
            <div className="inline-block min-w-full max-w-[250px] overflow-y-auto overflow-x-auto border border-[#D5D5D5] md:rounded">
              <table className="min-w-full">
                <thead className="bg-[#F8F9FC] border-b border-[#D5D5D5]">
                  <tr>
                    <th className="py-3.5 px-4 text-[18px] font-[600] tracking-wide text-left text-black  ">
                      Id
                    </th>
                    <th className="px-12 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black ">
                      Name
                    </th>
                    <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black ">
                      Email
                    </th>
                    <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y relative divide-gray-[#D5D5D5]">
                  {loading && !searchTerm ? (
                    <tr className="relative h-[325px]">
                      <td colSpan="4" className="relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <Loader />
                        </div>
                      </td>
                    </tr>
                  ) : users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user._id}>
                        <td className="px-4 py-3 text-sm font-medium text-black whitespace-nowrap">
                          {index + 1 + (currentPage - 1) * usersPerPage}
                        </td>
                        <td className="px-12 py-3 text-sm text-black whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-black whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <div className="flex items-center w-fit border border-[#D5D5D5] rounded-md overflow-hidden">
                            <button
                              onClick={() => handelUpdate(user)}
                              className="transition-colors bg-[#FAFBFD] py-1 px-2 border-r border-[#D5D5D5] duration-200 text-main-color focus:outline-none flex items-center justify-center"
                            >
                              <FaEdit className="w-5 h-5" />
                            </button>
                            <button
                              className="transition-colors bg-[#FAFBFD] py-1 px-2 duration-200 text-red-500 focus:outline-none flex items-center justify-center"
                              onClick={() => deleteUser(user._id)}
                            >
                              <IoTrashOutline className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : users.length === 0 && searchTerm ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-4 text-gray-500"
                      >
                        No results found for "{searchTerm}"
                      </td>
                    </tr>
                  ) : (
                    <tr className="relative h-[325px]">
                      <td colSpan="4" className="relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <Loader />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* pagination controls */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 font-[600] text-sm">
          Showing {Math.min((currentPage - 1) * usersPerPage + 1, totalUsers)}-
          {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers}
        </p>
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-1.5 border border-gray-300 bg-white"
          >
            <IoIosArrowBack className="text-gray-600 text-xl hover:text-main-color transition-colors duration-200" />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-1.5 border border-gray-300 bg-white"
          >
            <IoIosArrowForward className="text-gray-600 text-xl hover:text-main-color transition-colors duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
}
