"use client";
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
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
  onBlur?: (e: ChangeEvent) => void;
  classname?: string;
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;
const sizeMap: { [key in InputSize]: string } = {
  medium: "p-3 text-base",
  large: "p-4 text-base",
  small: "p-2 text-xs",
};
const AppInput = forwardRef<HTMLInputElement, InputProps>(
  // export const AppInput: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = "text",
      size = "medium",
      onBlur,
      value,
      errors,
      classname = "",
      placeholder,
      ...props
    },
    ref
  ) => {
    //   type,
    //   label,
    //   classname,
    //   value,
    //   name,
    //   placeholder,
    //   errorMessage,
    //   disabled,
    //   onChange,
    // }: InputProps) => {
    // const [focused, setFocused] = useState(false);

    // const handleFocus = () => {
    //   setFocused(true);
    // };
    // const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    //   const newPassword = e.target.value;
    //   if (onChange) onChange(e);
    // };

    return (
      <div className="relative ">
        {/* <label
        className="font-semibold text-sm text-gray-700 mb-1 block"
        htmlFor={name}
      >
        {label}
      </label> */}
        <input
          type={type}
          className={twMerge(
            `text-base font-normal py-2 px-4 w-60 border border-gray-300 rounded ${
              errors
                ? "border-red-500 border- ease-in-out transition-all"
                : "border-gray-300 focus:border-black focus:border-2"
            } focus:outline-none focus:border-black  focus:border-2 transition ease-in`,
            classname,
            sizeMap[size]
          )}
          id={id}
          // value={value}
          name={name}
          placeholder={placeholder}
          ref={ref}
          aria-label={label}
          // onChange={(e) => {
          //   handlePasswordChange(e);
          //   if (onChange) {
          //     onChange(e);
          //   }
          // }}
          {...props}
          // required
          // disabled={disabled}
          // data-focused={focused}
          onBlur={onBlur}
        />

        {/* <span
        className={` mt-2 ${
          type === "password" ? "relative" : "absolute"
        } hidden `}
      >
        {type !== "password" && errorMessage && (
          <span className="text-sm flex  gap-2 flex-start item-center justify-start text-red-700 mt-1">
            <span>
              <Image
                src={requiredImg}
                width={10}
                height={1}
                className="w-5 bg-red-700 rounded-full"
                alt="required"
              />
            </span>
            <span>{errorMessage}</span>
          </span>
        )}
      </span> */}
      </div>
    );
  }
);
AppInput.displayName = "AppInput";

export default AppInput;
