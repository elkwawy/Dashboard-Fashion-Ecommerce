import { useEffect } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

export default function UploadImgCard({ product, setProduct, error }) {
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...files], // إضافة الصور الجديدة بدل الاستبدال
    }));
  };

  // تنظيف URLs عند التغيير
  useEffect(() => {
    return () => {
      if (product.image) {
        URL.revokeObjectURL(product.image);
      }
      product.images?.forEach((file) => {
        URL.revokeObjectURL(file);
      });
    };
  }, [product.image, product.images]);

  return (
    <div className="space-y-4 border-2 border-gray-300 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between gap-2 w-full">
        <h2 className="text-2xl font-semibold">Upload Images</h2>
        {error.image && <span className="msgError">{error.image}</span>}
      </div>

      {/* صورة المنتج الرئيسية */}
      <div className="w-full border-2 border-blue-500 rounded-lg p-2 border-dashed">
        <label
          htmlFor="main-image-input"
          className="cursor-pointer w-full h-[300px] flex items-center justify-center"
        >
          {product.image instanceof Blob ? (
            <img
              src={URL.createObjectURL(product.image)}
              alt="Main uploaded image"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : product.image ? (
            <img
              src={product.image}
              alt="Main uploaded image"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <BiImageAdd className="text-4xl text-blue-500" />
              <p className="text-blue-500 text-center">
                Click to upload main image
              </p>
            </div>
          )}
        </label>
        <input
          id="main-image-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleMainImageChange}
        />
      </div>

      {/* صور إضافية */}
      <div className="w-full grid grid-cols-3 gap-4 mb-1 mt-4">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="relative w-full h-[120px] border-2 border-blue-500 p-2 rounded-lg border-dashed"
          >
            <label
              htmlFor={`additional-image-input-${index}`}
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              {product.images?.[index] instanceof Blob ? (
                <img
                  src={URL.createObjectURL(product.images[index])}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : product.images?.[index] ? (
                <img
                  src={product.images[index]}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <FaPlus className="text-2xl text-blue-500" />
              )}
            </label>
            <input
              id={`additional-image-input-${index}`}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleMultipleImagesChange}
            />
          </div>
        ))}
      </div>
      {error.images && <span className="msgError">{error.images}</span>}
    </div>
  );
}
