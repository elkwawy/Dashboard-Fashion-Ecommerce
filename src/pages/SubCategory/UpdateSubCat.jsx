import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onespicificSubcategory, updatespicificSubcategory } from "../../redux/slices/subCategoryslice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function UpdateSubCat() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { subCategory, loading } = useSelector((state) => state.subCategory);
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
                <div className="rounded-xl bg-white my-4 p-4 min-h-screen space-y-3">
                   <div className="flex flex-col md:flex-row gap-4 justify-center items-start ">
                   <h2 className="text-nowrap">Subcategory Name</h2>
                    <input
                        type="text"
                        placeholder="Enter new name"
                        className="w-full p-2 inputD"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                   </div>
                    <button className="bg-main-color px-8 py-2 text-xl text-white rounded-lg" onClick={updateSubCategory}>
                        Save
                    </button>
                </div>
            </section>
        </>
    );
}
