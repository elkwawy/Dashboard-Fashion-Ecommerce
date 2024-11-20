
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineXMark } from "react-icons/hi2";
import Signin from '../signin/Signin';
import * as yup from 'yup'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useFormik } from 'formik';
import {API} from '../../Api/Api';
import Cookies from 'js-cookie';
import ForgetPass from '../../Auth/ForgetPass/ForgetPass';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

export default function Login() {
    const [isLoginVisible, setIsLoginVisible] = useState(true);
    const [showSignup, setShowSignup] = useState(false);
    const [showForgetPass, setShowForgetPass] = useState(false);
    const [passType, setpassType] = useState("password")
    const [errorMsg,seterrorMsg]= useState(null)
    const navigate = useNavigate();


    const toggleVisibility = () => {
        setIsLoginVisible(!isLoginVisible);
        setShowSignup(false); 
    };

    const handleShowSignup = () => {
        setShowSignup(true); 
        setIsLoginVisible(false);
        setShowForgetPass(false);
    };
    const handelPassword =(e)=>{
      setpassType((prevType) => (prevType === "password" ? "text" : "password"));

     }

    const handleShowForgetPass =()=>{
      setShowForgetPass(true);
      setShowSignup(false);
      setIsLoginVisible(false);
    }

    const validationSchema = yup.object({
          email: yup.string().email("write avalid email").required("email is required"),
          password: yup.string().required("password is required").matches(/^(?=.*[A-Z])[A-Za-z]{8,}$/,'Min 8 chars, Contains a capital letter'),
      })
      async function sendDataregastir(values){
        let id;
        try {
          let options = {
            url:'https://ecommerce-dot-code.vercel.app/api/auth/login',
            method:'POST',
            
            data: {
                email: values.email, 
                password: values.password 
              },
          }
        
         id= toast.loading("waiting...")
        
        const {data} = await axios.request(options)
      
        toast.dismiss(id)
        toast.success('User logged in successfully')
        console.log(data);
        
        const token = data.token;
        Cookies.set("token", token, { expires: 7 });
        
      setTimeout(() => {
        window.location.reload();
        navigate("/")
        setIsLoginVisible(false)
      }, 3000);

        
        } catch (error) {
          toast.dismiss(id)
               seterrorMsg(error.response.data.message)
        }
      }


      
      
      
      const formik = useFormik({
        initialValues:{
          email:"",
          password:"",
        },
        validationSchema,
        onSubmit:sendDataregastir,
      })
      

    return (<>
            {isLoginVisible && (
                <section className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-10 min-h-screen text-center '>
                    <form onSubmit={formik.handleSubmit} className='w-[90%] md:w-[70%] lg:w-[40%] xl:w-1/3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg'>
                        <h3 className='text-2xl font-bold '>Login to Account</h3>
                        <p className='my-4'>Please enter your email and password</p>
                        <div className='my-4'>
                          <label for ="email" className='flex justify-between items-center mb-2'><span className='text-gray-600'>Email :</span> <span> {formik.errors.email && formik.touched.email ? (<div className='text-red-600 mt-1 font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded'> {formik.errors.email}</div>):('')}</span></label>
                            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name='email' placeholder='Enter Your Email' className='w-full border-2 p-2 rounded' />
                           
                        </div>
                        <div className='mb-2 relative'>
                          <label for="password" className='flex justify-between items-center mb-2  text-gray-600'><span>Password :</span> <span> {formik.errors.password && formik.touched.password ? (<div className='text-red-600 mt-1 font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded'> {formik.errors.password}</div>):('')}</span></label>
                            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type={passType} name='password' placeholder='Password..' className=' w-full border-2 p-2 rounded' />
                            
                            <button type="button" onClick={handelPassword} className='absolute top-[70%] right-2 -translate-y-1/2'>
                            {passType === "password" ? <FaEye className='text-gray-500' /> : <FaEyeSlash  className='text-gray-500'/>}
                           </button>
                         </div>
            
                        

                        {errorMsg && <div className='text-red-600 mt-1 font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded mb-2'> {errorMsg}</div>}

                        <div className='md:flex justify-between mb-4 ml-auto w-fit'>
                            
                            <div className='text-sm cursor-pointer mt-2' onClick={handleShowForgetPass}>Forget password?</div>
                        </div>

                        <div>
                            <button type='submit' className='bg-black text-white py-2 px-4 w-full mb-4 rounded'>Log in</button>
                            <div>Don’t have an account? <button type='button' className='underline text-gray-600 inline-block ' onClick={handleShowSignup}>Create account</button></div>
                           
                        </div>
                        <div className='absolute top-[10%] left-[90%] -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg' onClick={toggleVisibility}>
                            <HiOutlineXMark className='text-2xl font-bold cursor-pointer' />
                        </div>
                    </form>
                </section>
            )}

            {showSignup && (
                <Signin onSwitchToLogin={toggleVisibility} />
            )}

{showForgetPass && (
                <ForgetPass onSwitchToLogin={toggleVisibility} />
            )}
        </>
    );
}
