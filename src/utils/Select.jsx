import React, { useState } from "react";

const Select = ({ options, handleSelect }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  return (
    <div className="relative h-fit text-left w-full sm:w-auto">
      <button
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        className="p-2 border-[1px] h-full focus:border-main-color rounded-md flex items-center justify-center gap-1.5"
      >
        <span>{options.find((option) => option.label)}</span>

        <FaChevronDown
          className={` trans font-normal text-sm mt-0.5 ${
            isSelectOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {
        <div
          className={`absolute z-50 top-full left-0   mt-1 w-20 bg-white border border-gray-300 rounded-md shadow-lg  ${
            isSelectOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            transitionProperty: "max-height, opacity",
            overflow: "visible",
            zIndex: 10000,
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="w-full text-center py-2 hover:bg-gray-100   cursor-pointer rounded-md"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Select;
