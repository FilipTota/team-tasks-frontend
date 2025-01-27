import React from "react";

interface InputProp {
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input: React.FC<InputProp> = ({ type, placeholder, onChange, value }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="mt-1 block px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
      />
    </>
  );
};

export default Input;
