import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function PasswordField({
  name,
  value,
  label,
  placeholder,
  onChange,
  errorValidation,
  errorMessage,
}) {
  const [passType, setPassType] = useState("password");
  const togglePassType = () =>
    setPassType(passType === "password" ? "text" : "password");

  return (
    <div className="space-y-2 relative">
      <div className="flex justify-between items-center">
        <label
          htmlFor={name}
          className="block select-none font-semibold text-base text-gray-700"
        >
          {label}
        </label>
        {errorValidation && (
          <p className="text-red-500 text-sm font-semibold mt-1">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          type={passType}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-2 border rounded-md transition-all 
            ${
              errorValidation
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } focus:outline-none focus:ring-1`}
        />

        {passType === "password" ? (
          <button type="button" className="bg-white absolute p-1.5 cursor-pointer top-[7px] right-2">
            <FaEye onClick={togglePassType} className="text-black" />
          </button>
        ) : (
          <button type="button" className="bg-white absolute p-1.5 cursor-pointer top-[7px] right-2">
            <FaEyeSlash onClick={togglePassType} className="text-black" />
          </button>
        )}
      </div>
    </div>
  );
}
