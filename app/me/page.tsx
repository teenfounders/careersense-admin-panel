// "use client";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// type Props = {};

// const Me = (props: Props) => {
//   const [data, setData] = useState(null);
//   const url =
//     "https://www.youtube.com/playlist?list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH";
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("/api/openGraph", { url });
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data from the API", error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures the effect runs once after the initial render

//   return (
//     <div className="bg-white px-6 sm:py-32 lg:px-8 h-screen lg:pl-72">
//       <div className="mx-auto max-w-2xl text-center">
//         <h2 className="mt-2 text-4xl font-bold tracking-tighter text-gray-900 md:text-6xl ">
//           me
//         </h2>
//         {data && <p>{JSON.stringify(data)}</p>}
//       </div>
//     </div>
//   );
// };

// export default Me;

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

  const url =
    "https://www.youtube.com/playlist?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/openGraph", { url });
        const { ogUrl, ogTitle, ogDescription, ogImage } = response.data;
        setOgData({ ogUrl, ogTitle, ogDescription, ogImage });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data from the API", error);
      }
    };

    fetchData();
  }, [url]); // Empty dependency array ensures the effect runs once after the initial render

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
                  width={parseInt(image.width)}
                  height={parseInt(image.height)}
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
