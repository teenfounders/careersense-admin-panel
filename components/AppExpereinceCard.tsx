import React, { Dispatch, ReactEventHandler } from "react";
import edits from "@/assets/eidt.svg";
import del from "@/assets/delete1.svg";
import Image from "next/image";
type Props = {
  role?: string;
  _id: string;
  experience?: string;
  edit?: React.MouseEventHandler<HTMLButtonElement>;
  deleteExperience?: React.MouseEventHandler<HTMLButtonElement>;
};

const AppExpereinceCard = ({
  _id,
  role,
  experience,
  edit,
  deleteExperience,
}: Props) => {
  return (
    <div className="max-w-xs bg-[rgb(255,255,255)] flex justify-between p-3 min-h-[120px] rounded-md border-[1px] border-[#D7D7D7]">
      <div className="p-2 flex justify-between overflow-hidden   flex-col gap-4">
        <h1
          className="font-semibold text-xl leading-6 text-[#4E71DA]
"
        >
          {role}
        </h1>
        <h2 className="text-[15px] leading-[18.5px] font-normal ">
          Exp Required: {experience?.slice(0)}
        </h2>
      </div>
      <div className="flex gap-2 items-start justify-start">
        <button className="hover:scale-110" onClick={deleteExperience}>
          <Image alt={"image"} width={20} height={20} src={del} />
        </button>
        <button className="hover:scale-110" onClick={edit}>
          <Image alt={"image"} width={20} height={20} src={edits} />
        </button>
      </div>
    </div>
  );
};

export default AppExpereinceCard;
