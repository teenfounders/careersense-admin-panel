"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};
interface ogimage {
  url: string;
  width: string;
  height: string;
}
const Me = (props: Props) => {
  const [ogData, setOgData] = useState<{
    ogUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: ogimage[];
  } | null>(null);
  const [all, setAll] = useState("");
  const [all1, setAll1] = useState("");

  const url2 =
    "https://www.coursera.org/professional-certificates/tensorflow-in-practice";
  const url1 = "https://www.cred.club";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/openGraph", { url1, url2 });

        console.log("response form addmoda", response.data);
      } catch (error) {
        console.error("Error fetching data from the API", error);
      }
    };

    fetchData();
  }, [url1, url2]); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className="bg-white px-6 sm:py-32 lg:px-8 h-screen lg:pl-72">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-2 text-4xl font-bold tracking-tighter text-gray-900 md:text-6xl ">
          me
        </h2>

        {ogData && (
          <div>
            <p>URL: {ogData.ogUrl}</p>
            <p>Title: {ogData.ogTitle}</p>
            <p>Description: {ogData.ogDescription}</p>

            {ogData.ogImage.map((image: ogimage, index: number) => (
              <div key={index}>
                <Image
                  src={image.url}
                  width={100}
                  height={100}
                  alt={`OG Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Me;
