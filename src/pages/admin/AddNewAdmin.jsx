import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { useSelector } from "react-redux";
import { emailRegex, passwordRegex } from "../../Auth/Login";
import useAdmin from "../../hooks/useAdmin";
import useShowToast from "../../hooks/useShowToast";
import Loader from "../../utils/Loader";
import { FiUploadCloud } from "react-icons/fi";

export const phoneRegex = /^\d{11}$/;
const AddNewAdmin = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordConfirmError, setPasswordConfirmError] = useState('');

    const [uploadedImg, setUploadedImg] = useState(null);
    const [isDragging, setIsDragging] = useState(false)

    const fileRef = useRef(null);
    const {showToast} = useShowToast()

    const status = useSelector((state => state.admins.status))
    const error = useSelector((state => state.admins.error))

    const handleNameChange = (e) => { 
        setName(e.target.value)
    }

    const handleEmailChange = (e) => { 
        setEmail(e.target.value)
    }
    

    const handlePasswordChange = (e) => { 
        setPassword(e.target.value)
    }
    
    const handlePasswordConfirmChange = (e) => { 
        setPasswordConfirm(e.target.value)
    }


    const validateInputs = () => {
        let isValid = true;

        if (!name) {
            setNameError("Name is required");
            isValid = false;
        } else {
            setNameError("");
        }

        if (!email) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!email.match(emailRegex)) {
            setEmailError("Invalid email format");
            isValid = false;
        } else {
            setEmailError("");
        }
        

        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (!password.match(passwordRegex)) {
            setPasswordError("Password must be at least 8 characters");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (!passwordConfirm) {
            setPasswordConfirmError("Password is required");
            isValid = false;
        } else if (password !== passwordConfirm) {
            setPasswordConfirmError("Passwords do not match");
            isValid = false;
        } else {
            setPasswordConfirmError("");
        }

        return isValid;
    };

    const token = Cookies.get('token');
    const parsedToken = token ? JSON.parse(token) : null;
    if (!parsedToken) {
        showToast("error", "Authentication problem occurred");
        return;
    }
    const {addAnAdmin} = useAdmin();
    const addAdmin = async () => {
        if (validateInputs()) {
            addAnAdmin(name, email, password, passwordConfirm);
        };
    }

    const handleUploadFile = () => { 
        if (fileRef && fileRef.current) { 
            fileRef.current.click();
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                const preview = URL.createObjectURL(file);
                setUploadedImg(preview);
                fileRef.current.value = ""; // Reset file input
            } else {
                showToast("error", "Please select an image");
            }
        }
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0]; // Extract the file from the event
        if (file) {
            if (file.type.startsWith("image/")) {
                const preview = URL.createObjectURL(file);
                setUploadedImg(preview);
            } else {
                showToast("error", "Please select an image");
            }
        }
    };

    const onDragLeave = (e) => { 
        e.preventDefault();
        setIsDragging(false);
    }

    return (
        <div className="w-full pb-2">
            <div className="w-full rounded-md bg-white p-5 grid grid-cols-1  place-items-center min-[900px]:place-items-start min-[900px]:grid-cols-[200px_1fr] gap-10 sm:gap-20 lg:gap-40 ">
                
                <div onClick={handleUploadFile} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} className={`relative rounded-full ${isDragging ? "scale-105 " : ""} trans  ${!uploadedImg ? " border-dashed border-main-color" : ""} border-[1px] cursor-pointer flex items-center justify-center w-44 h-44 lg:w-56 lg:h-56`}>
                    {/* image */}
                    {!uploadedImg && <div className={`w-full h-full   rounded-full  flex flex-col gap-2 items-center justify-center text-xs`} >
                        <FiUploadCloud className="text-gray-400 text-5xl" />
                        <p className="font-semibold text-gray-400 ">Drag here <span className="text-main-color">or</span> Browse</p>
                    </div>}
                    {uploadedImg && <img src={uploadedImg} alt=""  className="w-full h-full rounded-full object-cover"/>  }
                    <div className=" absolute top-[95%] flex trans cursor-pointer hover:bg-blue-600 items-center justify-center rounded-full w-12 h-12 bg-main-color text-white right-0 -translate-y-1/2 -translate-x-1/2 ">
                        <CiCamera role="button"  className="text-2xl " />
                        <input ref={fileRef} onChange={handleFileChange} type="file" className="hidden" />
                    </div>
                </div>
                {/* inputs */}
                <div className="w-full flex flex-col gap-5">
                    <label className="flex flex-col gap-2">
                        <div className="flex  justify-between">
                            <span className="select-none cursor-pointer">Name *</span>
                            {nameError && <div className="bg-red-100 text-red-500 px-2 sm:px-4 rounded-sm py-1 text-xs sm:text-sm">{nameError}</div>}
                        </div>
                        <input value={name} onChange={handleNameChange} type="text" placeholder="Username" className={`border-2 ${nameError ? "border-red-500" : "focus:border-main-color"} p-2 rounded-sm trans outline-0 `} />
                    </label>
                    <label className="flex flex-col gap-2">
                        <div className="flex  justify-between">
                            <span className="select-none cursor-pointer">Email *</span>
                            {emailError && <div className="bg-red-100 text-red-500 px-2 sm:px-4 rounded-sm py-1 text-xs sm:text-sm">{emailError}</div>}
                        </div>
                        <input value={email} type="text" onChange={handleEmailChange} placeholder="Email address" className={`border-2 ${emailError ? "border-red-500" : "focus:border-main-color"} p-2 rounded-sm trans outline-0 `} />
                    </label>
                    <label className="flex flex-col gap-2">
                        <div className="flex  justify-between">
                            <span className="select-none cursor-pointer">Password *</span>
                            {passwordError && <div className="bg-red-100 text-red-500 px-2 sm:px-4 rounded-sm py-1 text-xs sm:text-sm">{passwordError}</div>}
                        </div>
                        <input value={password} type="password" onChange={handlePasswordChange} placeholder="Password" className={`border-2 ${passwordError ? "border-red-500" : "focus:border-main-color"} p-2 rounded-sm trans outline-0 `} />
                    </label>
                    <label className="flex flex-col gap-2">
                        <div className="flex  justify-between">
                            <span className="select-none cursor-pointer">Confirm password *</span>
                            {passwordConfirmError && <div className="bg-red-100 text-red-500 px-2 sm:px-4 rounded-sm py-1 text-xs sm:text-sm">{passwordConfirmError}</div>}
                        </div>
                        <input value={passwordConfirm} type="password" onChange={handlePasswordConfirmChange} placeholder="Confirm Password" className={`border-2 ${passwordConfirmError ? "border-red-500" : "focus:border-main-color"} p-2 rounded-sm trans outline-0 `} />
                    </label>
                </div>
            </div>
            <div className="w-full flex  justify-center min-[900px]:justify-end items-center mt-5">
                {status !== "loading" && <button onClick={addAdmin} className=" px-5 py-2 rounded-sm text-white hover:bg-blue-600 bg-main-color trans">Add admin</button>}
                {status == "loading" && <div className="w-[118px] h-10 flex items-center justify-center"><Loader /></div>}
            </div>

        </div>
    )
}

export default AddNewAdmin