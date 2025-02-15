import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { popularColors } from "./PopularColors";
export default function GeneralInfo({ product, setProduct, error, setError }) {
  const validateField = (field, value, minLength) => {
    setError((prev) => ({
      ...prev,
      [field]:
        value.trim().length === 0
          ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
          : value.length < minLength
          ? `Min ${minLength} chars required`
          : "",
    }));
  };
  const handleChange = (field, value, minLength) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
    validateField(field, value, minLength);
  };

  const handleSize = (e) => {
    const selectedSize = e.target.value;

    setProduct((prev) => {
      const isSelected = prev.size.includes(selectedSize);
      return {
        ...prev,
        size: isSelected
          ? prev.size.filter((size) => size !== selectedSize)
          : [...prev.size, selectedSize],
      };
    });
  };

  const [colorInput, setColorInput] = useState("");
  const handleAddColor = (color) => {
    if (!color || product.colors.includes(color)) return;

    setProduct((prev) => ({
      ...prev,
      colors: [...prev.colors, color],
    }));
  };

  const handleRemoveColor = (color) => {
    setProduct((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color),
    }));
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="space-y-3 border-2 border-gray-300 rounded-lg pb-2 p-4 mb-6">
      <h2 className="text-2xl font-semibold">General Information</h2>
      <div className="space-y-3">
        {/* Name Field */}
        <div className="flex flex-col items-start space-y-2">
          <label className="flex items-center justify-between w-full">
            <span>Product Name</span>
            {error.name && <span className="msgError">{error.name}</span>}
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            className={`w-full p-2 inputD ${error.name && "errorD"}`}
            onChange={(e) => handleChange("name", e.target.value, 3)}
            value={product.name}
          />
        </div>
        {/* Description Field */}
        <div className="flex flex-col items-start space-y-2">
          <label className="flex items-center justify-between w-full">
            <span>Product Description</span>
            {error.Desc && <span className="msgError">{error.Desc}</span>}
          </label>
          <textarea
            placeholder="Enter product description..."
            className={`w-full h-28 p-2 inputD ${error.Desc && "errorD"}`}
            onChange={(e) => handleChange("Desc", e.target.value, 10)}
            value={product.Desc}
          ></textarea>
        </div>

        {/* size general */}
        <div className="flex justify-between max-[850px]:flex-col-reverse w-full gap-4">
          {/* Colors Section */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 w-full">
              <h2 className="font-semibold">Colors</h2>
              {error.colors && <span className="msgError">{error.colors}</span>}
            </div>
            <p className="text-gray-500 text-nowrap">Select or enter a color</p>

            {/* Custom Color Input */}
            <div className="flex items-center justify-between gap-2">
              <label className="flex gap-2 ">
                <input
                  type="text"
                  className="px-2 py-1 inputD w-[165px]"
                  placeholder="#HEX or name color"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddColor(colorInput);
                    }
                  }}
                />
                <button
                  type="button"
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => handleAddColor(colorInput)}
                >
                  Add
                </button>
              </label>
            </div>
          </div>
          {/* Size Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2 w-full">
              <h3 className="font-semibold">Size</h3>
              {error.size && <span className="msgError">{error.size}</span>}
            </div>
            <p className="text-gray-500 text-nowrap">Pick Available Size</p>
            <div className="flex items-center md:flex-wrap flex-wrap gap-2">
              <div className="flex items-center max-[1290px]:flex-wrap gap-2.5">
                {["XS", "S", "M", "L", "XL"].map((size, index) => (
                  <div
                    key={index}
                    className="peer py-1rounded text-center max-w-[55px]"
                  >
                    <label
                      htmlFor={`size-${index}`}
                      className="flex items-center cursor-pointer justify-center"
                    >
                      <input
                        type="checkbox"
                        name="size"
                        id={`size-${index}`}
                        className="hidden peer"
                        onChange={handleSize}
                        value={size}
                        checked={product.size.includes(size)}
                      />

                      <div
                        className={`py-2 px-2 text-base w-[40px] rounded flex items-center justify-center ${
                          product.size.includes(size)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {size}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 justify-between py-2 px-3  bg-gray-200 rounded-md"
          >
            <span>Popular Colors</span>
            <span>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
          </button>

          {/* Popular Colors */}
          <div className="">
            {isOpen && (
              <div className="flex flex-wrap gap-2">
                {popularColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="w-7 h-7 rounded-full border-2"
                    style={{ backgroundColor: color, borderColor: "#ccc" }}
                    onClick={() => handleAddColor(color)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Selected Colors Display */}
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-2 py-1 border rounded bg-gray-100"
              >
                <span
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm">{color}</span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveColor(color)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
