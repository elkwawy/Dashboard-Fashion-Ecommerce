import { memo, useEffect, useLayoutEffect, useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { GoPerson } from 'react-icons/go'
import { PiShoppingCart } from 'react-icons/pi'

import { FaAngleDown } from "react-icons/fa6";

import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import LoadingSpinner from '../utilities/LoadingSpinner'


const PhoneMenu = memo(({showPhoneMenu, toggleShowPhoneMenu}) => {
    
    const [showCategory, setShowCategory] = useState(false)

    const [showWomens, setShowWomens] = useState(false)
    const [showMens, setShowMens] = useState(false)
    const [showChildren, setShowChildren] = useState(false);

    const [categoryHeight, setCategoryHeight] = useState(0)
    const {allSubcategories, status, error} = useSelector((state) => state.subcategories);
    const [categoriesState, setCategoriesState] = useState([]);    
    useLayoutEffect(() => {
            if (status === 'succeeded') {
                setCategoriesState(Object.keys(allSubcategories).map(() => false));
            }
    }, [status, allSubcategories]);


    useEffect(() => {
        // Disable page scroll when PhoneMenu is open
        const handleScroll = (e) => {
            if (showPhoneMenu) {
                e.preventDefault();
            }
        };

        if (showPhoneMenu) {
            document.documentElement.style.overflowY = 'hidden';
            window.addEventListener('touchmove', handleScroll, { passive: false });
        } else {
            document.documentElement.style.overflowY = 'auto';
        }

        return () => {
            document.documentElement.style.overflowY = 'auto';
            window.removeEventListener('touchmove', handleScroll);
        }
    }, [showPhoneMenu]);

    useLayoutEffect(() => {
        if (status === 'succeeded' && showCategory) {
            let newHeight = (Object.keys(allSubcategories).length * 28) + ((Object.keys(allSubcategories).length - 1) * 8);
            Object.entries(allSubcategories).forEach(([_, category], index) => {
                if (categoriesState[index]) {
                    newHeight += (category.subcategories.length * 24) + (category.subcategories.length - 1) * 4;
                }
            });
            setCategoryHeight(newHeight);
        } else {
            setCategoryHeight(0);
        }
    }, [showCategory, categoriesState, allSubcategories, status]);
    
    const toggleShowCatgeroy = () => { 
        setShowCategory(prev => !prev);
    }

    const toggleCategoryState = (index) => {
        setCategoriesState(prevState => {
        const newState = prevState.map((state, idx) => idx === index ? !state : false); // Toggle only the clicked category
        return newState;
        });
    };
    
    return (
        <div className={`trans flex overflow-auto flex-col gap-16 fixed top-[74px] py-10 px-6 z-[100] bg-gray-200 ${showPhoneMenu ? "left-0" : "left-[200%]"} w-full flex flex-col items-center h-[calc(100vh-74px)] `}>
            <ul className="flex gap-8 sm:hidden items-center">
                <CiHeart size={30} className="cursor-pointer" />
                <GoPerson size={30} className="cursor-pointer" />
                <PiShoppingCart size={30} className="cursor-pointer" />
            </ul>
            <ul className='flex flex-col gap-6 w-full'>
                <NavLink onClick={toggleShowPhoneMenu} to={'/'} className={({isActive}) => ` ${isActive && !showCategory&& !showCategory ? 'font-bold' : 'font-normal text-gray-700 hover:text-black'} trans text-2xl  `}>Home</NavLink>
                <button onClick={toggleShowCatgeroy} className={`flex group gap-2 items-center cursor-pointer`}>
                    <button className={` text-left ${showCategory ? "text-black  font-bold" : "font-normal text-gray-700"} hover:text-black trans text-2xl`}>Category</button>
                    <FaAngleDown size={20} className={`mt-1 ${showCategory ? "rotate-180" : "rotate-0"} group-hover:text-black text-gray-700 trans`} />
                </button>
                
                {   status === 'succeeded' &&
                    <div style={{transition: "height 0.3s ease", height: `${categoryHeight}px`}} className={` relative flex flex-col  trans ${!showCategory? "-z-10  -mt-7" : ` z-50 `}  overflow-hidden`}>
                        {showCategory && 
                            <div style={{transition: "height 0.3s ease", height: `${categoryHeight}px`}} className={`flex flex-col pl-2 gap-2 absolute trans top-0 left-0 w-full min-h-full ${!showCategory? "translate-y-[-120%] -z-10" : "translate-0 z-50"}`}>
                                {Object.keys(allSubcategories).map((mainCategory, index) => (
                                    <div key={mainCategory} >
                                    <button onClick={() => toggleCategoryState(index)} className={`font-semibold -mt-2 text-lg flex ${categoriesState[index] ? "text-black" : "text-gray-600"} hover:text-black`}><span className='trans'>{allSubcategories[mainCategory].category}</span> <FaAngleDown size={16} className={`mt-2 trans ${categoriesState[index] ? "rotate-180" : "rotate-0"} ml-2`} /></button>
                                    {categoriesState[index] && (
                                        <div className='flex flex-col gap-1 mb-2 pl-2'>
                                        {allSubcategories[mainCategory].subcategories.map(subcat => (
                                            <NavLink onClick={toggleShowPhoneMenu} key={subcat._id} to={`${allSubcategories[mainCategory].slug}/${subcat._id}`} className={({isActive}) => `trans ${isActive ? "text-black" : "text-gray-500"}  w-full hover:text-black`}>
                                                {subcat.name}
                                            </NavLink>
                                        ))}
                                        </div>
                                    )}
                                    </div>
                                ))}
                            </div>
                        }
                        
                    </div>
                }

                {
                    showCategory && status === "loading" && <div className='w-full flex items-center justify-center'><LoadingSpinner /></div>
                }
                {
                    showCategory && status === "failed" && <div className='w-full flex items-center justify-center'>{error}</div>
                }

                <NavLink onClick={toggleShowPhoneMenu} to={'/aboutUs'} className={({isActive}) => ` ${isActive && !showCategory? 'font-bold' : 'font-normal text-gray-700 hover:text-black'} trans text-2xl  `}>About Us</NavLink>
                <NavLink onClick={toggleShowPhoneMenu} to={'/contactUs'} className={({isActive}) => ` ${isActive && !showCategory? 'font-bold' : 'font-normal text-gray-700 hover:text-black'} trans text-2xl  `}>Contact Us</NavLink>
            </ul>
        </div>
    )
})

export default PhoneMenu