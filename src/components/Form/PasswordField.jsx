import { FaEye, FaEyeSlash } from "react-icons/fa6";
export default function PasswordField({
  id,
  name,
  value,
  label,
  placeholder,
  onChange,
  type,
  toggleType,
  errorValidation,
  errorMessage,
}) {
  return (
    <div className="space-y-1 relative">
      <label htmlFor={id} className="font-semibold text-xl">
        {label}
      </label>
      {errorValidation && (
        <p className="text-red-500 text-sm rounded-md font-bold absolute right-0 top-0">
          {errorMessage}
        </p>
      )}
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        {type === "password" ? (
          <div className="bg-white absolute p-1.5 cursor-pointer  top-[7px] right-2 ">
            <FaEye onClick={toggleType} className="text-black" />
          </div>
        ) : (
          <div className="bg-white absolute p-1.5 cursor-pointer  top-[7px] right-2 ">
            <FaEyeSlash onClick={toggleType} className="text-black" />
          </div>
        )}
      </div>
    </div>
  );
}
