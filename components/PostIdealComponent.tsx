"use client";
import Link from "next/link";
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
  linkedin: string;
  email: string;
}

interface PostCardProps {
  post: Post;
}

const PostComponent: React.FC<PostCardProps> = ({ post }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {};
  return (
    <div className=" w-full flex-col  flex gap-2 bg-white">
      <div className="p-4 w-full border-b-[1px] border-gray-200  flex gap-2 bg-white">
        <div className="w-[2.56rem] h-[2.56rem] rounded-full justify-center items-center bg-green-100 ">
          <span className="p-2 font-semibold text-[#25b2aa] flex items-center justify-center">
            SB
          </span>
        </div>
        {/* <div className="w-[3.56rem] h-[2.56rem] bg-green-100 rounded-full  items-center flex justify-center text-[#25b2aa] font-semibold">
        SB
      </div> */}
        <div className="flex flex-col gap-2">
          <Link key={post.id} href={`/post/${post.id}`}>
            <div className="mb-6">
              <h2 className="text-xs font-semibold">
                {post.name} <span>in</span>{" "}
                <Link href={"/communities"} className="hover:underline">
                  {post.community}
                </Link>
              </h2>
              <p className=" font-normal text-xs text-[#666] ">
                {post.university}, Class of {post.graduationYear}
                {post.location} · {post.date} · {post.views} Views
              </p>
            </div>
            <p className="text-[#0E0E0E] text-sm leading-6 font-normal">
              {post.content}
            </p>
          </Link>
          <div className="flex gap-2">
            <AppPostButton
              classname="hover:scale-105"
              icon={heart}
              label={"Like"}
            />
            <AppPostButton
              classname="hover:scale-105"
              icon={message}
              label={"message"}
            />
            <AppPostButton
              classname="hover:scale-105"
              icon={bell}
              label={"Follow"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
