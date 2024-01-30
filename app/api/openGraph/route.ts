import { NextRequest, NextResponse } from "next/server";
import ogs from "open-graph-scraper";

// export const POST = async (request:NextRequest) => {
//   try {
//     // await connect();
//       const reqBody = await request.json()  
//       const { url } = reqBody
        
//       // Create a new instance of ExperienceTrackers model
//       try {
//               console.log('he in the openGraph')
//               const data = await ogs({ url: url, onlyGetOpenGraphInfo: true });
//               //   res.status(200).json(data.result);
//               console.log('he in the openGraph send the response ')
//                return new NextResponse(JSON.stringify(data.result),{status:201} )
//     } catch (error) {
//       console.error("Error fetching Open Graph metadata:", error);
      
//     }
        
//         // Save the new experience tracker to the database
        
        
//         // Respond with success message and status code 201 (Created)
//         return new NextResponse(  'Experience tracker created successfully' , { status: 201 });
//     } catch (error: any) {
//         console.error(error);
//     // Handle database error or validation error
//     return new NextResponse(   'Error creating experience tracker' , { status: 500 });
//   }  
// };
 

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { url1 } = reqBody; // Assuming the request body contains url1 and url2

    // Fetch data from multiple URLs in parallel using Promise.all
    // const [data1, data2] = await Promise.all([
    //   ogs({ url: url1, onlyGetOpenGraphInfo: true }),
    //   ogs({ url: url2, onlyGetOpenGraphInfo: true }),
    // ]);
    console.log(url1)
const data1 = await ogs({url:url1, onlyGetOpenGraphInfo: true})
    // Handle the fetched data as needed
    // console.log("Data from URL 1:", data1.result);
    // console.log("Data from URL 2:", data2.result);

    // Respond with success message, status code 201 (Created), and fetched data
    return new NextResponse(
      JSON.stringify({ message: "Data fetched successfully", data1 }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error fetching data:", error);
    // Handle errors and respond with an appropriate status code
    return new NextResponse(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
    });
  }
};
