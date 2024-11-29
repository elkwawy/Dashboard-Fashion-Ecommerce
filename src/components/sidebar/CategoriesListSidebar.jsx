import { memo, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { RxDot } from "react-icons/rx";
import { NavLink, useLocation } from "react-router-dom";
import useCategoryHook from "../../hooks/useCategoryHook";

const CategoriesListSidebar = memo(({isOpen, closeSidebar}) => {
    const [oneCategoryOpen, setOneCategoryOpen] = useState(false)
    const [openCategory, setOpenCategory] = useState([])
    const {categories,loading,  getAllCategories} = useCategoryHook();
    useEffect(() => { 
            getAllCategories("?limit=6");
    }, []);

    useEffect(() => { 
        if (categories.length > 0) { 
            setOpenCategory(prev => {
                return Array(categories.length).fill(false); 
            });
        }
    }, [categories]);

    const {pathname} = useLocation()

    const handleOpenCategory = (index) => { 
        setOpenCategory(prevArray => {
            let list = [[prevArray.length].forEach(item => false)];
            list[index] = !prevArray[index];
            if (list[index])
                setOneCategoryOpen(true);
            else
                setOneCategoryOpen(false);
            return list;
        });
    }
    const isLinkActive = (link) => pathname.includes(link);
    return (
        <>
            {!loading && categories &&  
                <ul style={{maxHeight: isOpen  ? `${(categories.length + 1) * 28 + ((categories.length ) * 4) + (oneCategoryOpen ? 80 : 0) }px` : '0px' ,}} 
            className={`flex flex-col gap-1 pl-2 text-sm trans overflow-y-hidden`}>
                {<NavLink to={"categories/allCategories"} className={ ({ isActive }) => `w-full ${ isActive ? "text-main-color pl-1" : " "}  trans py-1  hover:bg-hover-color hover:pl-1 rounded-sm  flex items-center justify-between`}>
                    <p className='flex gap-1 items-center   '>
                        <RxDot className={`text-xs  mt-0.5 `} />
                        All Categories
                    </p>
                </NavLink >}
                {
                    categories.map((cat, index) => (
                        <li key={cat._id} className='flex-col cursor-pointer trans flex items-center justify-between'>
                            
                            {<button  onClick={() => {handleOpenCategory(index)}} className={`w-full ${ isLinkActive(`/${cat.slug}`) ? "text-main-color pl-1" : " "}  trans py-1  hover:bg-hover-color hover:pl-1 rounded-sm  flex items-center justify-between`}>
                                <p className='flex gap-1 items-center   '>
                                    <RxDot className={`text-xs  mt-0.5 `} />
                                    {cat.name}
                                </p>
                                {<FaAngleDown  className={`mt-1 mr-1 ${ openCategory[index] ? "rotate-180" : "rotate-0 "} trans`}/>}
                            </button >}

                            <ul style={{maxHeight: openCategory[index] ? `60px` : "0px",}} 
                                className={`flex flex-col gap-1 pl-3 text-sm trans w-full overflow-y-hidden`}>
                                    <NavLink to={`categories/${cat.slug}/subcategoriesList`}  onClick={() => {if (window.innerWidth < 768) closeSidebar()}} className={({ isActive }) => ` cursor-pointer trans w-full ${isActive ? "text-main-color pl-1" : "text-sec-color "} hover:bg-hover-color  rounded-sm py-1 hover:pl-1 flex items-center justify-between`}>
                                        <p className='flex gap-1 items-center '>
                                            <RxDot className={`text-xs  mt-0.5  `} />
                                            Subcategories List
                                        </p>
                                    </NavLink>
                                    <NavLink to={`categories/${cat.slug}/newSubcategory`}  onClick={() => {if (window.innerWidth < 768) closeSidebar()}} className={({ isActive }) => ` cursor-pointer trans w-full ${isActive ? "text-main-color pl-1" : "text-sec-color "} hover:bg-hover-color  rounded-sm py-1 hover:pl-1 flex items-center justify-between`}>
                                        <p className='flex gap-1 items-center '>
                                            <RxDot className={`text-xs  mt-0.5  `} />
                                            New Subcategory
                                        </p>
                                    </NavLink>
                            </ul>
                        </li>
                    ))
                }
            </ul>
            }
            {loading && <div style={{maxHeight:  isOpen ? "84px" : "0px", opacity: isOpen ? "100%" : "0" }} className="w-full  blur flex flex-col gap-2 trans animate-pulse"> 
                    <p className='flex gap-1 items-center   '>
                        <RxDot className={`text-xs  mt-0.5 `} />
                        All Categories
                    </p>
                    <p className='flex gap-1 items-center   '>
                        <RxDot className={`text-xs  mt-0.5 `} />
                        Women's
                    </p>
                    <p className='flex gap-1 items-center   '>
                        <RxDot className={`text-xs  mt-0.5 `} />
                        Men's
                    </p>
                    <p className='flex gap-1 items-center   '>
                        <RxDot className={`text-xs  mt-0.5 `} />
                        Children
                    </p>
                </div>}
        </>
    )
})

export default CategoriesListSidebar