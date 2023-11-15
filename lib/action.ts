// import { useQuery } from 'react-query';
// import axios from 'axios';
// import cheerio from 'cheerio-without-node-native'; // Import cheerio from the alternative library

import axios from "axios";

// export const useCompanyData = (selectedCompanyId: string) => {
//   return useQuery(['companyData', selectedCompanyId], async () => {
//     const response = await axios(`/api/companies/${selectedCompanyId}/experience-tracker`);
//     return response.data;
//   });
// };

// // utils/getOpenGraphData.ts

// interface OpenGraphData {
//   image: string | null;
//   title: string | null;
//   description: string | null;
// }

// const getOpenGraphData = async (url: string): Promise<OpenGraphData> => {
//   try {
//     const response = await axios.get(url);
//     const htmlContent = response.data;
//     const $ = cheerio.load(htmlContent);

//     const ogp: OpenGraphData = {
//       image: $('meta[property="og:image"]').attr('content') || null,
//       title: $('meta[property="og:title"]').attr('content') || null,
//       description: $('meta[property="og:description"]').attr('content') || null,
//     };

//     return ogp;
//   } catch (error) {
//     console.error('Error fetching Open Graph data:', error);
//     throw error;
//   }
// };

// export default getOpenGraphData;


 export const fetchCompanyNames = async () => {
    const response = await axios.get(`/api/companies`);
    return response.data;
 };
  
export const fetchCompanyOpenGraph = async (url1:string, url2:string) => {
    const response = await axios.post("/api/openGraph", { url1, url2 });
    return response;
 }