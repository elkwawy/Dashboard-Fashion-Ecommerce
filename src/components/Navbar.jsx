import { memo } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logUserOut } from "../redux/slices/userSlice";

const Navbar = memo(({sidebar, openSidebar}) => {

    const dispatch = useDispatch()
    const logout = ()=>{
        dispatch(logUserOut())
    }
    const {user, status, error} = useSelector((state) => state.user);
    
    return (
        <div className="w-full border-b-2 px-5 py-2 flex justify-between items-center">
            <div className="flex gap-3 items-start">
                {<button onClick={openSidebar} className={`w-10 h-10 ${sidebar ? "opacity-0  pointer-events-none" : " opacity-100 -translate-x-2"} rounded-md trans hover:bg-gray-200 flex items-center justify-center`}>
                    <TbLayoutSidebarLeftExpandFilled className="text-3xl" />
                </button>}
                <Link to={'/dashboard'} className={`outline-0 max-[260px]:text-2xl text-3xl font-bold ${sidebar ? "-translate-x-[52px]" : " -translate-x-2 "} transition-all duration-500`}>Logo</Link>
            </div>
            <div className="flex items-center max-[700px]:gap-2 gap-5 -mr-2">
                {/* User */}
                <div className="flex  gap-1 p-1 rounded-md trans hover:bg-gray-100 cursor-pointer items-center">
                    {/* IMG */}
                    <div className="w-8 h-8 bg-gray-300 rounded-full " />
                    {user && <span className="max-[700px]:hidden">{user.name}</span>}
                    {status === "loading" && <span className="h-4 w-28 bg-gray-100 animate-pulse max-[700px]:hidden"></span>}
                    <FaAngleDown className="mt-0.5 max-[700px]:hidden" />
                    {/* Arrowdown */}
                </div>

                {/* Logout */}
                <button onClick={logout} className="p-2 rounded-md trans hover:bg-gray-100">
                    <IoIosLogOut className="text-2xl cursor-pointer " />
                </button>
            </div>
        </div>
    )
})

export default Navbar