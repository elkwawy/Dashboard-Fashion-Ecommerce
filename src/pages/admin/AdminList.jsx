import Cookies from "js-cookie";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SearchSection from "./adminList/components/SearchSection";
import RenderedAdmins from "./adminList/RenderedAdmins";

const AdminList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(initialPage);
    const token = Cookies.get('token');
    const { admins, totalAdmins, status, error} = useSelector((state) => state.admins);

    const totalPages = useMemo(() => Math.ceil(totalAdmins / 7), [totalAdmins]);
    
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
    const handleSearchTermChange = (term) => {
        setSearchTerm(term);
    }
    return (
        <>
            <div className="bg-white p-3 sm:p-5 h-fit  max-w-full overflow-x-auto flex flex-col gap-5  rounded-md">
                

                <SearchSection onChange={handleSearchTermChange} />
                <RenderedAdmins token={token} page={page} searchTerm={searchTerm} />

            </div>
            { <div className="w-full   mb-2 h-5 mt-5 text-gray-500 flex flex-col gap-2 sm:flex-row justify-between items-center">
                <p className=" select-none text-sm">Showing <span>{totalAdmins ? page : 0}</span> of <span>{totalPages}</span> </p>
                
                {totalAdmins > 7 &&<div className=" border-[1px] ">
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
                </div>}
                
                {totalAdmins > 7 && <div  className="flex border-[1px]  rounded-sm w-fit">
                    <button disabled={page === 1} onClick={prevPage} className={`p-2 px-3 trans bg-gray-100  border-r-[1px] border-gray-400 hover:bg-gray-200`}>
                        <FaAngleRight className={`  rotate-180`} />
                    </button>
                    
                    <button disabled={page === totalPages} onClick={nextPage} className={`p-2 px-3 trans bg-gray-100  border-gray-600 hover:bg-gray-200`}>
                        <FaAngleRight className=" " />
                    </button>
                </div>}
            </div>}
        </>
    );
};

export default AdminList;