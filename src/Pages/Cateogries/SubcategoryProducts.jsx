import { useSelector } from "react-redux";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import CategoryProduct from "./CategoryProduct";

const SubcategoryProducts = () => {

    const {products , status, error} = useSelector((state) => state.subcategory);
    
    return (
        <>
            {status == 'succeeded' && products &&<div className="products py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  max-sm:gap-4 max-sm:flex max-sm:flex-col max-sm:items-center">
                { products.map((product) => (
                    <CategoryProduct key={product._id}  image={product.image} name={product.name} price={product.price} colors={[...product.colors]} />
                ))}

            </div>}
            {
                status === 'loading' && (
                    <div className="w-full h-[500px] flex items-center justify-center">
                        <LoadingSpinner />
                    </div>
                )
            }
            {
                status === 'failed' && (
                    <div className="w-full h-[500px] flex items-center justify-center">
                        {error}
                    </div>
                )
            }
            {
                products.length == 0 && status == 'succeeded' && (
                    <div className="w-full h-[500px] flex items-center justify-center">
                        More products are coming soon.
                    </div>
                )
            }
        </>
    )
}

export default SubcategoryProducts