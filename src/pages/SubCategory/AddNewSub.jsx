import React, { useState } from 'react'
import { AddNewSubcategory } from '../../redux/slices/subCategoryslice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import sweetalert from '../../utils/sweetalert';
import toast from 'react-hot-toast';
import avater from "../../assets/avater/update1.svg";

export default function AddNewSub() {
    const {loadingAdd} = useSelector((state) => state.subCategory);
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
    
     <div className='rounded-xl flex   flex-col md:flex-row items-center  gap-4 bg-white p-4  space-y-3'>
    <div className='flex-1 md:h-full w-full  md:justify-center justify-start flex flex-col space-y-2 order-2 md:order-1'>
    <div className="flex flex-col gap-4 w-full justify-center items-start   ">
                   <h2 className="text-nowrap">Subcategory Name</h2>
                    <input
                        type="text"
                        placeholder="Enter new name"
                        className="w-full p-2 inputD"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                   </div>
                   <div className="flex flex-col gap-4 w-full justify-center items-start">
                   <h2 className="text-nowrap min-w-[130px]">category</h2>

                    <input
                        type="text"
                        placeholder=""
                        className="w-full p-2 border border-gray-300 rounded outline-none"
                        readOnly 
                        value={id}
                    />
                   </div>
                   <div className='w-fit'>
                   {loadingAdd ? <button className="bg-main-color px-8 py-2 w-[120px] h-[45px] text-center text-xl text-white rounded-lg" >
                        <img  src="/public/loadingSpinnerW.svg"
                  className="w-8 mx-auto"
                  alt=" Loading..." />
                    </button> : ( <button className="bg-main-color hover:opacity-90 px-8 py-2 w-[120px] h-[45px]  text-center text-xl text-white rounded-lg" onClick={AddNewSubCategory}>
                        Add
                    </button>)}
                   </div>
                  
    </div>

                   <img src={avater} className=" w-[36%]  order-1 md:order-2 flex-2 object-cover" alt="" />

</div>
    </>
   
  )
}
