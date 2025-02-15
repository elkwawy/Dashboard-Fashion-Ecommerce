import { useState } from "react";
export default function PricingAndStock({
  product,
  setProduct,
  error,
  setError,
}) {
  const [discount, setDiscount] = useState(0);

  const handlePrice = (e) => {
    const price = e.target.value === "" ? 0 : parseFloat(e.target.value);
    setProduct((prev) => ({
      ...prev,
      price,
      priceAfterDiscount: price - (price * discount) / 100,
    }));

    setError((prev) => ({
      ...prev,
      price: price === 0 ? "Price is required" : "",
    }));
  };

  const handleDiscount = (e) => {
    const discountValue =
      e.target.value === "" ? 0 : parseFloat(e.target.value);
    setDiscount(discountValue);
    setProduct((prev) => ({
      ...prev,
      priceAfterDiscount: prev.price - (prev.price * discountValue) / 100,
    }));
  };

  const handleStock = (e) => {
    const stock = e.target.value === "" ? 0 : parseInt(e.target.value);
    setProduct((prev) => ({
      ...prev,
      stock,
    }));

    setError((prev) => ({
      ...prev,
      stock: stock === 0 ? "Stock is required" : "",
    }));
  };

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 mb-5">
      <h2 className="text-2xl font-semibold mb-1">Pricing and Stock</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Base Price */}
        <div className="flex flex-col items-start justify-center gap-2">
          <label
            htmlFor="price"
            className="flex justify-between items-center w-full"
          >
            <span>Base Price</span>
            {error.price && <span className="msgError">{error.price}</span>}
          </label>
          <input
            type="number"
            name="price"
            placeholder="$..."
            value={product.price || ""}
            className="w-full px-2 py-1 inputD"
            onChange={handlePrice}
          />
        </div>

        {/* Discount Percentage */}
        <div className="flex flex-col items-start justify-center gap-2">
          <label htmlFor="discount">Discount (%)</label>
          <input
            type="number"
            name="discount"
            placeholder="0%"
            value={discount || ""}
            className="w-full px-2 py-1 inputD"
            onChange={handleDiscount}
          />
        </div>

        {/* Price After Discount (ReadOnly) */}
        <div className="flex flex-col items-start justify-center gap-2">
          <label htmlFor="priceafterdiscount">Price After Discount</label>
          <input
            type="number"
            name="priceafterdiscount"
            placeholder="$..."
            value={product.priceAfterDiscount || ""}
            className="w-full px-2 py-1 bg-gray-100 text-gray-500 cursor-not-allowed outline-none border border-gray-300 rounded"
            readOnly
          />
        </div>

        {/* Stock */}
        <div className="flex flex-col items-start justify-center gap-2">
          <label
            htmlFor="stock"
            className="flex justify-between items-center w-full"
          >
            <span>Stock</span>
            {error.stock && <span className="msgError">{error.stock}</span>}
          </label>
          <input
            type="number"
            name="stock"
            placeholder="Enter the number of pieces..."
            value={product.stock || ""}
            className="w-full px-2 py-1 inputD"
            onChange={handleStock}
          />
        </div>
      </div>
    </div>
  );
}
