import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

export default function AddUser() {
   const [passType, setPassType]= useState("password")
   const [confirmpassType, setconfirmPassType]= useState("password")
   const togglePassType = () => {
      setPassType(passType === "password" ? "text" : "password")
   }

   const toggleconfirmPassType = () => {
    setconfirmPassType(confirmpassType === "password" ? "text" : "password")
 }

  return<>
  <section>
    <div className='container py-4 '>
      <h3 className='text-2xl font-semibold'>Add New User</h3>
      <div className='bg-white rounded-xl px-4 pt-4 pb-14 my-4 space-y-2'>
        <h2 className='text-xl font-semibold '>Account</h2>
        <div className='grid grid-cols-12 gap-4 '>
        <div className='col-span-12 md:col-span-12 lg:col-span-5'>
            <p className='text-gray-500 text-lg '>Fill in the information below to add a new account</p>
        </div>
        <form className='space-y-4 col-span-12 md:col-span-12 lg:col-span-7'>
        <div className='space-y-2'>
        <label htmlFor="name" className='font-semibold text-xl'>Name</label>
        <input type="text" id="name" name="name" placeholder='User Name' required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className='space-y-2'>
        <label htmlFor="email"  className='font-semibold text-xl'>Email</label>
        <input type="email" id="email" name="email" placeholder='email' required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className='space-y-2'>
        <label htmlFor="password" className='font-semibold text-xl'>Password</label>
        <div className='relative'>
        <input type={passType} id="password" name="password" placeholder='password' required className="w-full p-2 border border-gray-300 rounded" />
        {passType === "password"? <FaEye onClick={togglePassType} className='absolute top-3 right-3'/>:<FaEyeSlash onClick={togglePassType} className='absolute top-3 right-3'/>}
        </div>
        </div>
        <div className='space-y-2'>
        <label htmlFor="conformpassword" className='font-semibold text-xl'>confirm password</label>
        <div className='relative'>
        <input type={confirmpassType} id="confirmPassword" name="confirmpassword" placeholder='confirm Password' required className="w-full p-2 border border-gray-300 rounded" />
        {confirmpassType === "password"? <FaEye onClick={toggleconfirmPassType} className='absolute top-3 right-3'/>:<FaEyeSlash onClick={toggleconfirmPassType} className='absolute top-3 right-3'/>}
        </div>

        </div>
        </form>
        </div>
      </div>
    </div>
  </section>
  </>
}
