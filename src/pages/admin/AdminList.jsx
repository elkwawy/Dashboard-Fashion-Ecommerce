import { IoMdAdd } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
const AdminList = () => {
    return (
        <div className="bg-white w-full p-5 flex flex-col gap-5 rounded-md">
            <div className="w-full flex justify-between">
                {/* Search */}
                <div className="relative w-1/3 group">
                    <input type="text" className="p-1.5  border-gray-400 rounded-sm placeholder:text-gray-400  border-[1px] w-full outline-1 trans outline-main-color" placeholder="Search here..." />
                    <IoIosSearch className="absolute top-1/2 -translate-y-1/2 right-2 text-xl text-gray-400 trans group-focus-within:text-black " />
                </div>
                <button className="px-3 py-1 gap-1 rounded-sm bg-main-color trans hover:bg-blue-600 text-white flex items-center">
                    <IoMdAdd className="text-lg mt-0.5" /> 
                    Add New
                </button>
            </div>
        </div>
    )
}

export default AdminList