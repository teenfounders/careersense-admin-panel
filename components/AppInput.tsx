"use client";
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  RefObject,
  forwardRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import requiredImg from "@/assets/svgexport-5.svg";
import { FieldErrors } from "react-hook-form";
export type InputSize = "medium" | "large" | "small";
export type InputType = "text" | "email";

export type InputProps = {
  type?: HTMLInputTypeAttribute;
  label?: string;
  value?: string | number;
  name: string;
  id?: string;
  // placeholder?: string;
  
  errorMessage?: string;
  size?: InputSize;
  errors?: string | boolean | FieldErrors<FormData>;
  disabled?: boolean;
  currentref ?:RefObject<HTMLImageElement>;  
  onBlur?: (e: ChangeEvent) => void;
  classname?: string;
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;
 
const AppInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = "text",
      size = "medium",
      onBlur,
      value, // Add this line
      errors,
      classname = "",
      placeholder,
      onChange, // Add this line
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={twMerge(
            `text-base font-normal py-2 px-2   w-60 border border-gray-300 rounded ${
              errors
                ? "border-red-500 border- ease-in-out transition-all"
                : "border-gray-300 focus:border-black focus:border-2"
            } focus:outline-none focus:border-black  focus:border-2 transition ease-in`,
            classname,
            // sizeMap[size]
          )}
          id={id}
          name={name}
          placeholder={placeholder}
          ref={ref}

          aria-label={label}
          value={value} // Add this line
          {...props}
          onBlur={onBlur}
        />
      </div>
    );
  }
);

AppInput.displayName = "AppInput";
export default AppInput;
