import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAlcategories,
  specificCategory,
  setId,
} from "../../../redux/slices/CategorySlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function CategoryAndSub({ product, setProduct, error }) {
  const { categories, loading, subCategory, loadingSub, subid } = useSelector(
    (state) => state.categorySlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (subid) {
      dispatch(specificCategory({ id: subid }));
    }
  }, [dispatch, subid]);

  const handelSubcategory = (e) => {
    setProduct((prev) => ({ ...prev, SubCategory: e.target.value }));
  };
  useEffect(() => {
    dispatch(getAlcategories());
  }, [dispatch]);

  const handleCategory = (e) => {
    const { id, value } = e.target;

    setProduct((prev) => {
      if (prev.category !== value) {
        dispatch(setId({ id }));
      }
      return { ...prev, category: value };
    });
  };

  useEffect(() => {
    if (product.category) {
      dispatch(specificCategory({ id: product.category }));
    }
  }, []);

  return (
    <div className=" space-y-5 border-2 border-gray-300 rounded-lg px-4 py-6 mb-6">
      <div className="space-y-1">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-2xl font-semibold">Category</h3>
          {error.category && <span className="msgError">{error.category}</span>}
        </div>
        <p className="text-gray-500 text-nowrap">Pick Available Category</p>
        <div className="flex items-center justify-start gap-2  lg:flex-wrap max-[372px]:flex-wrap">
          {loading ? (
            <div className="flex js items-center gap-3 max-[400px]:flex-wrap">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2 pb-1">
                  <Skeleton circle width={20} height={20} />
                  <div className="-mb-1">
                    <Skeleton width={58} height={16} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <div className=" " key={category._id}>
                <label
                  htmlFor={category._id}
                  className="flex items-center space-x-reverse space-x-2 space-y-1"
                >
                  <input
                    type="radio"
                    id={category._id}
                    name="category"
                    value={category._id}
                    checked={product.category === category._id}
                    className="peer hidden"
                    onChange={handleCategory}
                  />
                  <div className="w-[20px] h-[20px] border border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500">
                    <div className="w-[9px] h-[9px] rounded-full border border-gray-400 bg-white peer-checked:bg-blue-500"></div>
                  </div>
                  <span>{category.name}</span>
                </label>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-semibold">SubCategory</h2>
          {error.SubCategory && (
            <span className="msgError">{error.SubCategory}</span>
          )}
        </div>
        <div className="flex flex-col items-start justify-center gap-2 w-full">
          {loadingSub ? (
            <div className="w-[calc(100%)]">
              <Skeleton height={29} />
            </div>
          ) : (
            <select
              className="w-full px-2 py-1 in inputD text-black"
              name="subcategory"
              id="subcategory"
              required
              onChange={handelSubcategory}
              defaultValue={""}
            >
              {subCategory.length === 0 ? (
                <option value="" disabled>
                  Select category first
                </option>
              ) : (
                <>
                  {product.SubCategory === "" && (
                    <option value="" disabled>
                      Select SubCategory
                    </option>
                  )}

                  {subCategory.map((subcategory) => (
                    <option
                      key={subcategory._id}
                      value={
                        product.SubCategory === subcategory._id
                          ? ""
                          : subcategory._id
                      }
                    >
                      {subcategory.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
