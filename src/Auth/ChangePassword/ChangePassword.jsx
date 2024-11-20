import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'

export default function ResetPassword() {
    const [errorMsg,seterrorMsg]= useState(null)
    const navigate = useNavigate()

  

    const validationSchema = yup.object({
        email: yup.string().email("write avalid email").required("email is required"),
        newPassword: yup.string().required("newPassword is required").matches(/^[A-Z][A-Za-z\d]{7,}$/,'Min 8 chars, starting with a capital letter'),
    })
    async function newPassword(values){
      let id;
      try {
        let options = {
          url:'https://ecommerce-dot-code.vercel.app/api/auth/resetPassword',
          method:'PUT',
          
          data: {
              email: values.email, 
              newPassword: values.newPassword 
            },
        }
      
       id= toast.loading("waiting...")
      
      const {data} = await axios.request(options)
      console.log(data);
      toast.dismiss(id)
      toast.success('password change successful')
   
      
    setTimeout(() => {
        navigate("/")
    }, 3000);

      
      } catch (error) {
        toast.dismiss(id)
             console.log(error);
             seterrorMsg(error.response.data.message)
      }
    }


    
    
    
    const formik = useFormik({
      initialValues:{
        email:"",
        newPassword:"",
      },
      validationSchema,
      onSubmit:newPassword,
    })
  return <>
   <section className='min-h-screen text-center '>
                    <form onSubmit={formik.handleSubmit} className='w-[90%] md:w-[70%] lg:w-[40%] xl:w-1/3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg'>
                        <h3 className='text-2xl font-bold '>change password</h3>
                        <div className='my-4'>
                            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name='email' placeholder='Email' className='w-full border-2 p-2 rounded' />
                            {formik.errors.email && formik.touched.email ? (<div className='text-red-600 mt-1 font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded'> {formik.errors.email}</div>):('')}
                        </div>
                        <div className='mb-4'>
                            <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name='newPassword' placeholder='newPassword' className='w-full border-2 p-2 rounded' />
                            {formik.errors.newPassword && formik.touched.newPassword ? (<div className='text-red-600 mt-1 font-semibold'>* {formik.errors.newPassword}</div>):('')}
                        </div>

                        {errorMsg && <div className='text-red-600 my-1 font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded'>* {errorMsg}</div>}

                      
                        <div>
                            <button type='submit' className='bg-black text-white py-2 px-4 w-full mb-4 rounded'>change password</button>
                        </div>
                        
                    </form>
                </section>
  </>
}
