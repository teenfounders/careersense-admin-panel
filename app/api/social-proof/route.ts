
 import { Company } from '@/models/companies';
import { ISocialProof } from '@/utils/types';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { socialproof } from '@/models/social-proof';

connect();

export async function GET(request: NextRequest) {
    try {
         
        const socialproofs: ISocialProof[] = await socialproof.find({});
        // const companyNames: string[] = companies.map(company => company.Company_Name);
        // console.log(companies)
        return NextResponse.json({ status: 200,  socialproofs });
    } catch (error: any) {
        return NextResponse.json({ status: 500, json: { error: error.message } });
    }
}

export const POST = async (request:NextRequest): Promise<NextResponse> => {
  try {
    await connect();
      const reqBody = await request.json()  
      const { ProofTitle,
AddTags,
Post,
Platform,
PostLink,
Comment,
Reality,
Images} = reqBody
        
    console.log(reqBody)
      // Create a new instance of ExperienceTrackers model
        const newSocialProof = new socialproof({
           ProofTitle,
AddTags,
Post,
Platform,
PostLink,
Comment,
Reality,
Images,
        });
        
//         // Save the new experience tracker to the database
        await newSocialProof.save();
        
        // Respond with success message and status code 201 (Created)
        return new NextResponse(  'new Post created successfully' , { status: 201 });
    } catch (error: any) {
        console.error(error);
    // Handle database error or validation error
    return new NextResponse(   'Error creating experience tracker' , { status: 500 });
  }
};