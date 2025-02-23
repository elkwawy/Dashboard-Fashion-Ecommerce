import React, { useState } from 'react'
import { AddNewSubcategory } from '../../redux/slices/subCategoryslice';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import sweetalert from '../../utils/sweetalert';
import toast from 'react-hot-toast';

export default function AddNewSub() {
     const [name, setName] = useState("");
     const dispatch = useDispatch();
     const {id} =useParams()
     const [category, setCategory] = useState(id);
     const navigate = useNavigate()

     
      const AddNewSubCategory = async () => {
             try {
                 const res = await dispatch(AddNewSubcategory({ name,category })).unwrap();
                 toast.success("subcategory added successfully");
                 navigate(`/categories/:categoryName/${id}`)
                 setName("")
                 console.log("✅ Subcategory added successfully:", res);
             } catch (error) {
                 console.error("❌ Error adding subcategory:", error);
                 toast.error("Error adding subcategory");
             }
         };
  return (
    <>
    <h2 className='text-2xl font-semibold'>Add New Sub Category</h2>
     <div className='rounded-xl flex items-center flex-col bg-white my-4 p-4 min-h-screen space-y-3'>
     <div className="flex flex-col md:flex-row gap-4 w-full  justify-center items-start ">
                   <h2 className="text-nowrap">Subcategory Name</h2>
                    <input
                        type="text"
                        placeholder="Enter new name"
                        className="w-full p-2 inputD"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                   </div>
                   <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-start">
                   <h2 className="text-nowrap min-w-[130px]">category</h2>

                    <input
                        type="text"
                        placeholder=""
                        className="w-full p-2 border border-gray-300 rounded outline-none"
                        readOnly 
                        value={id}
                    />
                   </div>
                   <button className="bg-main-color px-8 py-2  text-center text-xl text-white rounded-lg" onClick={AddNewSubCategory}>
                        Save
                    </button>

</div>
    </>
   
  )
}
