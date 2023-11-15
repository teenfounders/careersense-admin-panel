 
 import { Company } from '@/models/companies';
import { ICompany } from '@/utils/types';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server'
interface Params {
  id: string;  
}

export const POST = async (request:NextRequest): Promise<NextResponse> => {
  try {
    await connect();
      const reqBody = await request.json()  
      const {Company_Name,
Careers_Page,
Website,
Careers_Page_ATS,
Tagline,
Company_LinkedIn,
Company_Logo } = reqBody
        
      // Create a new instance of ExperienceTrackers model
        const newExperienceTracker = new Company({
           Company_Name,
Careers_Page,
Website,
Careers_Page_ATS,
Tagline,
Company_LinkedIn,
Company_Logo
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

export const GET = async (request: NextRequest, { params }: { params: Params }) => {
  const { id } = params;
  try {
    await connect();
      
       if (!params.id) {
      return new NextResponse("Invalid Company ID", { status: 400 });
    }
    const company = await Company.findById(id);
 
    if (company) {
      // Company found, send the response with the company data
      return new NextResponse(JSON.stringify(company), { status: 200 });
    } else {
      // Company not found, send an appropriate response (e.g., 404 Not Found)
      return new NextResponse("Company not found", { status: 404 });
    }

  } catch (err: any) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};


export const PATCH = async (request:NextRequest) => {
    try {
        await connect();
        const reqBody = await request.json()
    
      const {
        _id,
    Company_Name,
    Website,
    Careers_Page,
        Company_LinkedIn,
        Careers_Page_ATS,
    Tagline,
    Company_Logo,  

        } = reqBody

    // Find the experience record by id and update the specified fields
    const updateCompany = await Company.findByIdAndUpdate(
      _id,
      { $set: { Company_Name,
    Website,
    Careers_Page,
        Company_LinkedIn,
        Careers_Page_ATS,
    Tagline,
    Company_Logo} }, // Specify the fields you want to update
      { new: true } // Return the updated document
    );
    if (updateCompany) {
      return new NextResponse(JSON.stringify(updateCompany), { status: 200 });
    } else {
      return new NextResponse("Experience not found", { status: 404 });
    }
  } catch (error: any) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};