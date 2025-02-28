import { useState } from "react"
import { API } from "../../../Api/Api";
import axios from "axios";
import { getAuthHeader } from "../../../Auth/getAuthHeader";
import { showToast } from "../../../utils/showToast";


const useSubcategoryProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSubcategoryProducts = async (subcatId) => { 
        // logic of getting subcategory products
        setLoading(true);
        setError(null); // clear prev errors
        try {
            const response = await axios.get(API.getSubcategoryProducts(subcatId));
            
            // if response is null or undefined set it to []
            const products = response?.data?.data?.SubCategoryProducts ?? [];

            setProducts(products);
        } catch (error) {
            setProducts([]);
            console.error(error);
            setError(error);
        } finally { 
            setLoading(false);
        }
    }

    

    return {products,setProducts, loading, error, getSubcategoryProducts};
}

export default useSubcategoryProducts