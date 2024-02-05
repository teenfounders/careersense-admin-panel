import React, { FC } from "react";
import { twMerge } from "tailwind-merge";


interface ActionProps {
  handleClick: any;
  type?: string;
  className?: string;
}

const Action = ({ handleClick, type, className }: ActionProps) => {
  return (
    <div className={twMerge("w-fit cursor-pointer",className)}  onClick={handleClick}>
      {type}
    </div>
  );
};

export default Action;
