"use client";
import { useState, ChangeEvent, HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface PasswordInputProps {
  onChange: (value: string) => void;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  label: string;
  value?: string | number;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  errors?: string | boolean;
  disabled?: boolean;
  classname?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<InputProps> = ({
  type,
  label,
  classname,
  value,
  name,
  placeholder,
  errorMessage,
  disabled,
  onChange,
}: InputProps) => {
  const [focused, setFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
  const handleFocus = () => {
    if (!focused) {
      setFocused(true);
    }
    if (!showPasswordCriteria) {
      setShowPasswordCriteria(true);
    }
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    onChange(e);
  };

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*]/.test(password);
  const isLengthValid = password.length >= 8;

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-600 mb-1">
        Password
      </label>
      <input
        type={type}
        className={twMerge(
          "text-base font-normal py-2 px-4 w-60 border border-gray-300 rounded focus:outline-none focus:border-black focus:border-2 transition ease-in",
          classname
        )}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          handlePasswordChange(e);
          onChange(e);
        }}
        required
        disabled={disabled}
        data-focused={focused}
        onBlur={handleFocus}
      />
      <div className={` mt-2 ${showPasswordCriteria ? "block" : "hidden"} `}>
        <span className="flex flex-col relative mb-14 ">
          {type === "password" && (
            <div className="flex flex-col gap-2" style={{ height: "5em" }}>
              <span className="flex items-center">
                {hasUppercase ? (
                  <span className="text-green-500 mr-2">✓</span>
                ) : (
                  <span className="text-red-800 mr-2">✗</span>
                )}
                <p className="text-black">One uppercase character (A-Z)</p>
              </span>
              <span className="flex items-center">
                {hasLowercase ? (
                  <span className="text-green-500 mr-2">✓</span>
                ) : (
                  <span className="text-red-800 mr-2">✗</span>
                )}
                <p className="text-black">One lowercase character (a-z)</p>
              </span>
              <span className="flex items-center">
                {hasNumber ? (
                  <span className="text-green-500 mr-2">✓</span>
                ) : (
                  <span className="text-red-800 mr-2">✗</span>
                )}
                <p className="text-black">One number (0-9)</p>
              </span>
              <span className="flex items-center">
                {hasSymbol ? (
                  <span className="text-green-500 mr-2">✓</span>
                ) : (
                  <span className="text-red-800 mr-2">✗</span>
                )}
                <p className="text-black">One symbol (e.g. $, !, #, &)</p>
              </span>
              <span className="flex items-center">
                {isLengthValid ? (
                  <span className="text-green-500 mr-2">✓</span>
                ) : (
                  <span className="text-red-800 mr-2">✗</span>
                )}
                <p className="text-black">More than 8 characters</p>
              </span>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
