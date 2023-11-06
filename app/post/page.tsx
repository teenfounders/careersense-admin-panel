"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { postdata } from "@/utils/postdata";
import PostComponent from "@/components/PostComponent";
import Image from "next/image";
import { dummyItems } from "@/components/Sidebar";
import Search from "@/assets/graysearch.svg";
import AppSearchInput from "@/components/AppSearchInput";
import MainHeader from "@/components/MainHeader";
import AppSearchLeftInput from "@/components/AppSearchLeftInput";
import downarrow from "@/assets/downarrow.svg";
import { calcLength } from "framer-motion";
import { BsGraphDownArrow } from "react-icons/bs";

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
  label?: string;
  // skills: Skill[];
  linkedin: string;
  email: string;
}

interface PostProps {
  posts: Post[];
}

const PostList: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const [showNavbar, setShowNavbar] = useState(false);
  const handleSelectSearch = (selectedItem: string) => {
    // Do something with the selected item
    setSelectedItem(selectedItem);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowNavbar(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="bg-[#fafafa] block">
      <div
        style={{ width: `calc(100% - 244px)` }}
        className="fixed top-0 z-10 py-4 px-5 shadow-lg bg-[#fff] opacity-0 flex-row justify-center "
      >
        <AppSearchLeftInput onSelect={handleSelectSearch} />
        <div className="">
          Hot <BsGraphDownArrow />
        </div>
      </div>
      <div>
        <header className="pt-16  ">
          <div className="relative bg-[#fff] pt-8 px-0 pb-6 text-[#0e0e0e] ">
            <div className="flex-row w-full flex justify-between mx-auto py-0 px-4 max-w-[66rem] ">
              <div className="mr-[10px] relative flex grow shrink basis-4/6 min-w-[21.875rem] w-full mx-auto">
                <div className="pr-20">
                  <div className="text-[2rem] font-semibold font-sans ">
                    All Posts
                  </div>
                  <div className="mt-2 items-center flex text-xs font-normal ">
                    <span>
                      <span className="text-xs">724,541 members</span>
                      <span className="my-0 mx-3 text-[#dadada] text-xs font-normal leading-[130%]">
                        |
                      </span>
                      <span className="h-[6px] w-[6px] bg-[#4bcdbc] rounded-[50%] inline-block my-0 mr-1 mb-[0.125rem]  text-xs font-normal leading-[130%]"></span>
                      4,400 online
                    </span>
                  </div>
                </div>
              </div>
              {/* this is right side */}
              <div className="ml-[10px] flex grow-0 shrink min-w-[14rem] max-w-[18.75rem] w-full mx-auto">
                <div className="h-full relative "></div>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-row mt-6 w-full flex justify-between mx-auto py-0 px-4 max-w-[66rem]">
          <div className="mr-[10px] relative grow shrink basis-2/3 min-w-[21.875rem] w-full mx-auto"></div>
          <div className="ml-[10px] grow shrink basis-1/3 min-w-[14.75rem] max-w-[18.75rem] w-full mx-auto"></div>
        </div>
      </div>
      <div className="flex flex-row mt-6 w-full justify-between mx-auto py-0 px-4 max-w-[66rem] ">
        <div className="mr-[10px] relative grow shrink basis-2/3 min-w-[21.875rem] w-full mx-auto">
          <div className="relative ">
            <div className="flex  ">
              <div className="flex grow shrink-0 basis-0 mr-11  relative h-10 w-full">
                <AppSearchLeftInput
                  label=""
                  placeholder="Search Jobs"
                  value={selectedItem}
                  // error={error}

                  classname=" rounded-full pl-9 w-30 "
                  items={dummyItems}
                  onSelect={handleSelectSearch}
                />
              </div>
              <div className="flex grow-0 shrink basis-0 my-auto mr-2 ml-0">
                <div className="flex justify-center items-center gap-2 w-full">
                  <span>Hot </span>
                  <Image
                    src={downarrow}
                    width={10}
                    height={10}
                    className="w-[1em] text-xs font-normal leading-[150%]"
                    alt="downarrow"
                  />
                </div>
              </div>
            </div>
          </div>
          <section className="mt-6">
            <div className="p-8 bg-[#fff] shadow-md  hover:scale- rounded-[8px] min-h-[5.8125rem] flex cursor-pointer">
              <span className="mr-4 shrink-0 h-9 w-9 bg-[#f2faff] flex items-center justify-center rounded-[50%] relative ">
                <span className="text-[#25b2aa] font-bold ">SB</span>
              </span>
              <span className="">
                <span className="mb-1 text-[#666] text-xs font-normal leading-[130%]">
                  {" "}
                  Sammed B
                </span>
                <p className="text-[#666] text-base font-normal leading-[150%]">
                  Ask questions or share with the community
                </p>
              </span>
            </div>
          </section>
          <div className="">
            {postdata.map((postData, index) => (
              // <Link key={postData.id} href={`/post/${postData.id}`}>
              //   <PostComponent post={postData} />
              // </Link>
              <li key={index} className=" list-none">
                <PostComponent post={postData} />
              </li>
            ))}
          </div>
        </div>
        <div className="ml-[10px] flex grow-0 shrink basis-1/3 min-w-[14.75rem] max-w-[18.75rem] w-full mx-auto"></div>
      </div>
    </div>
  );
};

export default PostList;
