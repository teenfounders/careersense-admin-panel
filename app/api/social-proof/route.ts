import { connect } from "@/dbConfig/dbConfig";
import { careersensesocialproof } from "@/models/careersense-social-proof";
import { createSocialProof } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
 
 
connect();
export async function GET(request: NextRequest) {
    try {
         
        const socialproofs: createSocialProof[] = await careersensesocialproof.find({});
        // const companyNames: string[] = companies.map(company => company.Company_Name);
       
        return NextResponse.json({ status: 200,  socialproofs });
    } catch (error: any) {
        return NextResponse.json({ status: 500, json: { error: error.message } });
    }
}

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { ProofTitle,
        PostBrief,
        PostDescription,
        Tags,
        Platform,
        PostLink,
        Comment,
        Lesson,
        Images } = reqBody; // Assuming the request body contains url1 and url2
// console.log(reqBody)
const newCareerSocialProof = new careersensesocialproof({
    ProofTitle,
    PostBrief,
    PostDescription,
    Tags,
    Platform,
    PostLink,
    Comment,
    Lesson,
    Images
 });
 await newCareerSocialProof.save();
     // Respond with success message and status code 201 (Created)
     return new NextResponse(  'new Post created successfully' , { status: 201 });
    } catch (error: any) {
        console.error(error);
    // Handle database error or validation error
    return new NextResponse(   'Error creating experience tracker' , { status: 500 });
  }
};
