"use client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import requiredImg from "@/assets/svgexport-5.svg";
import Search from "@/assets/graysearch.svg";
interface AppSearchInputProps {
  label?: string;
  error?: string | boolean;
  value?: string;
  classname?: string;
  items?: string[];
  loading?: boolean;
  placeholder?: string;
  onSelect: (selectedItem: string) => void;
}

const AppSearchInput: React.FC<AppSearchInputProps> = ({
  label,
  items,
  value,
  error,

  placeholder,
  classname,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    const filtered = items?.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered!);
    if (value.length == 0) {
      setFilteredItems([]);
    }
  };

  const handleItemSelect = (item: string) => {
    setSearchTerm(item);
    setFilteredItems([]);
    onSelect(item);
  };

  return (
    <div className="">
      {label && (
        <label
          className="font-semibold text-sm  text-gray-700 mb-2 block"
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <div className="relative flex">
        <input
          type="text"
          className={twMerge(
            "placeholder:pl-5 placeholder:items-center  p-2 w-full border  rounded  border-gray-300  border:transition focus:border-black",
            classname
          )}
          // className="mt-1 p-2 w-full border rounded  border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-500"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        <div
          className="absolute left-4"
          style={{
            top: `calc(50% - 10px)`, // 10px is half of the image height (20px / 2)
          }}
        >
          <Image src={Search} width={18} height={18} alt="image" />
        </div>
      </div>
      <div>
        {filteredItems.length > 0 && (
          <ul className="mt-2 z-20 border rounded border-gray-100 bg-white shadow-lg absolute w-full">
            {filteredItems.map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:bg-gray-100 p-2"
                onClick={() => handleItemSelect(item)}
              >
                {item}
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
            alt="requried"
          />
          <span>{label} is required</span>
        </p>
      )}
    </div>
  );
};

export default AppSearchInput;
