import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface CustomInput {
  title: string;
  placeholder: string;
  name: string;
  type?: string;
  setState: (value: any) => void;
}

const CustomInput = ({
  title,
  placeholder,
  name,
  setState,
  type,
}: CustomInput) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="font-semibold" htmlFor={title}>
        {title}
      </label>
      <div className="relative">
        <input
          className="border border-gray-200 rounded-md px-3 py-1.5 w-full"
          type={!isVisible && type ? type : "text"}
          placeholder={placeholder}
          onChange={(event) => {
            if (name) {
              setState((prev: any) => {
                return { ...prev, [name]: event?.target?.value };
              });
            } else {
              setState(event?.target?.value);
            }
          }}
        />
        {type === "password" && (
          <div
            className="absolute top-1/2 right-1.5 -translate-x-1/2  -translate-y-1/2 text-base cursor-pointer"
            onClick={() => {
              setIsVisible((prev) => !prev);
            }}
          >
            {isVisible ? <FaEye /> : <FaEyeSlash />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
