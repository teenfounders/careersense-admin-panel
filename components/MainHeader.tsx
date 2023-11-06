"use client";
import { MenuContext } from "@/context/MenuContext";
import { useSelectedLayoutSegment } from "next/navigation";
import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";

type Props = {};

const MainHeader = (props: Props) => {
  const { toggle } = useContext(MenuContext);
  const segment = useSelectedLayoutSegment();
  return (
    <div className="sticky top-0 min-h-[4rem] flex items-center justify-start space-x-3.5  z-10 px-10 py-5 border-b-2 w-full border-black ">
      <div onClick={toggle}>
        <FaBars />
      </div>
      <h1 className="text-gray-700 capitalize ">{segment}</h1>
    </div>
  );
};

export default MainHeader;
