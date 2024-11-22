import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import loginBackground from "../assets/loginBackground.webp";
import useLogin from '../hooks/useLogin';
import useShowToast from '../hooks/useShowToast';
import Loader from './../utils/Loader';

const  Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setemailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate();
  const {user, status, error} = useSelector((state) => state.user)
  const {login} = useLogin();
  const {showToast} = useShowToast(); 
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  const passwordRegex = /^.{8,}$/;
  
  const token = Cookies.get("token");

  const handleSubmit = ((e) => {
    e.preventDefault();
    if (!emailError && !passwordError)
      memoizedLogin();
  });
  
  const memoizedLogin = useCallback(() => { 
    login(email, password);
  }, [email, password])

  useEffect(() => { 
      if (status === "succeeded") {
          if (user) { 
              if (user.role === "admin")  { 
                  showToast("success", "Login succeeded");
                  // nav to dashborad
                  navigate('/dashboard');
              }
              else { 
                  showToast("error", "You should be an admin to enter !");
              }
          }

      }
      else if (status === "failed") { 
          showToast("error", error );
      }
  }, [user, status]);

  const changeEmail = (e) => { 
    setEmail(e.target.value);
  }
  const changePassword = (e) => { 
    setPassword(e.target.value);
  }

  const checkIfEmailValid = (e) => { 
    if (!e.target.value ){
      setemailError("Please enter your email");
    }
    else if (e.target.value && !e.target.value.match(emailRegex)) { 
      setemailError("Invalid email address");
    }
    else { 
      setemailError("");
    }
  }
  const checkIfPasswordValid = (e) => { 
    if (!e.target.value) { 
      setPasswordError("Please enter your password");
    }
    else if (e.target.value && !e.target.value.match(passwordRegex)) { 
      setPasswordError("Password must be at least 8 characters");
    }
    else { 
      setPasswordError("");
    }
  }

  const toggleShowPassword = () => { 
    setShowPassword(prev => !prev);
  }

  if (token) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-full z-50  bg-main-color flex items-center justify-center">
      <img draggable={false} src={loginBackground} alt="background" className='w-full h-screen max-sm:hidden fixed top-0 left-0 z-10' />
      
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md z-50 w-11/12 sm:w-[450px]">
        <h2 className="text-2xl font-bold text-center mb-2">Login to Account</h2>
        <p className="text-gray-600 text-center text-sm mb-6">
          Please enter your email and password to continue
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={`focus:border-main-color `}>
            <div className=" w-full  flex items-center justify-between  text-sm font-medium text-gray-700 ">
              <p className='mb-2'>Email address:</p>
              {emailError && <p className='py-0.5 px-4 mb-1 bg-red-100 text-red-500 rounded-sm'>{emailError}</p>}
            </div>
            <input
              type="email"
              value={email}
              onBlur={checkIfEmailValid}
              onChange={changeEmail}
              className={`w-full p-2 outline-1 border-2 rounded-md bg-gray-50 ${emailError ? "outline-red-400 border-red-400" : "focus:outline-main-color"}  `}
              placeholder="Enter your email"
              
            />
          </div>
          
          <div className=''>
            <div className="flex w-full items-center justify-between text-sm font-medium text-gray-700 ">
              <p className='mb-2'>Password:</p>
              {passwordError && <p className='py-0.5 px-4 mb-1 bg-red-100 text-red-500 rounded-sm'>{passwordError}</p>}
            </div>
            <div className='relative'>
              <input
                type={showPassword ? "text" :"password"}
                placeholder='• • • • • • • • •'
                value={password}
                onBlur={checkIfPasswordValid}
                onChange={changePassword}
                className={`w-full relative p-2 outline-1 border-2 rounded-md bg-gray-50 ${passwordError ? "outline-red-400 border-red-400" : "focus:outline-main-color"} `}
                
              />
              <button type='button' onClick={toggleShowPassword} className=' absolute top-1/2 -translate-y-1/2 right-2 '>
                {showPassword && <LuEyeOff />}
                {!showPassword && <LuEye />}
              </button>
              
            </div>
          </div>
          
          <div className="flex items-center justify-between ">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-1 mt-0.5 cursor-pointer"
              />
              <span className="text-sm text-gray-600">Remember Password</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forget Password?
            </a>
          </div>
          
          {status != "loading" && <button
            type="submit"
            className={`w-full bg-blue-500 text-white border-[1px] border-main-color py-2 rounded-md hover:bg-blue-600 transition-colors  `}
          >
            Sign In
          </button>}
          {status == "loading" && <div className='w-full justify-center h-[41px] mt-[16px] flex items-center'>
            <Loader /> 
          </div>}
        </form>
        
      </div>
    </div>
  );
}

export default Login;