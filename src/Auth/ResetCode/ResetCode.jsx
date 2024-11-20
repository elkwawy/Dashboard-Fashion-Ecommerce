import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'

export default function ForgetPass() {
    const [visible, setVisible] = useState(true);
    const [errorMsg,seterrorMsg]= useState(null)
    const navigate = useNavigate()

    const toggleVisible = () => {
        setVisible(!visible)
     }
     
    
 const validationSchema = yup.object({
  resetCode: yup.string().required("code is required").min(6).max(6),
 })

async function resetCode(values){
    let id;
     try{
  let options = {
    url:'https://ecommerce-dot-code.vercel.app/api/auth/verifyResetCode',
    method:'Post',
    data:{
      resetCode:values.resetCode
    }
  }

  id= toast.loading("waiting...") 

  const {data} = await axios.request(options)
  console.log(data);
  toast.dismiss(id)
  toast.success('password reset successful')
  navigate("/resetpassword")
  setVisible(false)

     }catch(error){
        toast.dismiss(id)
        console.log(error);
        seterrorMsg(error.response.data.message)
     }
}

const formik = useFormik({
    initialValues:{
      resetCode:"",
    },
    validationSchema,
    onSubmit:resetCode,
  })
  


    return<>
 
  {visible ? (
   <section className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-10 min-h-screen text-center'>
   <form onSubmit={formik.handleSubmit} className='w-[90%] md:w-[70%] lg:w-[40%] xl:w-1/3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg'>
   <h3 className='text-2xl font-bold '>Enter Your Code</h3>
   
   <div className='mt-4'>
  <input onChange={formik.handleChange} value={formik.values.resetCode} onBlur={formik.handleBlur} type="text" placeholder='Enter Your code' name='resetCode' className='w-full border-2 p-2 rounded'/>
  {formik.errors.resetCode && formik.touched.resetCode ? (<div className='text-red-600 mt-1 font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded'> {formik.errors.resetCode}</div>):('')}

  </div>
   {errorMsg && <div className='text-red-600 my-1 font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded mb-2'> {errorMsg}</div>}

   <button type='submit'  className='bg-black text-white py-2 px-4 w-full mb-4 rounded mt-4'>Send</button>
   <div className=' absolute top-[10%] left-[90%] -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg' onClick={toggleVisible}>
   <HiOutlineXMark className='text-2xl font-bold cursor-pointer'/>
   </div>
   </form>
   
  </section>
  
  ): ""}
   
    </>
}
