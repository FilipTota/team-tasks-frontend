import React from "react";

interface ButtonProps {
  text: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({ text, width }) => {
  return (
    <>
      <button
        style={width ? { width: width } : { width: "5em" }}
        className={`px-1 py-3 border-none rounded-md bg-green-600 text-white cursor-pointer`}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
