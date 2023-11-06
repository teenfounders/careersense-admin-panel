import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import formidable from 'formidable';
import ImageKit from 'imagekit';
import { NextRequest, NextResponse } from 'next/server';
export interface ImageKitAuthType {
  token: string;
  expire: number;
  signature: string;
  publicKey: string ;
  urlEndpoint: string;
  uploadUrl: string ;
}
const imageKitAuth = (
  req: NextRequest,
  res: NextResponse<ImageKitAuthType>,
) => {
  const keys     = {
    publicKey  : process.env.PUBLIC_KEY || 'Missing IMAGEKIT_API_PUBLIC_KEY',
    privateKey : process.env.PRIVATE_KEY || 'Missing IMAGEKIT_API_PRIVATE_KEY',
    urlEndpoint: process.env.URL_ENDPOINT || 'Missing IMAGEKIT_API_END_POINT',
    uploadUrl  : process.env.IMAGEKIT_API_UPLOAD_URL || 'Missing IMAGEKIT_API_UPLOAD_URL',
  };
  const imagekit = new ImageKit(keys);
  const auth     = imagekit.getAuthenticationParameters();
  const rs = { ...keys, ...auth, ...{ privateKey: undefined } };
  return new NextResponse(JSON.stringify(rs), { status: 200 });
};

 
export const POST = async (request: NextRequest, response: NextResponse<ImageKitAuthType>) => {
 
  //   const result = imagekit.getAuthenticationParameters();
  //   console.log(result)
  //   const responseBody = JSON.stringify(result);
  //   console.log(responseBody)
  // return new NextResponse(responseBody);
   return imageKitAuth(request, response);
};

 

