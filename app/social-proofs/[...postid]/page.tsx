"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import bookmark from "@/assets/bookmark1.svg";
import comment from "@/assets/commentimage.svg";
import postcardimage from "@/public/fullpostimage.png";
 
import { cardData , Comments } from "@/utils/constant";
// import { ComponentsPageWrapper } from "@/components/page-wrapper";
 
import AppComment from "@/components/AppComment";
import { Comment } from '../../../components/AppSocialProofModal';
import { commentData } from '../../../utils/constant';
import { ComponentsPageWrapper } from "@/components/page-wrapper copy";
import AppCommentNoReply from "@/components/CommentNoReply";
type data = {
  title?: string;
  tags?: string;
  Comments?: Comments;
  content?: string;
  image?: string | StaticImageData;
};

export default function Page({ params }: { params: { postid: string } }) {
    
  const [data, setData] = useState<data>();
  useEffect(() => {
    const datas = cardData.find((d) => d.id === Number(params.postid));
    setData(datas);
  }, []);
 console.log(data?.Comments)
  return (
    <div className=" bg-white flex flex-col grow relative w-full  h-screen overflow-y-auto">
      <header className="sticky z-20 top-0 shadow-md min-w-full justify-center items-center  flex bg-[#ffffff] border-b-[1px] border-[#dadada] min-h-[86px]  mb-0">
        <ul className="flex flex-wrap  absolute right-4 justify-right items-center max-w-5xl">
        {/* <button className="py-2 px-3 bg-blue-600 text-white rounded-xl" >new job</button> */}
         
        </ul>
      </header>
      <ComponentsPageWrapper>
        <div className="bg-white border-2 flex flex-col items-start justify-between gap-y-4 tracking-tight border-gray-300 rounded-lg px-10 py-6 w-full  relative">
          {data && (
            <>
              <div className="font-['Manrope'] font-[500] text-2xl text-[#141417] ">
                {data.title}
              </div>
              <h3 className="text-[#4E88D8] font-manrope text-xl font-[500]">{data.tags}</h3>
              <div className="w-full h-full flex flex-col gap-3 relative">
                <p className="text-[#3F3F42] text-start text-[18px] leading-[1.6] font-[400] line-clamp-2 ">
                  {data.content}
                </p>

                {data.image && (
                  <div className="w-full min-h-[200px] relative">
                    <Image
                      src={data.image || postcardimage}
                      width={300}
                      height={300}
                      className="w-full"
                      alt="comment"
                    />
                  </div>
                )}
              </div>
              {/* <div className="flex gap-4 items-start w-full h-full relative justify-start">
                <Image
                  src={bookmark}
                  width={30}
                  className="w-fit h-fit object-cover"
                  height={40}
                  alt="comment"
                />
                <span className="max-w-[620px] px-2 py-1    border-[1px] border-[#D7D7D7] rounded-sm h-[32px] relative flex gap-1 items-center ">
                  <Image
                    src={comment}
                    width={30}
                    className="w-fit h-fit object-cover"
                    height={40}
                    alt="comment"
                  />
                  <span className="text-base text-[#707680] "></span>
                </span>
              </div> */}
            </>
          )}
        </div>
        <div className="w-full h-[120px] bg-orange-100/70 rounded-2xl"></div>
        {!data?.Comments && 
              <div className="">
                <AppCommentNoReply comments={commentData}  /> 
              </div>
              }
      </ComponentsPageWrapper>
    </div>
  );
}
