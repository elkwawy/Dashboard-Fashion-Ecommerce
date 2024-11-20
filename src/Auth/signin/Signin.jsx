import React, { useState } from 'react'
import { HiOutlineXMark } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import Login from '../login/Login';
import {API, Api} from '../../Api/Api';
import * as yup from 'yup'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

export default function Signin() {
    const [visible, setVisible] = useState(true)
    const [showlogin, setshowlogin] = useState(false);
    const [errorMsg,seterrorMsg] = useState(null)
   const [passType, setpassType] = useState("password")
   const [confirmPasswordType, setConfirmPasswordType] = useState("password");
     const toggleVisible = () => {
        setVisible(!visible)
     }
     const handelPassword =(e)=>{
      setpassType((prevType) => (prevType === "password" ? "text" : "password"));

     }
     const toggleConfirmPasswordVisibility = () => {
      setConfirmPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
    };
      

     const handleShowlogin = () => {
      setshowlogin(true); 
        setVisible(false);
       
        
    };

    const validationSchema =  yup.object({
      name: yup.string().required("name is required").min(3,'min name mast be 3 letters').max(15,'max name mast be 15 letter'),
        email: yup.string().email("write avalid email").required("email is required"),
        password: yup.string().required("password is required").matches(/^(?=.*[A-Z])[A-Za-z]{8,}$/,'Min 8 chars, Contains a capital letter'),
        passwordConfirm: yup.string().required("repassword is required").oneOf([yup.ref("password")],"password and repassword mast be same")
    })

    async function sendDataTORegister(values){
      let id;
      
  
     try{
      const options = {
        url:'https://ecommerce-dot-code.vercel.app/api/auth/signup',
        method:'POST',
        data:values
      }
  
    id = toast.loading("waiting...")
    const {data} = await axios.request(options)
    toast.dismiss(id)
    console.log(data);
    
    toast.success("user created successfully")
    console.log(data);
    
  
    setTimeout(()=>{
      if(data.token){
          setshowlogin(true)
          setVisible(false)
       }
  },3000)



     }catch(error){
      toast.dismiss(id)
       seterrorMsg(error.response.data.errors[0].msg);
     }
    }
  
  
  const formik = useFormik({
    initialValues:{
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role:"user"
    },
  
    validationSchema,
    onSubmit: sendDataTORegister
  })
  

    
  return <>
 
{visible ? (
 <section className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-10 min-h-screen text-center'>
 <form onSubmit={formik.handleSubmit} className='w-[90%] md:w-[70%] lg:w-[40%] xl:w-1/3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg'>
 <h3 className='text-2xl font-bold '>Create an Account</h3>
 <p className='my-2 text-sm'>Create a account to continue</p>
 <div className='my-4'>
  <label for="name" className='flex justify-between items-center mb-2'><span className='text-gray-600'>Name :</span> <span>{formik.errors.name && formik.touched.name ? (<div className='text-red-600  font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded'> {formik.errors.name}</div>):('')}</span></label>
<input onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} type="text" placeholder='Enter Your Name' name='name' className='w-full border-2 p-2 rounded'/>

</div>
<div className='my-4'>

<label for="email" className='flex justify-between items-center mb-2'> <span className='text-gray-600'>Email :</span> <span>{formik.errors.email && formik.touched.email ? (<div className='text-red-600  font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded'> {formik.errors.email}</div>):('')}</span></label>
<input onChange={formik.handleChange} value={formik.values.email}onBlur={formik.handleBlur}  type="email" placeholder='Enter Your Email' name='email' className='w-full border-2 p-2 rounded'/>
</div>
 <div className='mb-2 mt-4 relative'>

<label for="password" className='flex justify-between items-center mb-2'><span className='text-gray-600'>Password :</span> <span>{formik.errors.password && formik.touched.password ? (<div className='text-red-600  font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded'> {formik.errors.password}</div>):('')}</span></label>
 <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} type={passType} placeholder='Enter Password' name='password' className=' w-full border-2 p-2 rounded' />
 <button type="button" onClick={handelPassword} className='absolute top-[70%] right-2 -translate-y-1/2'>
        {passType === "password" ? <FaEye className='text-gray-500' /> : <FaEyeSlash  className='text-gray-500'/>}
      </button>
 </div>
<div className='my-2'>
</div>

 <div className='mb-2 mt-4 relative'>
  <label for="passwordConfirm" className='flex justify-between items-center mb-2'><span className='text-gray-600'>Rewrite password :</span><span>{formik.errors.passwordConfirm && formik.touched.passwordConfirm ? (<div className='text-red-600  font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded'> {formik.errors.passwordConfirm}</div>):('')}</span></label>
 <input onChange={formik.handleChange} value={formik.values.passwordConfirm} onBlur={formik.handleBlur} type={confirmPasswordType} placeholder='Rewrite the password' name='passwordConfirm' className='w-full border-2 p-2 rounded' />
 <button type="button" onClick={toggleConfirmPasswordVisibility} className='absolute top-[70%] right-2  -translate-y-1/2'>
        {confirmPasswordType === "password" ? <FaEye className='text-gray-500'/> : <FaEyeSlash  className='text-gray-500'/>}
      </button>
 </div>
 
  {errorMsg && <p className='text-red-600 font-semibold my-1'>{errorMsg}</p>}
 <div className=''>

 <button type='submit'  className='bg-black text-white py-2 px-4 w-full mb-4 mt-2 rounded'>sign up</button>
 
 <div>Already have an account? <button type='button' className='underline  text-gray-600 inline-block '  onClick={ handleShowlogin} >Login</button></div>
 </div>
 <div className=' absolute top-[10%] left-[90%] -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg' onClick={toggleVisible}>
 <HiOutlineXMark className='text-2xl font-bold cursor-pointer'/>
 </div>
 </form>
 
</section>

): ""}

{showlogin && (
                <Login onSwitchToLogin={handleShowlogin} />
            )}

 
  </>
}






