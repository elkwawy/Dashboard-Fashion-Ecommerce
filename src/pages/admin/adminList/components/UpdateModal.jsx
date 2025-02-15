import Cookies from "js-cookie";
import { memo, useCallback, useEffect, useState } from "react";
import InputField from "../../../../components/Form/InputField";
import PasswordField from "../../../../components/Form/PasswordField";
import SubmitButton from "../../../../components/Form/SubmitButton";
import useAdmin from "../../../../hooks/useAdmin";
import { emailRegex } from "../../../../utils/regex";
import { useDispatch } from "react-redux";
import { updateAdmin } from "../../../../redux/slices/adminsSlice";
import { showToast } from "../../../../utils/showToast";

const UpdateModal = memo(({admin,currUser,onClose}) => {
    const [loading, setLoading] = useState(false);
    const [accept, setAccept] = useState(false);
    const [form, setForm] = useState({
        name: admin.name,
        email: admin.email,
        password: "",
        passwordConfirm:"",
        role:"admin",
    });

    useEffect(() => {
        emailRegex.test(form.email)
            ? setEmailError("")
            : setEmailError("Invalid email address");
    }, [form.email]);
    const [emailError, setEmailError] = useState('')
    
    const handleFormChange = useCallback((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }, [form]);
    

    const validateInputs = () => { 
        if (!form.email) { 
            setEmailError('Email is required')
            return false
        }
        if (!form.email.match(emailRegex)) { 
            setEmailError('Invalid email format')
            return false
        }
        return true;
    }

    const token = Cookies.get('token');
    
    const dispatch = useDispatch();

    const handleUpdateAdmin = useCallback( async(e) => { 
        e.preventDefault()
        setLoading(true);
        setAccept(true);

        if (
            form.name.length < 1 ||
            form.password.length < 8 ||
            form.password !== form.passwordConfirm || !validateInputs()
        ) {
            setLoading(false);
            return;
        }
        if (currUser && currUser.email !== import.meta.env.VITE_SUPER_ADMIN_EMAIL) { 
            showToast("error", "You aren't allowed to edit an admin");
            setLoading(false);
            return;
        }
        // update admin
        let updateMe = admin._id=== currUser._id || false ;
        try {
            
            await dispatch(updateAdmin({id:admin._id, updateMe ,adminDetails:form})).unwrap();
        } catch (error) {
            setLoading(false);
        } finally { 
            setLoading(false);
        }
    }, [form]);

    return (
        <div className=" overflow-y-auto overflow-x-hidden fixed top-0 left-0 flex  z-[110]  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="flex flex-col gap-2 bg-white w-3/4 z-[110] rounded-md  p-8  ">
                <button onClick={onClose} type="button" className="ml-auto trans end-2.5 text-gray-400 bg-transparent hover:bg-red-100  rounded-md w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="popup-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                {/* inputs */}
                <form
                    onSubmit={handleUpdateAdmin}
                    className="space-y-5 w-3/4 mx-auto text-right"
                    >
                    <InputField
                        type="text"
                        name="name"
                        label="Name"
                        value={form.name}
                        placeholder="Enter your name"
                        onChange={handleFormChange}
                        errorValidation={accept && form.name.length < 1}
                        errorMessage="Name is required"
                    />
                    <InputField
                        type="email"
                        name="email"
                        label="Email"
                        value={form.email}
                        placeholder="Enter your email address"
                        onChange={handleFormChange}
                        errorValidation={accept && emailError.length > 0}
                        errorMessage={emailError}
                    />
                    <PasswordField
                        name="password"
                        value={form.password}
                        label="Password"
                        placeholder="Enter a strong password"
                        onChange={handleFormChange}
                        errorValidation={accept && form.password.length < 8}
                        errorMessage="Password must be more than 8 char"
                    />
                    <PasswordField
                        name="passwordConfirm"
                        value={form.passwordConfirm}
                        label="Confirm password"
                        placeholder="Re-enter your password"
                        onChange={handleFormChange}
                        errorValidation={accept && form.password !== form.passwordConfirm}
                        errorMessage="Passwords must be the same"
                    />
                    <SubmitButton isLoading={loading} text="Update admin" />
                </form>
            </div>
            <div onClick={onClose} className='fixed w-full h-full top-0 left-0 bg-black/50 z-[100] backdrop-blur-sm ' />
        </div>
    )
})

export default UpdateModal