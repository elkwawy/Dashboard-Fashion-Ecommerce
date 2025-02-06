export default function InputField({
  id,
  name,
  type,
  value,
  label,
  placeholder,
  onChange,
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
      <input
        type={type}
        id={id}
        required
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}
