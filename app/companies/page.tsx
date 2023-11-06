"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import APPButton from "@/components/AppButton";
// import AppModal from "@/components/AppModal";
import loader from "@/assets/loder.svg";
import Image from "next/image";

import Link from "next/link";
import { useScroll } from "framer-motion";

import AppModal from "@/components/AppModal";
import { ICompany } from "@/utils/types";

import { useRouter } from "next/navigation";
import { useCompany } from "@/context/CompanyId";

type Props = {};

const Companies = (props: Props) => {
  const router = useRouter();
  const { selectedCompanyId, setSelectedCompanyId } = useCompany();
  const [open, setOpen] = useState(false);
  const [companyNames, setCompanyNames] = useState<ICompany[]>([]);

  const handleModalOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleCompanyClick = (companyId: string, companyNamess: string) => {
    // Set the selected company ID in the context
    console.log(companyId);
    console.log(companyNamess);
    setSelectedCompanyId(companyId);

    // Navigate to the company page without exposing the company ID in the URL
    router.push(`/companies/${companyNamess}`);
  };
  useEffect(() => {
    const fetchCompanyNames = async () => {
      try {
        const response = await axios.get(`/api/companies`);
        const data = response.data; // Assuming `data.companies` contains the array of companies
        setCompanyNames(data.companies);
      } catch (error) {
        console.error("Error fetching company names:", error);
      }
    };

    fetchCompanyNames();
  }, []);
  return (
    <main className="bg-[#fafafa] flex flex-col grow relative w-full  h-screen overflow-y-auto">
      {/* <header className="sticky z-20 top-0 shadow-md min-w-full bg-white border-b-[1px] border-[#dadada] min-h-[86px]  mb-0"> */}
      <header className="sticky z-20 top-0 shadow-md min-w-full justify-center items-center  flex bg-[#ffffff] border-b-[1px] border-[#dadada] min-h-[86px]  mb-0">
        <ul className="flex flex-wrap absolute right-4 justify-right items-center max-w-5xl">
          <AppModal
            open={false}
            handleModalOpen={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </ul>
      </header>
      <main className="block relative  ">
        <div className="my-5 mx-auto w-full  max-w-5xl">
          <div className="mb-4 w-full"></div>
          <div className="p-4 mb-4 bg-white shadow-md border-[1px] border-[#dadada]  rounded-md overflow-hidden">
            <div className="w-full flex  justify-between mb-4">
              <span className="overflow-hidden text-sm text-[#666] font-medium">
                COMPANIES PROFILES
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 relative">
              {companyNames.length > 0 ? (
                companyNames
                  .map((company, idx) => (
                    <div key={idx} className="text-[#4766cc]">
                      <Link
                        href={{
                          pathname: `/companies/${company.Company_Name.toLowerCase()}`,
                          // query: {
                          //   id: `${company._id}`,
                          // },
                        }}
                        onClick={() =>
                          handleCompanyClick(
                            company._id || "",
                            company.Company_Name
                          )
                        }
                        // as={`/companies/${company.Company_Name.toLowerCase()}`}
                      >
                        <span className="font-medium text-md text-[#4E71DA]">
                          {company.Company_Name}
                        </span>
                      </Link>
                    </div>
                  ))
                  .reverse()
              ) : (
                <div className="w-full mx-auto col-span-3  flex gap-3 justify-center  my-10 ">
                  <Image
                    src={loader}
                    alt="loader"
                    className="animate-spin invert"
                  />
                  loading...
                </div>
              )}
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </main>
      <div className="">
        {/* <AppModal open={open} handleModalOpen={handleModalOpen} /> */}
      </div>
    </main>
  );
};

export default Companies;
