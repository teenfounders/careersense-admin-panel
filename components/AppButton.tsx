import React from "react";
import { twMerge } from "tailwind-merge";
import forwardarrow from "@/assets/forwardarrow.svg"; // Import your forward arrow image
import loader from "@/assets/loder.svg";
import Image from "next/image";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  text: string;
  forward?: boolean;
  classname?: string;
  forwardArrowSrc?: string;
  loading?: boolean;
  forwardimage?: boolean;
  disabled?: boolean;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const APPButton = ({
  text,
  loading,
  type,
  classname,
  forward,
  forwardArrowSrc,
  forwardimage,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        `flex gap-2 h-[40px] w-30 text-sm justify-center items-center w-full rounded-sm py-1 relative bg-[#c9f270] `,
        disabled
          ? "text-gray-300 bg-gray-100 cursor-not-allowed"
          : "text-black hover:-translate-y-[2px] hover:ease-linear hover:shadow-md hover:bg-[#daf99] bg-[#c9f270] cursor-pointer",
        classname
      )}
    >
      {loading && <Image src={loader} alt="loader" className="animate-spin " />}
      {text}
      {!disabled && !forwardimage && (
        <span
          className="absolute right-1 top-[50%] transform -translate-y-1/2"
          style={{
            display: loading ? "none" : "block",
          }}
        >
          <Image
            src={forwardArrowSrc || forwardarrow}
            width={10}
            height={10}
            alt="arrow w-20 h-20"
          />
        </span>
      )}
    </button>
  );
};

export default APPButton;
