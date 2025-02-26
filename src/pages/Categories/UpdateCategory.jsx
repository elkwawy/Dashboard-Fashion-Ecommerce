import React, { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { getAlcategories, specificSpicificCategory, updateCategory } from "../../redux/slices/CategorySlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import addavatar from "../../assets/avater/update-cuate.svg";


export default function UpdateCategory() {
  const {  updatecategories,loading,loadingUpdate, error } = useSelector((state) => state.categorySlice);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);
const navigate = useNavigate() 

  useEffect(() => {
    console.log("🛠 ID from useParams:", id);
    if (id) {
      dispatch(specificSpicificCategory({ id }));
      console.log("��� Specific category:", updatecategories[0]);
    }
  }, [dispatch, id]);

  console.log( updatecategories);
  

  
  useEffect(() => {
    if ( updatecategories &&  updatecategories.length > 0) {
      setName( updatecategories[0]?.name || "");
      setImage( updatecategories[0]?.image || "");
      setPreview( updatecategories[0]?.image || "");
    } else {
      console.warn("🚨 No category data found!");
    }
  }, [ updatecategories]);

 
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
  
      const res = await dispatch(updateCategory({ id, name, image } )).unwrap();
      toast.success(" Category updated successfully");
       await dispatch(getAlcategories());
      navigate("/allcategories")

    } catch (error) {
      console.error(" Error updating category:", error);
    }
  };
  

  

  return (
    <section>
      <p className="font-bold text-2xl">Update Category</p>
      <div className="flex  rounded-xl bg-white my-4 p-4 min-h-screen space-y-3">
      
     <div className="space-y-3 flex-1">
     <div className="flex flex-col gap-4 justify-center items-start">
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

{loadingUpdate ?  <div className=" w-fit">
          <button
            className="bg-main-color px-8 py-2 text-xl text-white  w-[100px] h-[45px] rounded-lg"
          >
           <img src="/public/loadingSpinnerW.svg" alt="Loading..." className="w-10" />
          </button>
        </div> :  <div className=" w-fit">
          <button
            onClick={handelupdateCategory}
            className="bg-main-color px-8 py-2 text-xl  w-[100px] h-[45px] text-white rounded-lg"
          >
            Save
          </button>
        </div>}
       
       
     </div>


     
      <img src={addavatar} className="w-[36%] hidden md:block flex-2" alt=""/>
     
      </div>
    </section>
  );
}
