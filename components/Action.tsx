import React, { FC } from "react";
import { twMerge } from "tailwind-merge";


interface AcionProps {
  handleClick: any;
  type?: string;
  className?: string;
}

const Action = ({ handleClick, type, className }: AcionProps) => {
  return (
    <div className={twMerge("w-fit ",className)}  onClick={handleClick}>
      {type}
    </div>
  );
};

export default Action;
