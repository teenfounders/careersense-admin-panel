
'use client'
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

interface Props {}

interface ogimage {
  url: string;
  width: string;
  height: string;
}
interface OgData {
  [key: string]: any; // Adjust this type based on the actual structure of your data
}

const Me: React.FC<Props> = () => {
  const [ogData, setOgData] = useState<OgData | undefined>(undefined)

  const [inputUrl, setInputUrl] = useState(""); // State to hold the input URL

  const fetchData = async (url1: string) => {
    try {
      const response = await axios.post("/api/openGraph", { url1 });
      setOgData(response.data.data1.result);
      console.log(response.data.data1.result)
    } catch (error) {
      console.error("Error fetching data from the API", error);
    }
  };

  const handleFetchData = () => {
    console.log(inputUrl)
    fetchData(inputUrl);
  };

  

  return (
    <div className="bg-white px-6 sm:py-32 max-w-7xl w-full lg:px-8 min-h-screen">
      <div className="mx-auto  w-full text-center">
      

        {/* Input field for the URL */}
        <div className="mt-4 flex items-center justify-center">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter URL"
            className="px-4 py-2 max-w-[600px] w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleFetchData}
            className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
          >
            Fetch Data
          </button>
        </div>
        {/* {ogData && (
          <div>
            <h3 className="mt-6 text-xl font-semibold">OG Data Details:</h3>
            <ul className="mt-4 text-left">
              {Object.values(ogData).map((value, index) => (
                <li className="flex flex-col gap-1 list-disc" key={index}>
                  {typeof value === 'object' ? JSON.stringify(value) : value}
                </li>
              ))}
            </ul>
          </div>
        )} */}
          <main className="block relative  ">
        <div className="my-5 mx-auto w-full  max-w-5xl">
          <div className="mb-4 w-full"></div>
          <div className="p-4 mb-4 bg-white shadow-md border-[1px] border-[#dadada]  rounded-md overflow-hidden">
            

            {ogData && (
          <div>
            <h3 className="mt-6 text-xl font-semibold">OG Data Details:</h3>
            <ul className="mt-4 ">
              {/* {Object.entries(ogData).map(([key, value], index) => (
                <>
                <br/>
                <li className="flex flex-col break-words gap-1" key={index}>
                  <strong className="text-gray-800 font-semibold">{key}:</strong> <p className="max-w-2xl text-start  w-full ">{typeof value === 'object' ? JSON.stringify(value) : value}</p>
                </li>
                </>
              ))} */}
              {Object.entries(ogData).map(([key, value], index) => (
  key !== "Response" && (
    <React.Fragment key={index}>
      <br />
      <li className="flex  gap-1">
        <strong className="text-gray-800 font-semibold">{key}:</strong>{" "}
        <p className="max-w-2xl text-start w-full ">
          {typeof value === "object" ? JSON.stringify(value) : value}
        </p>
      </li>
    </React.Fragment>
  )))}
            </ul>
          </div>
        )}
            
          </div>
        </div>
      </main>
        
      </div>
    </div>
  );
};

export default Me;
