import { CiHeart } from "react-icons/ci";
import { FaCartPlus, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import LazyImage from "../../utilities/LazyImage";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import { memo } from "react";

const CategoryProduct = memo(({image, name, price, colors}) => {
    return (
        <div  className="product p-3 trans hover:bg-gray-100 rounded-md cursor-pointer">
            <div className="image-container relative">
                <LazyImage src={image} alt="name" className="rounded-lg" loader={<div className='w-full h-[397px] bg-gray-300 flex items-center justify-center'><LoadingSpinner /></div>} />
                <div className="icon-container flex gap-2">
                <Link to="/cart">
                    <FaCartPlus />
                </Link>
                <Link to="/wishlist">
                    <CiHeart />
                </Link>
                <Link to="/view">
                    <FaEye />
                </Link>
                </div>
            </div>
            <p className="title text-[#222222] text-lg font-[400] mt-4">
                {name}
            </p>
            <p className="price text-[#222222]  font-[500] mt-2">
                {price}$
            </p>
            <div className="colors text-start flex gap-4 mb-8">
                {colors.map((color , index) => (
                <span key={index} style={{backgroundColor: color}} className={`rounded-full opacity-80 shadow-md w-8 h-8 mt-2`} />
                ))}
            </div>
        </div>
    )
})

export default CategoryProduct