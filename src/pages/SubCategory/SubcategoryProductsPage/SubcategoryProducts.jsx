import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../utils/Loader";
import Products from "./Products";
import { getSubcategoryProducts } from "./subcategoryProducts";

const SubcategoryProducts = () => {
    const {id} = useParams();
    const {products, loading, error} = useSelector((state) => state.subcategoryProducts);
    const dispatch = useDispatch();
    useEffect(() => { 
        if (id)  { 
            dispatch(getSubcategoryProducts(id));
        }
    }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const cateId = location.state?.cateId || null;

    const handleNavToNewProduct = () => { 
        const product= { 
            category: cateId,
            SubCategory: id,
        }
        navigate("/products/newProduct", { state: { product } });
    }
    return (
        <div className="bg-white p-3 sm:px-5 sm:py-8 h-fit min-h-[550px] max-w-full rounded-md">
            <button
            onClick={handleNavToNewProduct}
                className="trans ml-auto md:w-[159px] rounded bg-main-color py-[9px] flex items-center justify-center hover:bg-blue-600 text-center px-4 text-white"
            >
                <FaPlus className="inline-flex mr-2" /> Add Product
            </button>


            {/* New Component here */}
            {
                !loading && !error &&  products && products.length > 0  && 
                <Products products={products}  />
            }

            {
                loading && <div className="w-full h-full min-h-[450px] flex items-center justify-center"><Loader/></div>
            }

            {
                error && products.length == 0 && <div className="w-full h-full flex items-center justify-center text-sec-color text-lg">{typeof error === "string" ? error : error?.message || "An error occurred"}</div>
            }
        </div>
    )
}

export default SubcategoryProducts