import { BiImageAdd } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

export default function UploadImgCard({ product, setProduct }) {
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProduct((prev) => {
          const updatedProduct = { ...prev };
          if (!updatedProduct.images) {
            updatedProduct.images = [];
          }

          if (index === 0) {
            updatedProduct.image = reader.result; 
          } else if (index <= 3) {
            updatedProduct.images[index - 1] = { url: reader.result } 
          }
          return updatedProduct;
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 border-2 border-gray-300 rounded-lg p-4 mb-6">
      <h2 className="text-2xl font-semibold">Upload Images</h2>

      {/* Main Photo */}
      <div className="w-full border-2 border-blue-500 rounded-lg p-2 border-dashed">
        <label
          htmlFor="file-input-0"
          className="cursor-pointer w-full h-[300px] flex items-center justify-center"
        >
          {product.image ? (
            <img
              src={product.image}
              alt="Main uploaded image"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <BiImageAdd className="text-6xl text-blue-500" />
              <p className="text-blue-500">Click to upload main image</p>
            </div>
          )}
        </label>
        <input
          id="file-input-0"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleImageChange(e, 0)}
        />
      </div>

      {/* Additional Images */}
      <div className="w-full grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-[100px] border-2 border-blue-500 p-2 rounded-lg border-dashed relative"
          >
            <label
              htmlFor={`file-input-${index + 1}`}
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              {product.images?.[index] ? (
                <img
                  src={product.images[index].url}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <FaPlus className="text-2xl text-blue-500" />
              )}
            </label>
            <input
              id={`file-input-${index + 1}`}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e, index + 1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}