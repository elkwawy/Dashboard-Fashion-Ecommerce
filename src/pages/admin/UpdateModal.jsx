import Cookies from "js-cookie";
import { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { emailRegex } from "../../Auth/Login";
import useAdmin from "../../hooks/useAdmin";
import { phoneRegex } from "./AddNewAdmin";
import Loader from "../../utils/Loader";

const UpdateModal = ({admin,onConfirm, onClose}) => {
    const currentUser = useSelector((state) => state.user.user)
    
    const [name, setName] = useState(admin.name)
    const [email, setEmail] = useState(admin.email)
    const [phoneNumber, setPhoneNumber] = useState('01228050484')

    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const {status, error} = useSelector((state) => ({ 
        status: state.admins.status,
        error: state.admins.error
    }))

    const handleNameChange = (e) => { 
        setName(e.target.value)
    }

    const handleEmailChange = (e) => { 
        setEmail(e.target.value)
    }

    const handlePhoneNumberChange = (e) => { 
        setPhoneNumber(e.target.value)
    }

    const validateInputs = () => { 
        if (!name) { 
            setNameError('Name is required')
            return false
        }
        setNameError('');
        if (!email) { 
            setEmailError('Email is required')
            return false
        }
        if (!email.match(emailRegex)) { 
            setEmailError('Invalid email format')
            return false
        }
        setEmailError('');
        if (!phoneNumber) {  
            setPhoneNumberError('Phone number is required')
            return false
        }
        if (!phoneNumber.match(phoneRegex)) {  
            setPhoneNumberError('Phone number must be 11 digits')
            return false
        }
        setPhoneNumberError('');

        return true;
    }

    const token = Cookies.get('token');

    const {updateOldAdmin} = useAdmin()

    const updateAdmin = () => { 
        if (validateInputs()) { 
            // const emailToBeSent = admin.email != email ? email : null;
            updateOldAdmin(admin._id, name, email, JSON.parse(token), currentUser);
            // onClose();
        }
    }

    return (
        <div className=" overflow-y-auto overflow-x-hidden fixed top-0 left-0 flex  z-[110]  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="flex flex-col gap-2 bg-white w-3/4 z-[110] rounded-md  p-8  ">
                <button onClick={onClose} type="button" className="ml-auto trans end-2.5 text-gray-400 bg-transparent hover:bg-red-100  rounded-md w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="popup-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="  grid grid-cols-[200px_1fr] gap-32 ">
                    
                    <div className=" flex flex-col gap-5 items-center">
                        <p className="font-bold">Upload your profile photo</p>
                        <div className="relative rounded-full   w-44 h-44">
                            {/* image */}
                            <div className="w-full h-full bg-gray-200  rounded-full" />
                            <div className=" absolute top-[95%] flex trans cursor-pointer hover:bg-blue-600 items-center justify-center rounded-full w-12 h-12 bg-main-color text-white right-0 -translate-y-1/2 -translate-x-1/2 ">
                                <CiCamera className="text-2xl " />
                            </div>
                        </div>
                    </div>
                    {/* inputs */}
                    <div className="w-full flex flex-col gap-5">
                        <label className="flex flex-col gap-2">
                            <div className="flex  justify-between">
                                <span className="select-none cursor-pointer">Name *</span>
                                {nameError && <div className="bg-red-100 text-red-500 px-4 rounded-sm py-1 text-sm">{nameError}</div>}
                            </div>
                            <input value={name} onChange={handleNameChange} type="text" placeholder="Username" className={`border-2 ${nameError ? "border-red-500" : ""} p-2 rounded-sm trans focus-within:outline-main-color outline-1`} />
                        </label>
                        <label className="flex flex-col gap-2">
                            <div className="flex  justify-between">
                                <span className="select-none cursor-pointer">Email *</span>
                                {emailError && <div className="bg-red-100 text-red-500 px-4 rounded-sm py-1 text-sm">{emailError}</div>}
                            </div>
                            <input value={email} type="text" onChange={handleEmailChange} placeholder="Email address" className={`border-2 ${emailError ? "border-red-500" : ""} p-2 rounded-sm trans focus-within:outline-main-color outline-1`} />
                        </label>
                        <label className="flex flex-col gap-2">
                            <div className="flex  justify-between">
                                <span className="select-none cursor-pointer">Phone number *</span>
                                {phoneNumberError && <div className="bg-red-100 text-red-500 px-4 rounded-sm py-1 text-sm">{phoneNumberError}</div>}
                            </div>
                            <input value={phoneNumber} type="text" onChange={handlePhoneNumberChange} placeholder="Phone number" className={`border-2 ${phoneNumberError ? "border-red-500" : ""} p-2 rounded-sm trans focus-within:outline-main-color outline-1`} />
                        </label>
                    </div>
                </div>
                <div className="w-full flex justify-end items-center mt-8">
                    {status !== "loading" &&  <button onClick={updateAdmin}  className=" px-5 py-2 rounded-sm text-white hover:bg-blue-600 bg-main-color trans">Update admin</button>}
                    {status === "loading" && <div className="w-[118px] h-10 flex items-center justify-center"><Loader /></div>}
                </div>
            </div>
            <div onClick={onClose} className='fixed w-full h-full top-0 left-0 bg-black/50 z-[100] backdrop-blur-sm ' />
        </div>
    )
}

export default UpdateModal