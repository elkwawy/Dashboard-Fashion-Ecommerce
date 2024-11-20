import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';
import * as yup from 'yup'
import ResetCode from '../../Auth/ResetCode/ResetCode'

export default function ForgetPass() {
    const [visible, setVisible] = useState(true);
    const [errorMsg,seterrorMsg]= useState(null)
    const [ShowResetCode,setShowResetCode] = useState(false)

    const toggleVisible = () => {
        setVisible(!visible)
     }
     const toggleVisibility = () => {
        setShowResetCode(!ShowResetCode)
    };
    
     const validationSchema = yup.object({
        email: yup.string().email("write your valid email").required("email is required"),
     })
    
    async function getforgetPsaa(values){
        let id;
         try{
      let options = {
        url:'https://ecommerce-dot-code.vercel.app/api/auth/forgotPassword',
        method:'Post',
        data:{
            email:values.email
        }
      }
      id= toast.loading("waiting...")
      const {data} = await axios.request(options)
      console.log(data);
      toast.dismiss(id)
      toast.success('Reset code sent to email')
     setTimeout(() => {
        setShowResetCode(true)
        setVisible(false)
     },3000);


         }catch(error){
            toast.dismiss(id)
            console.log(error);
            seterrorMsg(error.response.data.message)
         }
    }

const formik = useFormik({
    initialValues:{
      email:"",
    },
    validationSchema,
    onSubmit:getforgetPsaa,
  })
  


    return<>
 
  {visible ? (
   <section className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-10 min-h-screen text-center'>
   <form onSubmit={formik.handleSubmit} className='w-[90%] md:w-[70%] lg:w-[40%] xl:w-1/3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg'>
   <h3 className='text-2xl font-bold '>Forget Password</h3>
   
   <div className='my-4'>
  <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" placeholder='Enter Your Email' name='email' className='w-full border-2 p-2 rounded'/>
  {formik.errors.email && formik.touched.email ? (<div className='text-red-600 mt-1 font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded'>* {formik.errors.email}</div>):('')}
  </div>
 
   <button type='submit'  className='bg-black text-white py-2 px-4 w-full mb-4 rounded'>Send</button>
   <div className=' absolute top-[10%] left-[90%] -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg' onClick={toggleVisible}>
   <HiOutlineXMark className='text-2xl font-bold cursor-pointer'/>
   </div>
   </form>
   
  </section>
  
  ): ""}
  {ShowResetCode && (
               <ResetCode onSwitchToLogin={toggleVisibility} />
            )}
    </>
}
