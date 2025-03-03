import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import PricingAndStock from "./components/PricingAndStock";
import UploadImgCard from "./components/UploadImgCard";
import CategoryAndSub from "./components/CategoryAndSub";
import useProductsHook from "./useProductsHook";

const AddOrUpdateProduct = () => {
  const { addProduct, updateProduct } = useProductsHook();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const productData = location.state?.product || null;
  const comingFrom = location.state?.comingFrom || null;
  console.log(comingFrom);
  

  const [product, setProduct] = useState({
    name: productData?.name || "",
    Desc: productData?.Desc || "",
    image: productData?.image || null,
    images: productData?.images || [],
    price: productData?.price || 0,
    priceAfterDiscount: productData?.priceAfterDiscount || 0,
    stock: productData?.stock || 0,
    size: productData?.size || [],
    colors: productData?.colors || [],
    category: productData?.category || "",
    SubCategory: productData?.SubCategory || "",
    Brand: productData?.Brand || "671b97c321701e59f131cfc8",
    rateavg: productData?.rateavg || 0,
    rateCount: productData?.rateCount || 0,
    soldItems: productData?.soldItems || 0,
  });

  console.log(productData ? "update" : "add", product);

  const [error, setError] = useState({});

  const validateProduct = () => {
    let newErrors = {};
    const requiredFields = ["name", "Desc", "category", "SubCategory"];

    requiredFields.forEach((field) => {
      if (!product[field]?.trim()) {
        newErrors[field] = `${field} is required`;
      }
    });

    if (product.colors.length < 1) {
      newErrors.colors = "At least one color is required";
    }

    if (!product.image) {
      newErrors.image = "Main image is required";
    }
    if (product.images.length < 1) {
      newErrors.images = "At least one additional image is required";
    }

    if (product.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (product.stock <= 0) {
      newErrors.stock = "Stock must be greater than 0";
    }

    if (product.size.length < 1) {
      newErrors.size = "At least one size is required";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateProduct()) return;

    if (productData?.name) {
      updateProduct(productData._id, product, setLoading, comingFrom);
    } else {
      addProduct(product, setLoading, comingFrom);
    }
  };

  return (
    <section className="pb-8">
      <div className="bg-white items-center rounded-xl p-4">
        <div className="grid grid-cols-12 gap-2 md:gap-6">
          <div className="col-span-12 md:col-span-12 lg:col-span-7">
            <GeneralInfo
              product={product}
              setProduct={setProduct}
              error={error}
              setError={setError}
            />
            <PricingAndStock
              product={product}
              setProduct={setProduct}
              error={error}
              setError={setError}
            />
          </div>
          <div className="col-span-12 md:col-span-12 lg:col-span-5">
            <UploadImgCard
              product={product}
              setProduct={setProduct}
              error={error}
              setError={setError}
            />
            <CategoryAndSub
              product={product}
              setProduct={setProduct}
              error={error}
              setError={setError}
            />
          </div>
        </div>
        <button
          className={`${
            productData ? "w-[168px]" : "w-[150px]"
          } z-50 cursor-pointer text-white px-6 py-3 mb-2 font-bold rounded bg-blue-500`}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <div className="relative h-6">
              <img
                src="/public/loadingSpinnerW.svg"
                alt="loading"
                className={`w-9 absolute top-1/2 left-[48px] ${
                  productData ? "left-[58px]" : "left-[49px]"
                } transform -translate-x-1/2 -translate-y-1/2`}
              />
            </div>
          ) : productData ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </button>
      </div>
    </section>
  );
};

export default AddOrUpdateProduct;
