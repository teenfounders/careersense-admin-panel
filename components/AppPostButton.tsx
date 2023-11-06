import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
interface AppPostButtonProps {
  icon: string;
  label: string;
  classname?: string;
  onClick?: () => void;
}

const AppPostButton: React.FC<AppPostButtonProps> = ({
  classname,
  icon,
  onClick,
  label,
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "flex items-center py-1  border-[1px] border-gray-400 w-fit  px-3 rounded-full",
        classname
      )}
    >
      <Image src={icon} alt="icons" width={15} height={15} className="mr-2" />
      <span className=" font-normal text-xs">{label}</span>
    </button>
  );
};

export default AppPostButton;
