import React, { Dispatch, ReactEventHandler } from "react";
import edits from "@/assets/eidt.svg";
import Image from "next/image";
type Props = {
  title?: string;
  experience?: string;
  edit?: React.MouseEventHandler<HTMLButtonElement>;
};

const AppExpereinceCard = ({ title, experience, edit }: Props) => {
  return (
    <div className="max-w-xs bg-[rgb(255,255,255)] flex justify-between p-3 min-h-[120px] rounded-md border-[1px] border-[#D7D7D7]">
      <div className="p-2 flex justify-between  flex-col gap-4">
        <h2 className="text-[15px] leading-[18.5px] font-normal ">{title}</h2>
        <h1
          className="font-semibold text-xl leading-6 text-[#4E71DA]
"
        >
          {experience}
        </h1>
      </div>
      <div className="">
        <button onClick={edit}>
          <Image alt={"image"} width={20} height={20} src={edits} />
        </button>
      </div>
    </div>
  );
};

export default AppExpereinceCard;
