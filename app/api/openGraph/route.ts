import { NextRequest, NextResponse } from "next/server";
import ogs from "open-graph-scraper";

export const POST = async (request:NextRequest) => {
  try {
    // await connect();
      const reqBody = await request.json()  
      const { url } = reqBody
        
      // Create a new instance of ExperienceTrackers model
      try {
              console.log('he in the openGraph')
              const data = await ogs({ url: url, onlyGetOpenGraphInfo: true });
              //   res.status(200).json(data.result);
              console.log('he in the openGraph send the response ')
               return new NextResponse(JSON.stringify(data.result),{status:201} )
    } catch (error) {
      console.error("Error fetching Open Graph metadata:", error);
      
    }
        
        // Save the new experience tracker to the database
        
        
        // Respond with success message and status code 201 (Created)
        return new NextResponse(  'Experience tracker created successfully' , { status: 201 });
    } catch (error: any) {
        console.error(error);
    // Handle database error or validation error
    return new NextResponse(   'Error creating experience tracker' , { status: 500 });
  }
};