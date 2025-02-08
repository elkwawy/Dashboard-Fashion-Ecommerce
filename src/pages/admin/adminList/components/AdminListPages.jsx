import { FaAngleRight } from "react-icons/fa6";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getAdmins } from "../../../../redux/slices/adminsSlice";
import { useSearchParams } from "react-router-dom";

const AdminListPages = memo(({initialPage}) => {
    const [page, setPage] = useState(initialPage);
    const totalAdmins = useSelector((state) => state.admins.totalAdmins);
    const dispatch = useDispatch();
    const totalPages = useMemo(() => Math.ceil((totalAdmins || 0) / 7), [totalAdmins]);
    const token = useMemo(() => Cookies.get('token'), []);
    // const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (token && page) { 
            console.log("Fetching admins for page:", page);
            dispatch(getAdmins({ page:page }));
        }
    }, [dispatch,page]); // Add `page` and `token` to dependencies



    // useEffect(() => {
    //     const currentPage = parseInt(searchParams.get("page")) || 1;
    //     if (currentPage !== page) {
    //         setPage(currentPage);
    //     }
    // }, [searchParams, page]);


    // useEffect(() => {
    //     if (page > totalPages && totalPages > 0) {
    //         setPage(totalPages);
    //     }
    // }, [page, totalPages]);
    

    const prevPage = useCallback(() => {
        setPage((prev) => (prev > 1 ? prev - 1 : prev));
    }, []);

    const nextPage = useCallback(() => {
        setPage((prev) => (prev < totalPages ? prev + 1 : prev));
    }, [totalPages]);

    
    return (
        <div className="w-full mb-2 h-5 mt-5 text-gray-500 flex flex-col gap-2 sm:flex-row justify-between items-center">
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
                    
                    <button disabled={page >= totalPages || totalPages === 0}  onClick={nextPage} className={`p-2 px-3 trans bg-gray-100  border-gray-600 hover:bg-gray-200`}>
                        <FaAngleRight className=" " />
                    </button>
                </div>
            </div>
    )
})

export default AdminListPages