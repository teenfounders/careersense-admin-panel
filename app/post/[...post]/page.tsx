"use client";
import AppPostButton from "@/components/AppPostButton";
import { postdata } from "@/utils/postdata";
import React, { useState } from "react";
import Image from "next/image";
import dot from "@/assets/3dot.svg";

import Link from "next/link";
// import React, { ChangeEvent } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import heart from "@/assets/heart.svg";
import dots from "@/assets/3dot.svg";
import message from "@/assets/message.svg";
import cross from "@/assets/corss2.svg";
import bell from "@/assets/bell.svg";
import { FaArrowDown, FaSortDown } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
// import { dot } from "node:test/reporters";
import AppTextarea from "@/components/AppTextarea";
import AppInput from "@/components/AppInput";
import { useScroll } from "framer-motion";
// import AppInput from "./AppInput";
interface Skill {
  id: number;
  name: string;
}

interface Post {
  id: number;
  name: string;
  university: string;
  graduationYear: number;
  location: string;
  date: string;
  views: number;
  content: string;
  // skills: Skill[];
  linkedin: string;
  email: string;
}

interface PostProps {
  posts: Post[];
}
const PostId = ({ params }: { params: { post: number } }) => {
  const selectedPost = postdata.find((post) => post.id === Number(params.post));
  const [commentopen, setCommentOpen] = useState(true);
  if (!selectedPost) {
    return <div>Post not found</div>;
  }
  const handleComment = () => {
    setCommentOpen((prev) => !prev);
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {};
  return (
    <main className="flex h-screen overflow-y-auto overflow-x-hidden ">
      <div className="relative grow shrink basis-2/3 bg-white shadow-md">
        <div className="sticky top-0 bg-white h-16 shadow-md z-50 px-8 py-5">
          <div className="max-w-[48rem] mx-auto items-  flex cursor-pointer">
            <IoChevronBackOutline />
            <span className="text-sm font-normal leading-[130%]">Back</span>
          </div>
        </div>
        <section className="border-none mx-auto max-w-[48rem]   z-10 ">
          <div className="rouneded-[1rem] px-8 py-6 bg-[#fff] overflow-x-hidden overflow-y-auto relative">
            <div className="rounded-0 border-none mx-auto pt-2 min-h-[90%]">
              <div className="border-none mx-auto max-w-[48rem] rounded-2xl bg-[#fff] overflow-hidden relative">
                <div className="mb-4 flex">
                  <span className="mr-4 shrink-0 h-9 w-9 bg-[#f2faff] flex items-center justify-center rounded-[50%] relative ">
                    <span className="text-[#25b2aa] font-bold ">SB</span>
                  </span>
                  <div className="w-full justify-between flex">
                    <div className="">
                      <div className="mb-[0.125rem] gap-1 flex text-[#0e0e0e] text-xs font-normal leading-[130%]">
                        <p className="text-xs font-semibold ">
                          {selectedPost.name}
                        </p>
                        <span className="flex">in</span>
                        <p className="text-xs font-semibold ">
                          {selectedPost.community}
                        </p>
                      </div>
                      <div className="flex text-[#666] text-xs ">
                        <span>
                          <p className=" font-normal text-xs text-[#666] ">
                            {selectedPost.university}, Class of{" "}
                            {selectedPost.graduationYear}
                            {selectedPost.location} · {selectedPost.date} ·{" "}
                            {selectedPost.views} Views
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
              </div>
            </div>
            <div className="cursor-pointer">
              <div className="relative ">
                <div className="flex">
                  <div className="max-w-[2.25rem] min-w-[2.25rem] mr-[0.625rem] flex flex-col "></div>
                  <span>
                    <span className="text-base font-semibold text-[#0e0e0e] mb-1">
                      {selectedPost.label}
                    </span>
                    <p className="leading-6 text-[#0e0e0e] text-sm font-normal break-words">
                      {selectedPost.content}
                    </p>
                  </span>
                </div>
              </div>

              <div className="mt-3 flex">
                <div className="max-w-[2.25rem] min-w-[2.25rem] mr-[0.625rem]"></div>

                <div className="flex gap-2">
                  <AppPostButton
                    classname="hover:scale-105  py-2 bg-[#fff] border-[#a6a6a6] items-center justify-center flex "
                    icon={heart}
                    onClick={() => {}}
                    label={"Like"}
                  />
                  <AppPostButton
                    classname="hover:scale-105   bg-[#fff] border-[#a6a6a6] items-center justify-center flex  py-2  "
                    icon={message}
                    onClick={() => {}}
                    label={"comment"}
                  />
                  <AppPostButton
                    classname="hover:scale-105  py-2 bg-[#fff] border-[#a6a6a6] items-center justify-center flex"
                    icon={bell}
                    onClick={() => {}}
                    label={"Follow"}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr style={{ width: `calc(100% + 1px)` }} className=" " />
        <div className="  justify-center flex flex-col items-center max-w-[48rem] mx-auto p-8">
          <div className="text-2xl font-normal leading-[125%]"></div>
          <div className="w-[12.5rem] mb-2 overflow-clip  ">
            <Image
              width={200}
              height={200}
              src={
                "https://images.jumpstart.me/frontend/communities/empty-state/no-posts-comments.png"
              }
              alt="image"
            />
          </div>
          <span className="text-[#666] text-sm font-normal leading-[130%]">
            No comments yet Be the first to share your thoughts!
          </span>
        </div>
        <div className="sticky  bottom-0 w-full pt-4 px-8 py-4 gap-3 shadow-lg rounded-t-lg bg-[#fff] z-40">
          {/* <form style={{ width: `calc(100% + 1.5rem)` }}> */}
          {/* <div className="-ml-3 text-lg w-full max-w-full inline-block">
              <AppInput
                type={"text"}
                label={""}
                placeholder="Add a comment"
                classname="border-none text-base error:border-none h-10 w-full focus:none placeholder:text-["
                name={""}
                onChange={handleInputChange}
              />
            </div>
          </form> */}
          <div className=" mb-3 flex justify-between   ">
            <div
              className={`${
                commentopen ? "flex" : "hidden"
              } transition-all justify-between delay-300 ease-in-out w-full gap-2 items-center flex`}
            >
              <span
                className={`${
                  commentopen ? "flex" : "hidden"
                } transition-all delay-300 ease-in-out justify-center gap-2 items-center flex`}
              >
                {" "}
                <div className="w-[2.56rem] h-[2.56rem] rounded-full justify-left items-center bg-green-100 ">
                  <span className="p-2 font-semibold text-[#25b2aa] flex items-center justify-center">
                    SB
                  </span>
                </div>{" "}
                <span className="text-md">{selectedPost.name}</span>
              </span>
              <button onClick={handleComment}>
                <Image
                  alt={"cross"}
                  width={20}
                  height={20}
                  className="invert text-gray-500"
                  src={cross}
                />
              </button>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl  h-full">
            <div
              className={` bg-gray-100 rounded-2xl overflow-y-auto px-2 transition-all duration-300 ${
                commentopen ? "h-28 opacity-100" : "h-10 opacity-0"
              }`}
            >
              <AppInput
                type={"text"}
                label={""}
                placeholder="Add a comment"
                classname="border-none bg-gray-100 text-base error:border-none w-full focus:none placeholder:text-["
                name={""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div
            className={`${
              commentopen
                ? "flex w-full justify-between items-center"
                : "hidden"
            }`}
          >
            <div>hel</div>

            <button className="bg-[#fafafa] text-[#dadada] ">Comment</button>
          </div>
        </div>
      </div>
      <div className="max-w-[25rem] grow-0 shrink basis-[32%] py-9 px-9"></div>
    </main>
  );
};

export default PostId;
