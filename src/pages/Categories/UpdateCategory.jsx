import React, { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import {
  getAlcategories,
  updateCategory,
} from "../../redux/slices/CategorySlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import addavatar from "../../assets/avater/update-cuate.svg";

export default function UpdateCategory() {
  const location = useLocation()
  const {loading, loadingUpdate, error } = useSelector(
    (state) => state.categorySlice
  );
  const  id = location.state?.id;
  const dispatch = useDispatch();
  const [name, setName] = useState(location.state?.name); 
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(location.state?.image);
  const navigate = useNavigate();


  const handelupdateCategory = async () => {
    try {
      if (!id) {
        toast.error("ID is missing!");
        return;
      }
      if (!name.trim()) {
        toast.error("Name cannot be empty!");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      const res = await dispatch(updateCategory({ id, name, image })).unwrap();
      toast.success(" Category updated successfully");
      await dispatch(getAlcategories());
      navigate("/allcategories");
    } catch (error) {
      console.error(" Error updating category:", error);
    }
  };

  return (
    <section>
      <div className="flex items-center gap-6 rounded-xl bg-white p-4">
        <div className="space-y-4 flex-1">
          <div className="flex flex-col gap-2 justify-center items-start">
            <h2 className="text-nowrap">Category Name</h2>
            <input
              type="text"
              placeholder="Enter new name"
              className="w-full p-2 inputD "
              value={name}
              onChange={(e) => {
                console.log("📌 New Name:", e.target.value);
                setName(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <p className="text-lg text-nowrap">Upload Image</p>
            <label
              htmlFor="category_id"
              className="w-full min-h-[300px] flex flex-col items-center justify-center gap-2 p-4 border border-dashed border-gray-300 rounded cursor-pointer"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-60 h-60 object-cover rounded-md"
                />
              ) : (
                <>
                  <LuImagePlus className="text-3xl text-main-color" />
                  <span className="text-gray-600 text-lg">
                    Click to upload a file
                  </span>
                  <span className="text-gray-400 text-sm">
                    (or drag & drop here)
                  </span>
                </>
              )}
              <input
                type="file"
                id="category_id"
                name="category_id"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>

          {loadingUpdate ? (
            <div className=" w-fit text-center">
              <button className="bg-main-color px-8 py-2 text-xl text-center text-white  w-[130px] h-[45px] rounded-lg">
                <img
                  src="/public/loadingSpinnerW.svg"
                  alt="Loading..."
                  className="w-8 m-auto"
                />
              </button>
            </div>
          ) : (
            <div className=" w-fit">
              <button
                onClick={handelupdateCategory}
                className="bg-main-color px-8 py-2 text-xl  w-[130px] h-[45px] text-white rounded-lg"
              >
                Update
              </button>
            </div>
          )}
        </div>

        <img
          src={addavatar}
          className="w-[40%]  hidden md:block flex-2"
          alt=""
        />
      </div>
    </section>
  );
}
