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
import { useQuery } from "@tanstack/react-query";
import { fetchCompanyNames } from "@/lib/action";

const Companies = () => {
 
  
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
        <div className="my-5 mx-auto w-full max-xl:px-10  max-w-5xl">
          <div className="mb-4 w-full"></div>
          <div className="p-4 mb-4 bg-white shadow-md border-[1px] border-[#dadada]  rounded-md overflow-hidden">
            <div className="w-full flex  justify-between mb-4">
              <span className="overflow-hidden text-sm text-[#666] font-medium">
                COMPANIES PROFILES
              </span>
            </div>

            
            
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
