import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../productSlice";
import Loader from "../../../utils/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductCard() {
  const navegate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const deletedProduct = (id) => {
    dispatch(deleteProduct({ id }));
  };

  const handelupdate = (product) => {
    navegate("/products/updateProduct", { state: { product } });
  };

  if (loading) {
    return (
      <>
        <div className="w-full h-[calc(100vh-210px)] flex justify-center items-center">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
      {Array.isArray(products) &&
        products?.map((card, index) => (
          <div key={index} className="space-y-1 ">
            <div className="relative min-h-[345px]">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full min-h-[340px] lg:min-h-[350px] object-cover"
              />
              <div className="flex justify-center items-end gap-3 py-3 opacity-0 hover:opacity-100 transition-all duration-300 text-white bg-black/30 w-full h-full absolute top-0 right-0 left-0">
                <div
                  className="text-2xl bg-gray-600/40 p-2 rounded-full cursor-pointer transition-all hover:bg-red-500 hover:text-white"
                  onClick={() => deletedProduct(card._id)}
                >
                  <RiDeleteBin6Line />
                </div>
                <div
                  className="text-2xl bg-gray-600/40 p-2 rounded-full cursor-pointer transition-all hover:bg-blue-500 hover:text-white"
                  onClick={() => handelupdate(card)}
                >
                  <FaEdit />
                </div>
              </div>
            </div>

            <button
              title={card.name}
              className="line-clamp-1"
            >{`${card.name.slice(0, 22)}${
              card.name.length > 22 ? "..." : ""
            }`}</button>
            <p className="font-bold">{`$${card.price}`}</p>
            <div className="flex gap-2 md:gap-[0.5px] lg:gap-2 flex-wrap">
              {card.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-7 h-7 border-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
