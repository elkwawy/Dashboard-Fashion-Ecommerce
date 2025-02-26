import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onespicificSubcategory, updatespicificSubcategory } from "../../redux/slices/subCategoryslice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import addavatar from "../../assets/avater/update-cuate.svg";

export default function UpdateSubCat() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { subCategory, loading,loadingUpdate } = useSelector((state) => state.subCategory);
    const [name, setName] = useState("");

    
   

    useEffect(() => {
        if (id) {
            dispatch(onespicificSubcategory({ id }));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (subCategory && subCategory.length > 0) {
            setName(subCategory[0]?.name || "");
        }
    }, [subCategory]);

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
            const res = await dispatch(updatespicificSubcategory({ id,name })).unwrap();
            toast.success("Subcategory updated successfully");
        } catch (error) {
            toast.error("Error updating subcategory");
            console.error("❌ Error updating subcategory:", error);
        }
    };

    return (
        <>
            <section className="">
                <p className="font-bold text-2xl">Edit Subcategory</p>
                <div className="rounded-xl flex  bg-white my-4 p-4 min-h-screen space-y-3">
                  <div className="flex flex-col  md:justify-center  space-y-3 flex-1">
                  <div className="flex flex-col gap-4 justify-center items-start">
                   <h2 className="text-nowrap">Subcategory Name</h2>
                    <input
                        type="text"
                        placeholder="Enter new name"
                        className="w-full p-2 inputD"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                   </div>

                   {loadingUpdate ? <button className="bg-main-color px-8 py-2 w-[100px] h-[45px] text-xl text-white rounded-lg ">
                       <img src="/public/loadingSpinnerW.svg" alt="Loading..." className="w-10" />
                    </button>
                    :<button className="bg-main-color px-8 py-2 text-xl text-white rounded-lg w-[100px] h-[45px]" onClick={updateSubCategory}>
                        Save
                    </button> }
                    
                  </div>

                   <img src={addavatar} className="w-[36%] hidden md:block flex-2" alt=""/>
                </div>
            </section>
        </>
    );
}
