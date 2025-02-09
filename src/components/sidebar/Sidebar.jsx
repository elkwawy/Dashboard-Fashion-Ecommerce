import React, { memo, Suspense, useState } from 'react';
import { FaAngleDown, FaRegUser } from "react-icons/fa";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { RiAdminLine, RiShoppingBag2Line } from "react-icons/ri";
import { RxDashboard, RxDot, RxLayers } from "react-icons/rx";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { NavLink, useLocation } from 'react-router-dom';
import useCategoryHook from '../../hooks/useCategoryHook';

const CategoriesListSidebar = React.lazy(() => import('./CategoriesListSidebar'))

const Sidebar = memo(({sidebar, closeSidebar}) => {
    const [openList, setopenList] = useState([false, false, false, false,false]);
    const [categoryOpenList, setCategoryOpenList] = useState([false, false, false]);
    
    const [categoryLoading, setCategoryLoading] = useState(true);

    const { pathname } = useLocation();

    const {categories, getAllCategories} = useCategoryHook();

    const loadCategories = async () => { 
        try {
            setCategoryLoading(true);
            getAllCategories();
            console.log(categories);
            
        } catch (error) {
            setCategoryLoading(false);
        }finally{
            setCategoryLoading(false);
        }
    }

    const links = [
        {id:'201' ,link:"admin",  icon: <RiAdminLine className={`mt-0.5 text-lg `} />, text:'Admins', children: [{id:'311' , link: "/admin/adminList", linkCompare:"adminList", text:'Admins List'},{id:'312' , link: "/admin/newAdmin", linkCompare:"newAdmin", text:'Add new Admin'}]},
        {id:'202' , link:"products", icon: <RiShoppingBag2Line className={`mt-0.5 text-lg `} />, text:'Products', children: [{id:'212' , link: "/products/products", linkCompare:"products", text:'Products'}, {id:'213' , link: "/products/newProduct", linkCompare:"newProduct", text:'New Product'}]},
        
        //  Start of category 
        // {id:'203' , link:"categories", icon: <RxLayers className={`mt-0.5 text-lg `} />, text:'Categories', children: [
        //     // Women's
        //     {id:'213' , link: "/categories/women's", linkCompare:"women's", text:"Women's", children:[{id:'214' , link: "/categories/women's/categoryList", linkCompare:"categoryList", text:'Category List'}, {id:'215' , link: "/categories/women's/newCategory", linkCompare:"newCategory", text:'New Category'}]},
        //     // Men's
        //     {id:'216' , link: "/categories/men's", linkCompare:"men's", text:"Men's", children:[{id:'217' , link: "/categories/men's/categoryList", linkCompare:"categoryList", text:'Category List'}, {id:'218' , link: "/categories/men's/newCategory", linkCompare:"newCategory", text:'New Category'}]},
        //     // Children
        //     {id:'219' , link: "/categories/children", linkCompare:"children", text:"Children", children:[{id:'220' , link: "/categories/children/categoryList", linkCompare:"categoryList", text:'Category List'}, {id:'221' , link: "/categories/children/newCategory", linkCompare:"newCategory", text:'New Category'}]},
        // ]},
        {id:'203' , link:"categories", icon: <RxLayers className={`mt-0.5 text-lg `} />, text:'Categories', children: [categories]},
        // End of category

        // Order
        {id:'222' , link:"order", icon: <HiOutlineDocumentAdd className={`mt-0.5 text-lg `} />, text:'Orders', children: [{id:'223' , link: "/order/orderList", linkCompare:"orderList", text:'Orders List'}]},
        // user
        {id:'224' , link:"user", icon: <FaRegUser className={`mt-0.5 text-lg `} />, text:'Users', children: [{id:'225' , link: "/user/usersList", linkCompare:"usersList", text:'Users List'}, {id:'226' , link: "/user/newUser", linkCompare:"newUser", text:'New User'}]},
    ];
    
    
    const handleOpenList = (index) => { 
        setopenList(prevArray => {
            let list = [[prevArray.length].forEach(item => false)];
            list[index] = !prevArray[index];
            return list;
        })
    }
    const handleCategoryOpenList = (index) => { 
        setCategoryOpenList(prevArray => {
            let list = [[prevArray.length].forEach(item => false)];
            list[index] = !prevArray[index];
            return list;
        })
    }

    
    const isLinkActive = (link) => pathname.includes(link);
    return (
        <div className={`${sidebar ? "z-20 w-screen max-[700px]:fixed top-0 left-0 backdrop-blur-lg min-[700px]:w-[32%] lg:w-1/4 xl:w-1/6 sm:shadow-[4px_0px_10px_0px_#B3B3B366] " : " shadow-none w-0"} py-3  min-h-screen overflow-x-hidden trans flex flex-col gap-5 `}>
            {<div className={`w-full ${sidebar ? "px-3" : "p-0"} trans   border-b-2`}>
                <button onClick={closeSidebar} className={` h-10  trans w-10 mb-3 rounded-md hover:bg-hover-color flex items-center justify-center`}>
                    <TbLayoutSidebarLeftCollapseFilled className="text-3xl" />
                </button>
            </div>} 

            {<div className={`${sidebar ? "px-5  z-0 max-w-full" : "max-w-0 px-0 -z-0"} trans flex flex-col gap-5 `}>
                <div className='flex flex-col gap-3'>
                    <h2 className='text-sec-color text-sm'>Main Home</h2>
                    <NavLink to={'/dashboard'} onClick={() => {if (window.innerWidth < 768) closeSidebar()}} className={({ isActive }) => `hover:pl-2 ${isActive ? "pl-2 beforeElement bg-main-color text-white" : " hover:bg-hover-color "} py-2 trans rounded-md font-semibold flex items-center gap-2`}>
                        <RxDashboard className='mt-0.5 text-lg' />
                        <p>Dashboard</p>
                    </NavLink>
                </div>
                <div className='flex flex-col gap-3'>
                    <h2 className='text-sec-color text-sm'>All pages</h2>
                    <div className='flex flex-col gap-2'>
                        {
                            links.map((link, index) => (
                                <div key={link.id} className='relative w-full flex flex-col gap-1'>
                                    <button  onClick={() => {handleOpenList(index); (link.text == "Categories" && loadCategories)}}  className={`relative outline-0 hover:pl-2  ${isLinkActive(link.link)? "pl-2 beforeElement bg-main-color text-white" : openList[index] ? "bg-gray-200 pl-2" : " hover:bg-hover-color"} flex w-full justify-between items-center    py-2 trans rounded-md font-semibold `}>
                                        <p className='flex gap-2 items-center '>
                                            {link.icon}
                                            {link.text}
                                        </p>
                                        <FaAngleDown  className={`mt-1 mr-1 ${openList[index]  ? "rotate-180" : ""} `}/>
                                    </button>
                                    {link.text == "Categories" &&   <Suspense fallback={<div className='w-10 h-24 bg-gray-200 animate-pulse'></div>}><CategoriesListSidebar  isOpen={openList[index]} closeSidebar={closeSidebar} /></Suspense>}
                                    {link.text !== "Categories" && <ul style={{maxHeight: openList[index] ? `${link.children.length * 28 + ((link.children.length - 1) * 4) + (index == 2 && ((categoryOpenList[0] || categoryOpenList[1] || categoryOpenList[2])) ? 60 : 0) }px` : "0px",}} 
                                    className={`flex flex-col gap-1 pl-2 text-sm trans overflow-y-hidden`}>
                                        {
                                            link.children.map((child, index) => (
                                                <li key={child.id} className='flex-col cursor-pointer trans flex items-center justify-between'>
                                                    {!child.children &&  <NavLink  to={child.link} onClick={() => {(window.innerWidth < 768) &&  closeSidebar() }} className={ ({ isActive }) => `w-full  trans py-1 ${ isActive ? "text-main-color pl-1" : " "} hover:bg-hover-color hover:pl-1 rounded-sm outline-0 flex items-center justify-between`}>
                                                        <p className='flex gap-1 items-center   '>
                                                            <RxDot className={`text-xs  mt-0.5 `} />
                                                            {child.text}
                                                        </p>
                                                    </NavLink>}
                                                    {child.children && child.children.length > 0 && <button to={child.children[0].link} onClick={() => {handleCategoryOpenList(index)}} className={`w-full ${ isLinkActive(child.link) ? "text-main-color pl-1" : " "}  trans py-1  hover:bg-hover-color hover:pl-1 rounded-sm  flex items-center justify-between`}>
                                                        <p className='flex gap-1 items-center   '>
                                                            <RxDot className={`text-xs  mt-0.5 `} />
                                                            {child.text}
                                                        </p>
                                                        {<FaAngleDown  className={`mt-1 mr-1 ${ categoryOpenList[index] ? "rotate-180" : "rotate-0 "} `}/>}
                                                    </button >}

                                                    <ul style={{maxHeight: child.children && categoryOpenList[index] ? `${child.children.length * 28 + ((child.children.length - 1) * 4) }px` : "0px",}} 
                                                        className={`flex flex-col gap-1 pl-3 text-sm trans w-full overflow-y-hidden`}>
                                                            {
                                                                child.children && child.children.map((grandChild) => (
                                                                    <NavLink to={grandChild.link} key={grandChild.id} onClick={() => {if (window.innerWidth < 768) closeSidebar()}} className={({ isActive }) => ` cursor-pointer trans w-full ${isActive ? "text-main-color pl-1" : "text-sec-color "} hover:bg-hover-color  rounded-sm py-1 hover:pl-1 flex items-center justify-between`}>
                                                                        <p className='flex gap-1 items-center '>
                                                                            <RxDot className={`text-xs  mt-0.5  `} />
                                                                            {grandChild.text}
                                                                        </p>
                                                                    </NavLink>
                                                                ))
                                                            }
                                                    </ul>
                                                </li>
                                            ))
                                        }
                                    </ul>}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>}
            
        </div>
    )
})

export default Sidebar