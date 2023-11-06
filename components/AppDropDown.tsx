"use client";
import React, { useState } from "react";
import Image from "next/image";
import requiredImg from "@/assets/svgexport-5.svg";
import downArrow from "@/assets/downarrow.svg"; // Custom down arrow icon
import { twMerge } from "tailwind-merge";

export interface DropdownOption {
  label?: string;
  value?: string | number;
}

export interface DropdownInputProps {
  label: string;
  classname?: string;
  options: DropdownOption[];
  value: string | number;
  name: string;
  placeholder?: string;
  error: boolean;
  disabled?: boolean;
  onChange: (selectedValue: string | number) => void;
}

const CustomDropdown: React.FC<DropdownInputProps> = ({
  label,
  classname = "",
  options,
  value,
  name,
  placeholder = `Select ${label}`,
  error,
  disabled = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (selectedValue: string | number | any) => {
    setIsOpen(false);
    onChange(selectedValue);
  };

  return (
    <div className={`min-w-full dropdown-container relative ${classname}`}>
      <label
        className="font-semibold text-sm text-gray-700 mb-2 block"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="relative w-full">
        <div
          className={twMerge(
            `text-base font-normal py-1 px-4 w-full border border-gray-300 rounded focus:outline-none focus:border-black focus:border-2 cursor-pointer flex justify-between items-center ${
              error ? "border-red-500" : ""
            }`,
            classname
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`${
              value ? "text-gray-900" : "text-gray-400"
            } placeholder-custom-color  `}
          >
            {value ? value : placeholder}
          </span>
          <Image
            src={downArrow}
            alt="down arrow"
            width={10}
            height={10}
            className="ml-2 text-gray-200"
          />
        </div>
        {isOpen && (
          <ul className="absolute top-full left-0 w-full border border-gray-300 bg-white rounded-b overflow-y-auto z-10">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-3 cursor-pointer text-gray-400 hover:bg-blue-600 hover:text-white"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p className="text-sm flex gap-2 flex-start item-center justify-start text-red-500 mt-1">
          <Image
            src={requiredImg}
            width={10}
            height={1}
            className="w-5 bg-red-800 rounded-full"
            alt="required"
          />
          <span>{label} is required</span>
        </p>
      )}
    </div>
  );
};

export default CustomDropdown;
