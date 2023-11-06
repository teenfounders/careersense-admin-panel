import React from "react";
import Image, { StaticImageData } from "next/image";
import bookmark from "@/assets/bookmark.svg";

interface JobCardProps {
  title?: string;
  company?: string;
  location?: string;
  jobType?: string;
  salary?: string;
  applicants?: number;
  imageSrc?: string | StaticImageData;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  salary,
  jobType,
  applicants,
  imageSrc,
}: JobCardProps) => {
  return (
    <div className="w-full border-[1px] border-[#a6a6a6]/60 m-0 flex flex-col relative overflow-hidden p-[0.9375rem] rounded-md ">
      <div className="grow shrink basis-0 flex flex-col justify-center">
        <div className="flex w-full justify-between mb-2">
          <Image src={imageSrc || ""} width={90} height={90} alt={"image"} />
          <span className="text-[#a6a6a6] text-xs">
            {applicants} applicants
          </span>
        </div>
        <div className="grow shrink basis-0 flex flex-col">
          <div className="mb-[0.325rem] text-base  font-medium text-[#0e0e0e] cursor-pointer">
            {title}
          </div>
          <div className="mb-[0.5rem] ">
            <span className="font-normal text-sm  leading-4 ">{company}</span>
          </div>
          <div className="mb-3 ">
            <span className="text-xs leading-4 font-normal">
              {salary}
              {salary && <span className="text-md"> • </span>}
            </span>
            <span className="text-xs leading-4 font-normal  ">
              {jobType}
              {jobType && <span> • </span>}
            </span>
            <span className="text-xs leading-4 font-normal">{location}</span>
          </div>
        </div>
        <hr className="h-[1px] bg-[#a6a6a6] section-card--hr" />
        <div className="flex flex-wrap justify-start">
          <div className="flex justify-start flex-wrap mr-3 flex-1">
            <button className="flex ml-1 max-h-[3rem] font-semibold text-sm items-center space-x-2 py-0 px-4 card-button ">
              <Image
                src={bookmark}
                className="mr-[0.375rem]"
                width={10}
                height={10}
                alt="bookmark"
              />
              Save
            </button>
          </div>
          <div className="ml-auto flex">
            <button className="flex ml-1 max-h-[3rem] font-semibold text-sm items-center space-x-2 py-0 px-4 card-button  ">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
