 
import { ISocialProof } from '@/utils/types';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { socialproof } from '@/models/social-proof';
import mongoose from 'mongoose';

interface Params {
  id: string;  
}
 

export const GET = async (request: NextRequest, { params }: { params: Params }) => {
  const { id } = params;
  try {
    await connect();
    // console.log(id)
    
    if (!params.id) {
      return new NextResponse("Invalid Company ID", { status: 400 });
    }
    let ids =  new mongoose.Types.ObjectId(id)
    // console.log(ids)
    const getsocialproof = await socialproof.findById(ids);
 
    if (getsocialproof) {
      // Company found, send the response with the company data
      return new NextResponse(JSON.stringify(getsocialproof), { status: 200 });
    } else {
      // Company not found, send an appropriate response (e.g., 404 Not Found)
      return new NextResponse("Company not found", { status: 404 });
    }

  } catch (err: any) {
    console.error(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};


export const PATCH = async (request:NextRequest,{ params }: { params: Params }) => {
     const { id } = params;
  try {
    await connect();
     
       if (!params.id) {
      return new NextResponse("Invalid Company ID", { status: 400 });
    }
        const reqBody = await request.json()
    
     const { ProofTitle,
AddTags,
Post,
Platform,
PostLink,
Comment,
Reality,
Images} = reqBody
      
    // Find the experience record by id and update the specified fields
    const updateSocialProof = await socialproof.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { $set: { ProofTitle,
AddTags,
Post,
Platform,
PostLink,
Comment,
Reality,
Images} }, // Specify the fields you want to update
      { new: true } // Return the updated document
    );
    // console.log(Comment)
    if (updateSocialProof) {
      return new NextResponse(JSON.stringify(updateSocialProof), { status: 200 });
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
  { params }: { params: Params }
) => {
  const { id } = params;
  try {
    await connect();
    // console.log(id)
    
    // Validate the company ID format
    if (!id) {
      return new NextResponse('Invalid Company ID', { status: 400 });
    }

    // Delete the company from the database
    const deletedCompany = await socialproof.findByIdAndDelete(id);

    if (!deletedCompany) {
      return new NextResponse('Social not found', { status: 404 });
    }

    return new NextResponse('Social Proof deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Database Error', { status: 500 });
  }
};
