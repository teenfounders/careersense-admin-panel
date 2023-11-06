 
 import { Company } from '@/models/companies';
import { ICompany } from '@/utils/types';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server'
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