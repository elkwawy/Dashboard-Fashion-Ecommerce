export default function InputField({
  name,
  type = "text",
  value,
  label,
  placeholder,
  onChange,
  errorValidation,
  errorMessage,
}) {
  return (
    <div className="space-y-2 relative">
      <div className="flex justify-between items-center">
        <label
          htmlFor={name}
          className="block font-semibold text-base text-gray-700"
        >
          {label}
        </label>
        {errorValidation && (
          <p className="text-red-500 text-sm font-semibold mt-1">
            {errorMessage}
          </p>
        )}
      </div>

      <input
        type={type}
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
        } focus:outline-none focus:ring-1 text-gray-700`}
      />
    </div>
  );
}
