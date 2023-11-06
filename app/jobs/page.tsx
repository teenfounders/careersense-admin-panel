"use client";
import AppSearchInput from "@/components/AppSearchInput";
import React, { useState } from "react";
import { dummyItems } from "@/components/Sidebar";
import Image from "next/image";
import Search from "@/assets/graysearch.svg";
import JobCard from "@/components/JobCard";
import { jobcardContent } from "@/utils/postdata";
import AppSearchLeftInput from "@/components/AppSearchLeftInput";
const Jobs = () => {
  const [selectedItem, setSelectedItem] = useState<string>(""); // State to manage selected item in sidebar

  const handleSelectSearch = (selectedItem: string) => {
    // Do something with the selected item
    setSelectedItem(selectedItem);
  };
  return (
    <main className="bg-[#fafafa] flex flex-col grow relative w-full  lg:h-screen overflow-y-auto">
      {/* <header className="sticky z-20 top-0 shadow-md min-w-full bg-white border-b-[1px] border-[#dadada] min-h-[86px]  mb-0"> */}
      <header className="lg:sticky relaitve  z-20 top-0 shadow-md min-w-full justify-center items-center  flex bg-[#ffffff] border-b-[1px] border-[#dadada] min-h-[86px]  mb-0">
        <ul className="flex flex-wrap justify-center items-center max-w-5xl">
          <li className="list-none pt-1 nav-link ">
            <a href="#" className=" ">
              Location
            </a>
          </li>

          <li className="list-none pt-1 nav-link ">
            <a href="#" className=" ">
              Stage
            </a>
          </li>
          <li className="list-none pt-1 nav-link ">
            <a href="#" className=" ">
              Job Title
            </a>
          </li>
          <li className="list-none pt-1 nav-link ">
            <a href="#" className=" ">
              Experience Level
            </a>
          </li>
          <li className="list-none pt-1 nav-link ">
            <a href="#" className=" ">
              ERGs
            </a>
          </li>
          <li className="list-none pt-1 nav-link ">
            <a href="#" className=" ">
              Values
            </a>
          </li>
          <li className="list-none pt-1 nav-link ">
            <a href="#" className=" ">
              Remote Culture
            </a>
          </li>
          <li className="list-none pt-1 nav-link ">
            <a href="#" className=" ">
              Benefits
            </a>
          </li>
          <li className="list-none pt-1 nav-link ">
            <a href="#" className=" ">
              Salary
            </a>
          </li>
        </ul>
      </header>
      <main className="block  ">
        <div className="my-5 mx-auto w-full  max-w-5xl">
          <div className="mb-4 w-full">
            {/* <span className="relative">
              <span
                className="absolute left-3"
                style={{
                  top: `calc(40% - 5px)`, // 10px is half of the image height (20px / 2)
                }}
              >
                <Image src={Search} width={18} height={18} alt="image" />
              </span> */}
            <AppSearchLeftInput
              label=""
              placeholder="Search Jobs"
              value={selectedItem}
              // error={error}
              classname="min-w-full pl-9  h-[48px]"
              items={dummyItems}
              onSelect={handleSelectSearch}
            />
            {/* </span> */}
          </div>
          <div className="p-4 mb-4 bg-white shadow-md border-[1px] border-[#dadada]  rounded-md overflow-hidden">
            <div className="w-full flex  justify-between mb-4">
              <span className="overflow-hidden text-sm text-[#666] font-medium">
                YOUR TOP JOB MATCHES ON UNTAPPED
              </span>
            </div>
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-auto gap-4 justify-stretch items-stretch">
              {/* <div className="grid-rows-auto grid-cols-3 max-md:grid-cols-2"> */}
              {jobcardContent.map((job, index) => (
                <JobCard
                  key={index}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  jobType={job.jobType}
                  salary={job.salary}
                  applicants={job.applicants}
                  imageSrc={job.imageSrc}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </main>
  );
};

export default Jobs;
