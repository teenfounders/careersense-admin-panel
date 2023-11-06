 
 import { Company } from '@/models/companies';
import { ICompany,IExperiencetrackerProps } from '@/utils/types';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server'
import { ExperienceTrackers } from '@/models/experience-tracker';
interface Params {
  id: string;  
}


export const GET = async (request: NextRequest, { params }: { params: Params }) => {
  const { id } = params;
  try {
    await connect();
      
       if (!params.id) {
      return new NextResponse("Invalid Company ID", { status: 400 });
    }
    const experiencetrackers = await ExperienceTrackers.find({companyId:id});
    if (experiencetrackers) {
      // Company found, send the response with the company data
      return new NextResponse(JSON.stringify(experiencetrackers), { status: 200 });
    } else {
      // Company not found, send an appropriate response (e.g., 404 Not Found)
      return new NextResponse("Company not found", { status: 404 });
    }

  } catch (err: any) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request:NextRequest): Promise<NextResponse> => {
  try {
    await connect();
      const reqBody = await request.json()  
      const {companyId,
        role,
        experience,
        url} = reqBody
        
        // Create a new instance of ExperienceTrackers model
        const newExperienceTracker = new ExperienceTrackers({
            companyId,
            role,
            experience,
            url,
        });
        
        // Save the new experience tracker to the database
        await newExperienceTracker.save();
        
        // Respond with success message and status code 201 (Created)
        return new NextResponse(  'Experience tracker created successfully' , { status: 201 });
    } catch (error: any) {
        console.error(error);
    // Handle database error or validation error
    return new NextResponse(   'Error creating experience tracker' , { status: 500 });
  }
};

export const PATCH = async (request:NextRequest) => {
    try {
        await connect();
        const reqBody = await request.json()
    
        const {_id,
          role,
          experience} = reqBody

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