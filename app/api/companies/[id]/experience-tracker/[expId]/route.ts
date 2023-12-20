 
 import { Company } from '@/models/companies';
 import { ICompany,IExperiencetrackerProps } from '@/utils/types';
 import { connect } from '@/dbConfig/dbConfig';
 import { NextRequest, NextResponse } from 'next/server'
 import { ExperienceTrackers } from '@/models/experience-tracker';
 
  interface GetSingleExperienceParams {
    expId: string;
  }
  
  // Create a new GET route for fetching a single experience tracker by ID
  export const GET = async (
    request: NextRequest,
    { params }: { params: GetSingleExperienceParams }
  ) => {
    const { expId } = params;
  // console.log(expId);
  
    try {
      await connect();
  
      // Find the experience tracker by its ID
      const singleExperience = await ExperienceTrackers.findById(expId);
      // console.log(singleExperience)
      // console.log('hit the experience tracker id')
      if (singleExperience) {
        // If the experience tracker is found, send the response with the data
        return new NextResponse(JSON.stringify(singleExperience), { status: 200 });
      } else {
        // If the experience tracker is not found, send a 404 response
        return new NextResponse("Experience tracker not found", { status: 404 });
      }
    } catch (err: any) {
      // console.error(err);
      // Handle database error
      return new NextResponse("Database Error", { status: 500 });
    }
  };

export const PATCH = async (request:NextRequest) => {
    try {
        await connect();
        const reqBody = await request.json()
    
        const {_id,
          role,
          experience} = reqBody

      // console.log(reqBody)
    // Find the experience record by id and update the specified fields
    const updatedExperience = await ExperienceTrackers.findByIdAndUpdate(
      _id,
      { $set: { role, experience } }, // Specify the fields you want to update
      { new: true } // Return the updated document
    );
    if (updatedExperience) {
      return new NextResponse(JSON.stringify(updatedExperience), { status: 200 });
    } else {
      return new NextResponse("Experience not found", { status: 404 });
    }
  } catch (error: any) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: GetSingleExperienceParams }
) => {
  const { expId } = params;
  try {
    await connect();
    
    // Validate the experience ID format
    if (!expId) {
      return new NextResponse('Invalid Experience ID', { status: 400 });
    }

    // Delete the experience from the database
    const deletedExperience = await ExperienceTrackers.findByIdAndDelete(expId);

    if (!deletedExperience) {
      return new NextResponse('Experience not found', { status: 404 });
    }

    return new NextResponse('Experience deleted successfully', { status: 200 });
  } catch (error: any) {
    return new NextResponse('Database Error', { status: 500 });
  }
};
