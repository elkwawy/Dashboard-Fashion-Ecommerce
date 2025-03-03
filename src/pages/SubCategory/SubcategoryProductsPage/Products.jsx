import { memo } from "react";
import Product from "./Product";

const Products = memo(({products}) => {
    // Here iam sure that products isn't undefined
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            {
                products.map(product => <Product product={product}  />)
            }
        </div>
    )
})

export default Products