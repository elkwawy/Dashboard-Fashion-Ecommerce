import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import sweetalert from "../../../utils/sweetalert";
import { deleteProduct } from "./subcategoryProducts";

const Product = ({product}) => {
    
    const dispatch = useDispatch();
    
    const handleDeleteProduct = async () => { 
        const res = await sweetalert.deleteOrNot();
        if (res.isConfirmed) { 
            dispatch(deleteProduct(product));
        }
    }

    const navigate = useNavigate();
    
    const handelupdate = (product) => {
        console.log(product);
        
        navigate("/products/updateProduct", { state: { product } });
    };

    return (
        <div  className="space-y-1 ">
            <div className="relative min-h-[345px]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full min-h-[340px] lg:min-h-[350px] object-cover"
                />
                <div className="flex justify-center items-end gap-3 py-3 opacity-0 hover:opacity-100 transition-all duration-300 text-white bg-black/30 w-full h-full absolute top-0 right-0 left-0">
                <div
                    className="text-2xl bg-gray-600/40 p-2 rounded-full cursor-pointer transition-all hover:bg-red-500 hover:text-white"
                    onClick={handleDeleteProduct}
                >
                    <RiDeleteBin6Line />
                </div>
                <div
                    className="text-2xl bg-gray-600/40 p-2 rounded-full cursor-pointer transition-all hover:bg-blue-500 hover:text-white"
                    onClick={() => handelupdate(product)}
                >
                    <FaEdit />
                </div>
                </div>
            </div>

            <button
                title={product.name}
                className="line-clamp-1"
            >{`${product.name.slice(0, 22)}${
                product.name.length > 22 ? "..." : ""
            }`}</button>
            <p className="font-bold">{`$${product.price}`}</p>
            <div className="flex gap-2 md:gap-[0.5px] lg:gap-2 flex-wrap">
                {product.colors.map((color, index) => (
                <div
                    key={index}
                    className="w-7 h-7 border-2 rounded-full"
                    style={{ backgroundColor: color }}
                />
                ))}
            </div>
        </div>
    )
}

export default Product