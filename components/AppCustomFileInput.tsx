"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { FaFileUpload, FaTrash, FaTimes, FaExchangeAlt } from "react-icons/fa"; // Import icons from react-icons library
import Image from "next/image";
import pdficon from "@/assets/pdf_icon.svg";
interface CustomFileInputProps {
  label: string;
  classname: string;
  onFileSelect: (file: File | null) => void;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  label,
  classname,
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteClick = () => {
    setSelectedFileName("");
    setSelectedFile(null);
    onFileSelect(null); // Pass null to indicate that no file is selected
  };

  const handleReplaceClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const getLastUpdatedTime = (file: File) => {
    return file.lastModified; // This returns the last modified timestamp of the file
  };

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col ">
        <label className="font-semibold text-sm text-gray-700 mb-2 block">
          {label}
        </label>
        <div
          className="w-full h-40 border-[1px] border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer"
          onClick={handleBrowseClick}
        >
          {selectedFileName ? (
            <div className="flex gap-3">
              <div>
                <Image src={pdficon} width={50} height={50} alt="image" />
              </div>
              <div>
                <div className="text-gray-700 font-semibold text-sm">
                  {selectedFileName}
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  Last Updated:{" "}
                  {new Date(getLastUpdatedTime(selectedFile!)).toLocaleString()}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="text-blue-500 text-sm hover:text-green-700 focus:outline-none"
                    onClick={handleReplaceClick}
                  >
                    Replace
                  </button>
                  <button
                    className="text-red-500 text-sm hover:text-red-700 focus:outline-none"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">
              Drag and drop your resume or{" "}
              <span className="text-blue-700 text-sm font-semibold hover:underline">
                Browse
              </span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleInputChange}
          accept=".pdf,.doc,.docx"
        />
      </div>
    </div>
  );
};

export default CustomFileInput;
