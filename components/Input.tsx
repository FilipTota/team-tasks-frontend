import React from "react";

interface InputProp {
  type: string;
  placeholder?: string;
}

const Input: React.FC<InputProp> = ({ type, placeholder }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 block px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
      />
    </>
  );
};

export default Input;
