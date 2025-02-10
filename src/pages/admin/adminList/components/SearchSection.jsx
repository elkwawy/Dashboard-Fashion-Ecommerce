import { memo } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const SearchSection = memo(({onChange}) => {
    const handleSearchTermChange = (e) => { 
        onChange(e.target.value);
    }
    return (
        <div className="sticky top-0 left-0 sm:block md:flex space-y-4 md:space-y-0 items-center justify-between bg-white">
            {/* search input */}
            <div className="relative md:w-[300px] lg:w-[450px] w-full mr-4">
            <input
                type="text"
                placeholder="Search here..."
                onChange={handleSearchTermChange}
                className="w-full p-2 border border-[#B3B3B3] transition focus:outline-main-color rounded"
            />
            <CiSearch className="absolute top-2.5 right-3 text-[#B3B3B3] text-xl" />
            </div>
            {/* add user */}
            <div className="w-full md:w-[159px] rounded bg-main-color py-[9px] flex items-center justify-center">
            <NavLink
                to={"/admin/newAdmin"}
                className="w-full text-center px-4 text-white"
            >
                <FaPlus className="inline-flex -mt-1 mr-0.5" /> Add Admin
            </NavLink>
            </div>
        </div>
    )
})

export default SearchSection