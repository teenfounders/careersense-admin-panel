
 import { Company } from '@/models/companies';
import { ICompany } from '@/utils/types';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
    try {
         
        const companies: ICompany[] = await Company.find({});
        // const companyNames: string[] = companies.map(company => company.Company_Name);
        // console.log(companies)
        return NextResponse.json({ status: 200,  companies });
    } catch (error: any) {
        return NextResponse.json({ status: 500, json: { error: error.message } });
    }
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