"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { ICompany } from "@/utils/types";
import axios from "axios";
import Image from "next/image";
import { useCompany } from "@/context/CompanyId";
export default function Page({ params }: { params: { companies: string } }) {
  const [companyData, setCompanyData] = useState<ICompany | null>(null);
  const { selectedCompanyId } = useCompany();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`/api/companies/${selectedCompanyId}`);
        const data = response.data; // Assuming the API response is an object containing the company data
        setCompanyData(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [id, selectedCompanyId]); // Include 'id' as a dependency to re-fetch data when the 'id' changes

  return (
    <div className="max-w-5xl mx-auto p-4">
      {companyData && (
        <>
          <h1 className="text-2xl font-bold mb-4">
            {companyData.Company_Name}
          </h1>
          <Image
            width={100}
            height={100}
            src={companyData.Company_Logo}
            alt={companyData.Company_Name}
            className="w-32 h-32 object-contain mb-4"
          />
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">About career page:</h2>
            <p className="text-gray-600">{companyData.Careers_Page}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Company website:</h2>
            <p className="text-gray-600">{companyData.Website}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Company Ats:</h2>
            <p className="text-gray-600">{companyData.Careers_Page_ATS}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Company Linkdin:</h2>
            <p className="text-gray-600">{companyData.Company_LinkedIn}</p>
          </div>

          {/* <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Links:</h2>
            <ul className="list-disc pl-6">
              <li>
                <span className="text-blue-500 hover:underline">
                  <a
                    href={companyData.Website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </span>
              </li>
              <li>
                <span className="text-blue-500 hover:underline">
                  <a
                    href={companyData.Careers_Page}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Careers Page
                  </a>
                </span>
              </li>
              <li>
                <span className="text-blue-500 hover:underline">
                  <a
                    href={companyData.Company_LinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </span>
              </li>
            </ul>
          </div> */}
        </>
      )}
    </div>
  );
}
