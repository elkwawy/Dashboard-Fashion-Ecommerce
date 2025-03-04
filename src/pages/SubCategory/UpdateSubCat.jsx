import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  updatespicificSubcategory,
} from "../../redux/slices/subCategoryslice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import addavatar from "../../assets/avater/update-cuate.svg";

export default function UpdateSubCat() {
  const location = useLocation();
  const id = location.state?.id; 
  const dispatch = useDispatch();
  const [name, setName] = useState(location.state?.name);
  const navigate = useNavigate();


  const {loadingUpdate}= useSelector((state) => state.subCategory);

  const updateSubCategory = async () => {
    try {
      if (!id) {
        console.error("❌ ID is not defined!");
        return;
      }
      if (!name.trim()) {
        console.error("❌ Name cannot be empty!");
        return;
      }
      await dispatch(updatespicificSubcategory({ id, name })).unwrap();
      toast.success("Subcategory updated successfully");

      navigate(-1); 
    } catch (error) {
      toast.error("❌ Error updating subcategory");
      console.error("❌ Error updating subcategory:", error);
    }
  };

  return (
    <section>
      <div className="rounded-xl flex md:flex-row flex-col bg-white my-4 p-4 space-y-3">
        <div className="flex flex-col gap-2 md:justify-center space-y-3 flex-1 order-2 md:order-1">
          <div className="flex flex-col w-[75%] gap-2 justify-center items-start">
            <h2 className="text-nowrap">Subcategory Name</h2>
            <input
              type="text"
              placeholder="Enter new name"
              className="w-full p-2 inputD"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {loadingUpdate ? (
            <button className="bg-main-color w-[122px] h-[42px] text-center text-white rounded-lg">
              <img
                src="/public/loadingSpinnerW.svg"
                alt="Loading..."
                className="w-8 m-auto"
              />
            </button>
          ) : (
            <button
              className="bg-main-color hover:opacity-90 w-[122px] h-[42px] text-center text-white rounded-lg"
              onClick={updateSubCategory}
            >
              Update Sub
            </button>
          )}
        </div>

        <img
          src={addavatar}
          className="md:w-[35%] w-[70%] mx-auto md:block flex-2 order-1 md:order-2"
          alt=""
        />
      </div>
    </section>
  );
}
