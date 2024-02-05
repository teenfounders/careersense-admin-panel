import React from "react";

type Props = {
  job_title?: string;
  skills_required?: string;
  company_name?: string;
  yoe?: string;
  experienceDetails?: string[];
};

const JobInter = (props: Props) => {
  
  return (
    <div className="flex w-full h-auto flex-col bg-white border-[1px] border-[#D7D7D7] px-[30px] py-6 rounded-[10px] gap-3">
      <div className="flex justify-between w-full items-center gap-2 flex-wrap">
        <h1 className="font-phudu basis-[75%] text-2xl font-[500] leading-normal text-[#141417]">
          {props.job_title 
           }
        </h1>
        <>
          <p
            className="text-[#39C859] max-lg:order-2
         font-phudu text-2xl font-[500] text-start leading-normal"
          >
            {props.yoe}
          </p>
          <p className="text-[1.125rem] font-[500] max-lg:order-3 leading-normal font-manrope">
            {props.company_name}
          </p>
        </>
      </div>
      <div className="font-manrope text-[17px] font-[500] leading-normal text-[#24201F] ">
        {props.skills_required || "Python | C++ | Java "}
      </div>

      <div className="mx-auto w-full font-onest relative pl-4">
        {props.experienceDetails && props.experienceDetails.length > 0 && (
          <ul className="leading-[1.75rem]">
            {props.experienceDetails?.map(
              (experience: string, index: number) => (
                <li className="list-disc" key={index}>
                  {experience}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobInter;
