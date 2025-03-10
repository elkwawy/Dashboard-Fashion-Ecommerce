import { memo, useCallback, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins } from "../../../../redux/slices/adminsSlice";
import Loader from "../../../../utils/Loader";
import { deleteAdmin } from "../../../../redux/slices/adminsSlice";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import { showToast } from "../../../../utils/showToast";

const RenderedAdmins = memo(({token, page, searchTerm}) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [clickedAdmin, setClickedAdmin] = useState(null);
    const currentUser = useSelector((state) => state.user.user);
    const { admins, totalAdmins, status, error} = useSelector((state) => state.admins);
    const dispatch = useDispatch();
    const openDeleteModal = useCallback((admin) => {
        setClickedAdmin(admin);
        setIsDeleteModalOpen(true);
    }, []);
    const openUpdateModal = useCallback((admin) => {
        setClickedAdmin(admin);
        setIsUpdateModalOpen(true);
    }, []);
    useEffect(() => {
        if (token) {
            dispatch(getAdmins({ page: searchTerm ? 1 : page, searchTerm }));
        }
    }, [page, searchTerm, token]);  // Removed 'dispatch' from dependencies

    const closeDeleteModal = () => {
        setClickedAdmin(null);
        setIsDeleteModalOpen(false);
    };
    const closeUpdateModal = () => {
        setClickedAdmin(null);
        setIsUpdateModalOpen(false);
    };

    const confirmDelete = () => {
        if (currentUser && currentUser.email !== import.meta.env.VITE_SUPER_ADMIN_EMAIL) { 
            showToast("error", "You aren't allowed to deleta an admin");
            return;
        }
        if (clickedAdmin && currentUser) {
            dispatch(deleteAdmin({ id: clickedAdmin._id, currentUser }));
        }
        closeDeleteModal();
    };
    if (!isUpdateModalOpen && status == 'failed') 
        return <div className="w-full min-h-[370px] flex items-center justify-center font-bold text-xl">
            {typeof error === "string" ? error : error?.message || "An error occurred"}
        </div>;
    return (
        <>
            <div className="relative max-sm:w-[200%] sm:max-w-[100%] min-h-[370px] ">
                <div className="w-full ">
                    <table className="w-full text-sm text-left rounded-md  border-[1px] table-fixed lg:table-auto">
                        <thead className="bg-[#F8F9FC] border-b-[1px] font-bold text-gray-600">
                            <tr>
                                <th scope="col" className="px-2 lg:px-6 py-3 font-semibold">
                                    Admin
                                </th>
                                <th scope="col" className="px-2 lg:px-6 py-3 font-semibold">
                                    Email
                                </th>
                                <th scope="col" className="px-2 lg:px-6 py-3 font-semibold">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="min-h-[325px]">
                            {
                                status == "loading" ? 
                                <tr className="relative  min-h-[325px] h-[325px]">
                                    <td colSpan="3" className="relative">
                                        <div className="absolute top-1/2 left-1/4 sm:left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <Loader />
                                        </div>
                                    </td>
                                </tr> : 
                                (
                                    admins.length > 0  ? admins.map(admin => (
                                    <tr key={`${admin._id}${admin.name}`} className="bg-white border-b hover:bg-gray-50 trans">
                                        <th scope="row" className="px-2 lg:px-6 py-2 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                            <p className="text-ellipsis">{admin.name}</p>
                                        </th>
                                        <td className="px-2 lg:px-6 py-2  overflow-hidden text-ellipsis">
                                            {admin.email}
                                        </td>
                                        <td className="px-2 lg:px-6 py-2">
                                            <div  className="flex border-[1px] rounded-sm w-fit">
                                                <button onClick={() => openUpdateModal(admin)} className="p-2 px-3 trans bg-gray-100  border-r-[1px] border-gray-400 hover:bg-gray-200">
                                                    <FaRegEdit className="text-lg text-gray-400" />
                                                </button>
                                                <button onClick={() => openDeleteModal(admin)} className="p-2 px-3 trans bg-gray-100  border-gray-600 hover:bg-gray-200">
                                                    <RiDeleteBin5Line className="text-red-500 text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : 
                                (
                                    searchTerm  ?  
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="h-[325px]  text-center py-4 text-gray-500"
                                        >
                                            No results found for "{searchTerm}"
                                        </td>
                                    </tr> 
                                    : 
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="h-[325px]  text-center py-4 text-gray-500"
                                        >
                                            No Admins Found
                                        </td>
                                    </tr> 
                                )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteModal 
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                adminName={clickedAdmin?.name}
            />

            {
                isUpdateModalOpen && <UpdateModal 
                                    admin={clickedAdmin}
                                    currUser={currentUser}
                                    onClose={closeUpdateModal}
                                />
            }
        </>
    )
})
export default RenderedAdmins;