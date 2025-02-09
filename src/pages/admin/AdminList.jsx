import { IoMdAdd } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdmin, getAdmins } from "../../redux/slices/adminsSlice";
import Cookies from "js-cookie";
import Loader from "../../utils/Loader";
import { Link, useSearchParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

const AdminList = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(initialPage);
    const token = Cookies.get('token');
    const { admins, totalAdmins, status, error} = useSelector((state) => state.admins);
    const currentUser = useSelector((state) => state.user.user);

    const totalPages = useMemo(() => Math.ceil(totalAdmins / 7), [totalAdmins]);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [clickedAdmin, setClickedAdmin] = useState(null);
    
    useEffect(() => {
        if (token && page) {
            dispatch(getAdmins({ page}));
        }
    }, [dispatch, page, token]);
    

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const currentPage = parseInt(params.get("page")) || 1;
        if (currentPage !== page) {
            setPage(currentPage);
        }
    }, [searchParams]);

    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [page, totalPages]);
    

    const prevPage = useCallback(() => setPage((prev) => prev - 1), []);
    const nextPage = useCallback(() => setPage((prev) => prev + 1), []);
    const openDeleteModal = useCallback((admin) => {
        setClickedAdmin(admin);
        setIsDeleteModalOpen(true);
    }, []);
    const openUpdateModal = useCallback((admin) => {
        setClickedAdmin(admin);
        setIsUpdateModalOpen(true);
    }, []);

    const closeDeleteModal = () => {
        setClickedAdmin(null);
        setIsDeleteModalOpen(false);
    };
    const closeUpdateModal = () => {
        setClickedAdmin(null);
        setIsUpdateModalOpen(false);
    };

    const confirmDelete = () => {
        if (clickedAdmin) {
            dispatch(deleteAdmin({ id: clickedAdmin._id, currentUser }));
        }
        closeDeleteModal();
    };
    const confirmUpdate = () => {
        if (clickedAdmin) {
            // update
        }
        closeUpdateModal();
    };

    if (!isUpdateModalOpen && status == 'loading') 
        return <div className="w-full h-full flex items-center justify-center "><Loader /></div>;
    if (!isUpdateModalOpen && status == 'failed') 
        return <div className="w-full h-full flex items-center justify-center font-bold text-xl">{error}</div>;



    return (
        <>
            <div className="bg-white p-3 sm:p-5 h-fit  max-w-full overflow-x-auto flex flex-col gap-5  rounded-md">
                <div className="flex justify-between max-[450px]:flex-col max-[450px]:gap-5 items-center">
                    {/* Search */}
                    <div className="relative w-full min-[450px]:w-1/2 sm:w-1/3 group">
                        <input
                            type="text"
                            className="p-1.5 border-gray-400 rounded-sm placeholder:text-gray-400 border-[1px] w-full outline-1 trans outline-main-color"
                            placeholder="Search here..."
                        />
                        <IoIosSearch className="absolute top-1/2 -translate-y-1/2 right-2 text-xl text-gray-400 trans group-focus-within:text-black" />
                    </div>
                    <Link to={'/admin/newAdmin'} className="px-3 py-1 gap-1 w-fit rounded-sm bg-main-color trans hover:bg-blue-600 text-white flex items-center">
                        <IoMdAdd className="text-lg mt-0.5" />
                        Add New
                    </Link>
                </div>
                {<div className="relative max-sm:w-[200%] sm:max-w-[100%] min-h-[412px]">
                    <div className="w-full ">
                        <table className="w-full  text-sm text-left rounded-md  border-[1px] table-fixed lg:table-auto">
                            <thead className="bg-[#F8F9FC] border-b-[1px] font-bold text-gray-600">
                                <tr>
                                    <th scope="col" className="px-2 lg:px-6 py-3 font-semibold">
                                        Admin
                                    </th>
                                    <th scope="col" className="px-2 lg:px-6 py-3 font-semibold">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-2 lg:px-6 py-3 font-semibold">
                                        Email
                                    </th>
                                    <th scope="col" className="px-2 lg:px-6 py-3 font-semibold">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    admins.map(admin => (
                                        <tr key={`${admin._id}${admin.name}`} className="bg-white border-b hover:bg-gray-50 trans">
                                            <th scope="row" className="px-2 lg:px-6 py-2 flex items-center gap-1.5 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                                <div className="min-w-8 min-h-8 rounded-full bg-gray-200" />
                                                <p className="text-ellipsis">{admin.name}</p>
                                            </th>
                                            <td className="px-2 lg:px-6 py-2 overflow-hidden text-ellipsis">
                                                01228050484
                                            </td>
                                            <td className="px-2 lg:px-6 py-2 overflow-hidden text-ellipsis">
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
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>}

                
                
                
            </div>
            <div className="w-full   mb-2 h-5 mt-5 text-gray-500 flex flex-col gap-2 sm:flex-row justify-between items-center">
                <p className=" select-none text-sm">Showing <span>{page}</span> of <span>{totalPages}</span> </p>
                
                <div className=" border-[1px] ">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            className={`p-2 px-3 trans bg-gray-200 ${
                                page === pageNumber
                                    ? "bg-main-color text-white"
                                    : "hover:bg-gray-300"
                            }`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
                
                <div  className="flex border-[1px]  rounded-sm w-fit">
                    <button disabled={page === 1} onClick={prevPage} className={`p-2 px-3 trans bg-gray-100  border-r-[1px] border-gray-400 hover:bg-gray-200`}>
                        <FaAngleRight className={`  rotate-180`} />
                    </button>
                    
                    <button disabled={page === totalPages} onClick={nextPage} className={`p-2 px-3 trans bg-gray-100  border-gray-600 hover:bg-gray-200`}>
                        <FaAngleRight className=" " />
                    </button>
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
                                    onConfirm={confirmUpdate}
                                    onClose={closeUpdateModal}
                                />
            }
            
        </>
    );
};

export default AdminList;
