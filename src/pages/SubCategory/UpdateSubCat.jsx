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
               
                <div className="rounded-xl flex md:flex-row flex-col  bg-white my-4 p-4 space-y-3">
                  <div className="flex flex-col  md:justify-center  space-y-3 flex-1 order-2 md:order-1">
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

                   {loadingUpdate ? <button className="bg-main-color px-8 py-2 w-[130px] h-[45px] text-xl text-white rounded-lg ">
                       <img src="/public/loadingSpinnerW.svg" alt="Loading..." className="w-10 m-auto" />
                    </button>
                    :<button className="bg-main-color px-8 py-2 text-xl text-white rounded-lg w-[130px] h-[45px]" onClick={updateSubCategory}>
                        Update
                    </button> }
                    
                  </div>

                   <img src={addavatar} className="md:w-[36%] w-[70%] mx-auto md:block flex-2 order-1 md:order-2 "  alt=""/>
                </div>
            </section>
        </>
    );
}
