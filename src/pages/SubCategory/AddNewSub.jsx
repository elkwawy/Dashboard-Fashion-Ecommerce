import React, { useState } from "react";
import { AddNewSubcategory } from "../../redux/slices/subCategoryslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import sweetalert from "../../utils/sweetalert";
import toast from "react-hot-toast";
import avater from "../../assets/avater/update1.svg";

export default function AddNewSub() {
  const { loadingAdd } = useSelector((state) => state.subCategory);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [category, setCategory] = useState(id);
  const navigate = useNavigate();

  const AddNewSubCategory = async () => {
    try {
      const res = await dispatch(
        AddNewSubcategory({ name, category })
      ).unwrap();
      toast.success("subcategory added successfully");
      navigate(`/categories/:categoryName/${id}`);
      setName("");
      console.log("✅ Subcategory added successfully:", res);
    } catch (error) {
      console.error("❌ Error adding subcategory:", error);
      toast.error("Error adding subcategory");
    }
  };
  return (
    <>
      <div className="rounded-xl flex flex-col md:flex-row items-center gap-6 bg-white p-4  space-y-3">
        <div className="flex-1 md:h-full w-full gap-3  md:justify-center justify-start flex flex-col space-y-2 order-2 md:order-1">
          <div className="flex flex-col w-[75%] gap-2 justify-center items-start">
            <h2 className="text-nowrap">Subcategory Name</h2>
            <input
              type="text"
              placeholder="Enter subcategory name"
              className="w-full p-2 inputD"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-[75%] justify-center items-start">
            <h2 className="text-nowrap min-w-[130px]">Category ID</h2>
            <input
              type="text"
              placeholder=""
              className="w-full px-2 py-2 bg-gray-100 text-gray-500 cursor-not-allowed outline-none border border-gray-300 rounded"
              readOnly
              value={id}
            />
          </div>
      
            {loadingAdd ? (
              <button className="bg-main-color w-[125px] h-[44px] text-center text-lg text-white rounded-lg">
                <img
                  src="/public/loadingSpinnerW.svg"
                  className="w-8 mx-auto"
                  alt=" Loading..."
                />
              </button>
            ) : (
              <button
                className="bg-main-color hover:opacity-90 w-[125px] h-[44px] text-center text-lg text-white rounded-lg"
                onClick={AddNewSubCategory}
              >
                Add Sub
              </button>
            )}
         
        </div>

        <img
          src={avater}
          className="w-[28%] order-1 md:order-2 flex-2 object-cover"
          alt=""
        />
      </div>
    </>
  );
}
