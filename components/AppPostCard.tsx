import React from "react";
import Image from "next/image";
import uplike from "@/assets/uplike.svg";
import comment from "@/assets/comment.svg";
import downlike from "@/assets/downlike.svg";
import { calcLength } from "framer-motion";
type Props = {
  like?: string;
  headingpost?: string;
  posttype?: string;
  image?: string;
};

const AppPostCard = ({
  headingpost = "$800K a year as software developer",
  posttype = "question",
  image,
}: Props) => {
  const [commentcount, setCommentCount] = React.useState(30);
  const [like, setLike] = React.useState(0);
  return (
    <div className="w-full md:max-w-2xl bg-black h-fit min-h-[106px] rounded-lg mt-3 p-[10px] relative flex flex-start">
      <div className="text-xs leading-5 font-semibold mr-4 shrink-0 text-white flex flex-col items-center relative z-10 ">
        <Image
          src={uplike}
          alt="like"
          onClick={() => setLike((prev) => prev + 1)}
        />
        {like}
        <Image
          src={downlike}
          alt="like"
          onClick={() => like > 0 && setLike((prev) => prev - 1)}
        />
      </div>
      <div
        style={{ width: `calc(100% - 32px)` }}
        className="grow shrink basis-0 flex-col  flex"
      >
        <div className="mb-2 flex items-center text-blue-600 font-semibold leading-5 text-xs">
          member Only
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex grow shrink basis-0">
              <h2 className="flex text-white  break-words font-semibold text-lg leading-6 mr-3">
                {headingpost}
              </h2>
            </div>
            <div className="inline-flex items-center relative z-10 flex-wrap">
              <div className="bg-purple-400 mt-2 mr-2 mb-0 ml-0 flex items-center px-[6px] py-[3px] cursor-pointer transition-all ease-in-out">
                <span className="text-xs leading-5 flex items-center text-black bg-transparent">
                  {posttype}
                </span>
              </div>
              <div className=""></div>
              <div className="text-xs leading-5 font-semibold flex items-center mt-2 mr-2 py-[2px] px-[5px] text-gray-500 rounded-md cursor-pointer">
                <Image src={comment} alt="like" />
                <span>{commentcount}</span>
              </div>
            </div>
          </div>
          <div className="">
            {image && (
              <div className="relative flex items-center justify-center ml-5 w-[62px] h-[62px] bg-slate-400 rounded-sm overflow-hidden cursor-pointer border-[1px] border-gray-400">
                <Image width={60} height={60} src={image} alt="like" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPostCard;
