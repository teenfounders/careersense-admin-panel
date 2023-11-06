import axios from 'axios'



export interface ImagekitResType{
    fileId: string;
    filePath: string;
    fileType: string;
    width: number;
    height: number;
    name: string;
    size: number;
    thumbnailUrl: string;
    url: string;
  versionInfo: {
    id: string;
    name: string;
  };
  file: File;
  folder: string;
    filename: string;
      urlEndpoint: string; 
}
export interface ImageKitAuthType {
    token: string;
    expire: number;
    signature: string;
    publicKey: string;
    urlEndpoint: string;
    uploadUrl: string;
}
export interface UploadFileToImageKitProps {
  file: File;
  folder?: string;
  fileName?: string;
  auth?:ImageKitAuthType;
    authApiEndpoint?: string;
     uploadUrl: string;
}

export const uploadFileToImageKit = async({
    file, folder = 'Company_Logo', fileName, auth, authApiEndpoint= '/api/auth',
}: UploadFileToImageKitProps): Promise<ImagekitResType> => {
    let imageKitAuth = auth;
    if (!auth) {
        const authRes = await axios.post(authApiEndpoint);
        imageKitAuth = authRes.data as ImageKitAuthType;

        
    }
    if (!imageKitAuth?.token) {
        throw new Error('get imageKitAuth failed')
    }
    const formData = new FormData();
    formData.append('file', file);
     formData.append('fileName', fileName || file.name);
  formData.append('folder', folder);
  formData.append('publicKey', imageKitAuth.publicKey);
  formData.append('signature', imageKitAuth.signature);
  formData.append('expire', imageKitAuth.expire.toString());
    formData.append('token', imageKitAuth.token);
    
    const uploadRes = await axios.post(imageKitAuth.uploadUrl, formData);
    if (uploadRes.status !== 200) {
        throw new Error('upload failed')
    }
    return {
        ...uploadRes.data , file, folder, fileName,
    } as ImagekitResType

}
// export const uploadFileToImageKit = async ({
//   file,
//   folder = 'Company_Logo',
//   auth,
//     uploadUrl,
//   authApiEndpoint='/api/auth'
// }: UploadFileToImageKitProps): Promise<ImagekitResType> => {
//     console.log('here in uitils ', file, auth, uploadUrl)
//   const formData = new FormData();
//   console.log('after the ',folder)
//    if (!auth) {
//       const authRes = await axios.post(authApiEndpoint);
//       imageKitAuth = authRes.data as ImageKitAuthType;
//     }

//   // Add authentication parameters to the form data
//   if (auth) {
//       formData.append('publicKey', auth.publicKey);
//       formData.append('signature', auth.signature);
//       formData.append('expire', auth.expire.toString());
//       formData.append('token', auth.token);
//       formData.append('file', file);
//         formData.append('folder', folder);
//   }
// console.log(auth)
//   try {
//     const uploadRes = await axios.post(authApiEndpoint, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//       console.log(uploadRes)

//     if (uploadRes.status === 200) {
//       // Handle the successful upload response here
//         const responseData: ImagekitResType = uploadRes.data;
//         console.log(responseData)
//       return responseData;
//     } else {
//       throw new Error('Upload failed');
//     }
//   } catch (error:any) {
//     throw new Error('Upload failed: ' + error.message);
//   }
// };

export default uploadFileToImageKit;