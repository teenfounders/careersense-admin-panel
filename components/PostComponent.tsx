"use client";
import Link from "next/link";
import Image from "next/image";
import dot from "@/assets/3dot.svg";
import React, { ChangeEvent } from "react";
import AppPostButton from "./AppPostButton";
import heart from "@/assets/heart.svg";
import message from "@/assets/message.svg";
import bell from "@/assets/bell.svg";
import { FaArrowDown, FaSortDown } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import AppInput from "./AppInput";
interface Skill {
  id: number;
  name: string;
}

interface Post {
  id: number;
  name: string;
  university: string;
  community: string;
  graduationYear: number;
  location: string;
  date: string;
  views: number;
  content: string;
  //   skills: Skill[];
  label?: string;
  linkedin: string;
  email: string;
}

interface PostCardProps {
  post: Post;
}

const PostComponent: React.FC<PostCardProps> = ({ post }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {};
  console.log(post.label);
  return (
    // <div className=" w-full flex-col  flex gap-2 bg-white shadow-xl rounded-lg">
    //   <div className="p-4 w-full border-b-[1px] border-gray-200  flex gap-2 bg-white">
    //     <div className="w-[2.56rem] h-[2.56rem] rounded-full justify-center items-center bg-green-100 ">
    //       <span className="p-2 font-semibold text-[#25b2aa] flex items-center justify-center">
    //         SB
    //       </span>
    //     </div>
    //     {/* <div className="w-[3.56rem] h-[2.56rem] bg-green-100 rounded-full  items-center flex justify-center text-[#25b2aa] font-semibold">
    //     SB
    //   </div> */}
    //     <div className="flex flex-col gap-2">
    //       <Link key={post.id} href={`/post/${post.id}`}>
    //         <div className="mb-6">
    //           <h2 className="text-xs font-semibold">
    //             {post.name} <span>in</span>{" "}
    //             <Link
    //               href={"/communities"}
    //               className="hover:underline"
    //             >
    //               {post.community}
    //             </Link>
    //           </h2>
    //           <p className=" font-normal text-xs text-[#666] ">
    //             {post.university}, Class of {post.graduationYear}
    //             {post.location} · {post.date} · {post.views} Views
    //           </p>
    //         </div>
    //         <p className="text-[#0E0E0E] text-sm leading-6 font-normal">
    //           {post.content}
    //         </p>
    //       </Link>
    // <div className="flex gap-2">
    //   <AppPostButton
    //     classname="hover:scale-105"
    //     icon={heart}
    //     label={"Like"}
    //   />
    //   <AppPostButton
    //     classname="hover:scale-105"
    //     icon={message}
    //     label={"message"}
    //   />
    //   <AppPostButton
    //     classname="hover:scale-105"
    //     icon={bell}
    //     label={"Follow"}
    //   />
    // </div>
    //     </div>
    //   </div>
    //   <div className="p-2  flex">
    // <div className="w-[4.56rem] h-[2.56rem] border-[1px] border-gray-300  rounded-full justify-center items-center  ">
    //   <span className="p-2  font-semibold text-[#25b2aa] flex items-center justify-between">
    //     SB
    //     <BsChevronDown size={12} className="text-gray-300" />
    //   </span>
    // </div>
    //     <AppInput
    //       type={"text"}
    //       label={""}
    //       name={"comment"}
    //       required={false}
    //       classname="border-none"
    //       placeholder="Add a comment..."
    //       onChange={handleInputChange}
    //     />
    //   </div>
    // </div>
    <div className="my-8 mx-0 rounded-2xl py-6 px-8 border-[1px] border-[#fafafa] shadow-md bg-[#fff] overflow-hidden relative">
      <div className="mb-4 flex">
        <span className="mr-4 shrink-0 h-9 w-9 bg-[#f2faff] flex items-center justify-center rounded-[50%] relative ">
          <span className="text-[#25b2aa] font-bold ">SB</span>
        </span>
        <div className="w-full justify-between flex">
          <div className="">
            <div className="mb-[0.125rem] gap-1 flex text-[#0e0e0e] text-xs font-normal leading-[130%]">
              <p className="text-xs font-semibold ">{post.name}</p>
              <span className="flex">in</span>
              <p className="text-xs font-semibold ">{post.community}</p>
            </div>
            <div className="flex text-[#666] text-xs ">
              <span>
                <p className=" font-normal text-xs text-[#666] ">
                  {post.university}, Class of {post.graduationYear}
                  {post.location} · {post.date} · {post.views} Views
                </p>
              </span>
            </div>
          </div>
          <div className="text-[#dadada]">
            <Image
              src={dot}
              width={10}
              height={10}
              className="w-[0.875em] hover:opacity-60 hover:delay-100"
              alt="e"
            />
          </div>
        </div>
      </div>
      <div className="cursor-pointer">
        <Link key={post.id} href={`/post/${post.id}`}>
          <div className="relative ">
            <div className="flex">
              <div className="max-w-[2.25rem] min-w-[2.25rem] mr-[0.625rem] flex flex-col "></div>
              <span>
                <span className="text-base font-semibold text-[#0e0e0e] mb-1">
                  {post.label}
                </span>
                <p className="leading-6 text-[#0e0e0e] text-sm font-normal break-words">
                  {post.content}
                </p>
              </span>
            </div>
          </div>
        </Link>
        <div className="mt-3 flex">
          <div className="max-w-[2.25rem] min-w-[2.25rem] mr-[0.625rem]"></div>

          <div className="flex gap-2">
            <AppPostButton
              classname="hover:scale-105  py-2 bg-[#fff] border-[#a6a6a6] items-center justify-center flex "
              icon={heart}
              onClick={() => console.log("clieced by 1head")}
              label={"Like"}
            />
            <AppPostButton
              classname="hover:scale-105   bg-[#fff] border-[#a6a6a6] items-center justify-center flex  py-2  "
              icon={message}
              onClick={() => console.log("clieced by message")}
              label={"comment"}
            />
            <AppPostButton
              classname="hover:scale-105  py-2 bg-[#fff] border-[#a6a6a6] items-center justify-center flex"
              icon={bell}
              onClick={() => console.log("clieced by bell")}
              label={"Follow"}
            />
          </div>
        </div>
      </div>
      <hr style={{ width: `calc(100% + 64px)` }} className="mt-4 mb-4 -m-8 " />
      <div className="p-0 items-center flex">
        <div className="min-w-0 border-[1px] rounded-full border-[#dadada] p-1 mr-6 shrink-0 justify-center items-center flex text-sm leading-[130%]">
          {/* <div className="w-[4.56rem] h-[2.56rem] border-[1px] border-gray-300  rounded-full justify-center items-center  "> */}
          <div className="inline-block">
            <div className="min-w-[3rem] justify-between items-center flex">
              <span className="items-center gap-2 flex">
                <span className="p-2  font-semibold text-[#25b2aa] ">SB</span>
                <BsChevronDown size={12} className="text-gray-600" />
              </span>
            </div>
          </div>
        </div>
        <form style={{ width: `calc(100% + 1.5rem)` }}>
          <div className="-ml-3 text-lg w-full max-w-full inline-block">
            <AppInput
              type={"text"}
              label={""}
              placeholder="Add a comment"
              classname="border-none text-base error:border-none h-10 w-full focus:none placeholder:text-["
              name={""}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostComponent;
