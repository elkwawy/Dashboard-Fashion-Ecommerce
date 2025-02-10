import React, { useState } from 'react'
import { LuImagePlus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { AddNewcategory, getAlcategories } from '../../redux/slices/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function AddNewCategory() {
    const { categories, loading, error } = useSelector((state) => state.categorySlice)
     const [name, setName] = useState("");
      const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const dispatch = useDispatch();  
    const navigate = useNavigate() 


    const handleAddCategory = async () => {
        try {
          if (!name.trim()) {
            toast.error("Name cannot be empty!");
            return;
          }
      
         
          const existingCategory = categories.find(cat => cat.name === name && cat._id !== id);
          if (existingCategory) {
            toast.error("Category name already exists! Please choose another name.");
            return;
          }
      
          const formData = new FormData();
          formData.append("name", name);
          if (image) formData.append("image", image);
      
          const res = await dispatch(AddNewcategory({ name, image })).unwrap();
          toast.success("Category added successfully");
          navigate("/allcategories");
           
        } catch (error) {
          console.error("Error adding category:", error);
          if (error?.data.message.includes("E11000 duplicate key error collection: Ecommerce.categories index: name_1 dup key")) {
            toast.error("Category name already exists! Please choose another name.");
          } else {
            toast.error(error?.message || "Something went wrong!");
          }
        }
      };
      
      
  return (
    <section>
          <p className="font-bold text-2xl">Add Category</p>
          <div className="rounded-xl bg-white my-4 p-4 min-h-screen space-y-3">
          
            <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
              <h2 className="text-nowrap">Category Name</h2>
              <input
                type="text"
                placeholder="Enter new name"
                className="w-full p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => {
                    console.log("📌 New Name:", e.target.value);
                    setName(e.target.value);
                  }}
              />
            </div>
    
         
            <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
      <p className="text-lg text-nowrap">Upload Image</p>
      <label
        htmlFor="category_id"
        className="w-full min-h-[300px] flex flex-col items-center justify-center gap-2 p-4 border border-dashed border-main-color rounded cursor-pointer"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-60 h-60 object-cover rounded-md" />
        ) : (
          <>
            <LuImagePlus className="text-3xl text-main-color" />
            <span className="text-gray-600 text-lg">Click to upload a file</span>
            <span className="text-gray-400 text-sm">(or drag & drop here)</span>
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
    
    
           
            <div className="mx-auto w-fit">
              <button
                onClick={handleAddCategory}
                className="bg-main-color px-8 py-2 text-xl text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </section>
  )
}
