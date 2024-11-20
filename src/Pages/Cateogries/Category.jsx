import React, { memo, useEffect, useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../../utilities/LoadingSpinner';
import { getAllProducts, getSubcategoryProducts } from '../../Redux Toolkit/slices/subcategory';
import SubcategoryProducts from './SubcategoryProducts';
import { FaArrowRight } from "react-icons/fa";
import { debounce } from "lodash";

const Category = memo(() => {
    const [canScrollRight, setCanScrollRight] = useState(false);

    const { categoryName, subcategoryID } = useParams();
    const { status, error } = useSelector((state) => state.subcategories);
    const categorySubcategories = useSelector((state) => state.subcategories.allSubcategories[categoryName] || {});
    const dispatch = useDispatch();
    const subcategories = useRef(null);

    // API calls
    useEffect(() => {
        window.scrollTo(0, 0);
        if (subcategoryID && subcategoryID !== "all") {
            dispatch(getSubcategoryProducts(subcategoryID));
        } else if (
            subcategoryID === "all" &&
            status === "succeeded" &&
            categorySubcategories?.subcategories
        ) {
            const categoryId = categorySubcategories.subcategories[0]?.category?._id;
            if (categoryId) dispatch(getAllProducts(categoryId));
        }
    }, [categoryName, subcategoryID, status]);

    // Scroll reset
    useEffect(() => {
        subcategories.current?.scrollTo({ left: 0 });
        setCanScrollRight(true)
    }, [categoryName]);

    // Scroll check
    const debouncedCheckScroll = useCallback(
        debounce(() => {
            const { current } = subcategories;
            if (current) {
                const { scrollLeft, scrollWidth, clientWidth } = current;
                setCanScrollRight(!((clientWidth + scrollLeft + 2) >= scrollWidth));
            }
        }, 200),
        []
    );

    useEffect(() => {
        const current = subcategories.current;
        if (current) {
            current.addEventListener("scroll", debouncedCheckScroll);
        }
        return () => current?.removeEventListener("scroll", debouncedCheckScroll);
    }, [debouncedCheckScroll]);

    const scrollHorizontally = useCallback(() => {
        subcategories.current?.scrollBy({ left: 200, behavior: "smooth" });
    }, []);

    const getAllBtnClass = useMemo(() => {
        return `${subcategoryID === "all" ? "bg-black text-white" : "hover:bg-gray-200"} rounded-sm text-sm trans border-[1px] px-3 py-1 border-black`;
    }, [subcategoryID]);

    const getSubcategoryLinks = useMemo(() => {
        if (!categorySubcategories.subcategories) return null;
        return categorySubcategories.subcategories.map((subcategory) => (
            <Link
                key={subcategory._id}
                to={`/${categoryName}/${subcategory._id}`}
                className={`${subcategoryID === subcategory._id ? "bg-black text-white" : "hover:bg-gray-200"} min-w-fit text-sm rounded-sm trans border-[1px] px-3 py-1 border-black`}
            >
                {subcategory.name}
            </Link>
        ));
    }, [categoryName, categorySubcategories.subcategories, subcategoryID]);

    if (status === "failed") {
        return (
            <div className="text-center h-[500px] w-full flec items-center justify-center">
                <h2>{error}</h2>
            </div>
        );
    }

    if (status === "loading") {
        return (
            <div className="flex h-[500px] items-center justify-center w-full mt-20">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="container py-20 min-h-screen">
            {status === "succeeded" && categorySubcategories.subcategories && <div className="flex flex-col gap-10">
                <div className="w-full flex justify-between">
                    <h1 className="capitalize font-bold text-3xl">{categoryName}</h1>
                    <button className="px-5 py-1 border-2 border-black trans hover:bg-black hover:text-white rounded-sm">Filter</button>
                </div>
                <div className="relative">
                    {(
                        <div
                            ref={subcategories}
                            className="scrollbar-none flex items-center gap-5 max-[810px]:gap-3 max-[810px]:overflow-x-scroll"
                            style={{ scrollBehavior: "smooth", maxWidth: "100%", width: "100%" }}
                        >
                            <Link to={`/${categoryName}/all`} className={getAllBtnClass}>
                                All
                            </Link>
                            {getSubcategoryLinks}
                        </div>
                    )}
                    {canScrollRight && (
                        <button
                            onClick={scrollHorizontally}
                            style={{boxShadow: "0px 0px 10px #D3D3D3"}}
                            className="bg-white min-[810px]:hidden border-[1px] border-black rounded-full shadow-2xl w-8 h-8 absolute top-1/2 -translate-y-1/2 right-0 text-black cursor-pointer flex items-center justify-center"
                        >
                            <FaArrowRight />
                        </button>
                    )}
                </div>
            </div>}
            {status === "succeeded" && <SubcategoryProducts />}
        </div>
    );
});

export default Category;
