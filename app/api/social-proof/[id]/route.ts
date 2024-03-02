import { ISocialProof } from '@/utils/types';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { socialproof } from '@/models/social-proof';
import mongoose from 'mongoose';
import { careersensesocialproof } from '@/models/careersense-social-proof';

interface Params {
  id: string;  
}
export const GET = async (request: NextRequest, { params }: { params: Params }) => {
  const { id } = params;
  try {
    await connect();
    
    // Check if the id parameter is missing or not a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return new NextResponse("Invalid ID parameter", { status: 400 });
    }

    const getsocialproof = await careersensesocialproof.findById(id);

    if (getsocialproof) {
      return new NextResponse(JSON.stringify(getsocialproof), { status: 200 });
    } else {
      return new NextResponse("Social proof not found", { status: 404 });
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
//  console.log(reqBody)
  const {ProofTitle,
    PostBrief,
_id,
    PostDescription,
    Tags,
    Platform,
    PostLink,
    Comment,
    Lesson,
    Images } = reqBody
   
 // Find the experience record by id and update the specified fields
 const updateSocialProof = await careersensesocialproof.findByIdAndUpdate(
   new mongoose.Types.ObjectId(id),
   { $set: { ProofTitle,
    PostBrief,
    PostDescription,
    Tags,
    Platform,
    PostLink,
    Comment,
    Lesson,
    Images } }, // Specify the fields you want to update
   { new: true } // Return the updated document
 );
//  console.log(Comment)
 if (updateSocialProof) {
   return new NextResponse(JSON.stringify(updateSocialProof), { status: 200 });
 } else {
   return new NextResponse("CareerSense not found", { status: 404 });
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
    const deletedCompany = await careersensesocialproof.findByIdAndDelete(id);

    if (!deletedCompany) {
      return new NextResponse('Social not found', { status: 404 });
    }

    return new NextResponse('Social Proof deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Database Error', { status: 500 });
  }
};