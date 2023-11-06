"use client";
import React, { useContext, useState } from "react";
import lock from "@/assets/lock.svg";
import company from "@/assets/company.svg";
import events from "@/assets/event.svg";
import job from "@/assets/job.svg";
import add from "@/assets/add.svg";
import homeimg from "@/assets/homeimg.svg";
import settings from "@/assets/settings.svg";
import remoteworks from "@/assets/removework.png";
import mice from "@/assets/mice.png";
import generaladvice from "@/assets/general-advice.png";
import logoimage from "@/assets/logoimg.png";
import community from "@/assets/Community.svg";
import logo from "@/assets/brand-logo-combined.svg";
import Link from "next/link";
import Image from "next/image";
import bell from "@/assets/bell.svg";
import Search from "@/assets/searchgray.svg";

import { useSelectedLayoutSegment } from "next/navigation";
import AppSearchInput from "./AppSearchInput";
import { MenuContext } from "@/context/MenuContext";
import AppSearchLeftInput from "./AppSearchLeftInput";
export const dummyItems: string[] = [
  "Team @ Untapped",
  "Item 2",
  "Another Item",
  "More Items",
  "Sample Item",
  "Test Item",
  // Add more items as needed
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Sidebar = () => {
  const { open } = useContext(MenuContext);
  const segment = useSelectedLayoutSegment();
  const [selectedItem, setSelectedItem] = useState<string>("");
  const sidebarOptions = [
    {
      name: "Home",
      href: "/",
      icon: homeimg,
      current: !segment ? true : false,
    },
    {
      name: "Jobs",
      href: "/jobs",
      icon: job,
      current: `/${segment}` == "/jobs" ? true : false,
    },
    {
      name: "Social Proofs",
      href: "/social-proofs",
      icon: events,
      current: `/${segment}` == "/social-proofs" ? true : false,
    },
    {
      name: "Companies",
      href: "/companies",
      icon: company,
      current: `/${segment}` == "/companies" ? true : false,
    },
    {
      name: "Sammed",
      href: "/me",
      icon: homeimg,
      current: `/${segment}` == "/me" ? true : false,
    },
    // {
    //   name: "All Posts",
    //   href: "/jobs",
    //   icon: generaladvice,
    //   current: `/${segment}` == "/communities" ? true : false,
    // },
  ];
  const sidebarCommunity = [
    {
      name: "All Post",
      href: "/post",
      icon: community,

      current: `/${segment}` == "/communities" ? true : false,
    },
    {
      name: "General Post",
      href: "/communities/:id",
      icon: generaladvice,
      // current: `/${segment}` == "/communities/:id" ? true : false,
    },
    {
      name: "Recruiter Announcements",
      href: "/communities/:id",
      icon: mice,
      // current: `/${segment}` == "/communities" ? true : false,
    },
    {
      name: "Remote Work",
      href: "/communitie/:id",
      icon: remoteworks,
      // current: `/${segment}` == "/companies" ? true : false,
    },

    // {
    //   name: "All Posts",
    //   href: "/jobs",
    //   icon: generaladvice,
    //   current: `/${segment}` == "/communities" ? true : false,
    // },
  ];
  // console.log(open);
  const handleSelectSearch = (selectedItem: string) => {
    // Do something with the selected item
    setSelectedItem(selectedItem);
  };

  return (
    <div
      className={`
      fixed
         z-40
          top-0
           ease-in-out duration-300
            
           left-0
         max-lg:${open ? "translate-x-0  " : "-translate-x-full"}
           w-[17.5rem]
           lg:flex
      flex-col
      h-full
      shadow-2xl
      bg-white
      `}
    >
      <header
        className="pt-[1.5rem] 
      px-[1.25rem] pb-0 "
      >
        <div className="justify-between items-center flex">
          <Image
            src={logo}
            width={100}
            height={45}
            alt="logo"
            className="w-[6.25rem]"
          />
          <span className="flex items-center ">
            <Link href={"/settings"}>
              <Image
                src={settings}
                width={18}
                height={18}
                alt="settings"
                className="text-3xl max-h-4  mr-5 font-bold"
              />
            </Link>
            <Image
              src={bell}
              width={18}
              height={18}
              alt="settings"
              className="text-3xl max-h-4    font-bold"
            />
          </span>
        </div>
        <hr className="border-b border-[1px] border-[#f2f2f2] mt-3 mb-0 mx-0" />
      </header>
      <div className=" overflow-y-auto scrollbar-hide overflow-x-hidden h-full  pt-[0.75px] px-0 pb-[6.26rem]">
        <div className="mt-3">
          {sidebarOptions.map((option) => (
            // <span
            //   className={classNames(
            //     option.current ? "border-l-2 bg-gray-100 border-black" : "",
            //     "relative min-w-[17.5rem] min-h-[3rem] py-0 px-6 text-[#0e0e0e] items-center flex list-none"
            //   )}
            // >
            <li
              key={option.name}
              // className={classNames(
              //   option.current ? "border-l-2 border-black" : "",
              //   "text-red-800"
              // )}
              className={classNames(
                option.current
                  ? "border-l-4 rounded-sm bg-gray-100 border-black "
                  : "",
                "relative min-w-[17.5rem] min-h-[3rem] py-0 px-6 text-[#0e0e0e] items-center flex list-none"
              )}
            >
              <Link
                className={classNames(
                  option.current
                    ? "bg-gray-100 items-center absolute left-5"
                    : // ? "bg-gray-200 border-l-4 text  border-black"
                      "",
                  "group text-sm flex items-center justify-center font-normal leading-[130%] "
                )}
                href={option.href}
              >
                <Image
                  src={option.icon}
                  width={20}
                  className="w-6 h-6 mr-4 ml-1"
                  height={16}
                  alt={option.name}
                />
                {option.name}
              </Link>
            </li>
            // </span>
          ))}
        </div>
        <div>
          <div className="pt-8 px-6 pb-3 uppercase tracking-wider justify-between items-center flex ">
            <h3 className="text-[#0e0e0e] text-xs leading-[150%] font-normal">
              Direct Messages
            </h3>
          </div>
          <div className="pl-5 pr-6">
            <AppSearchLeftInput
              placeholder="Search"
              classname="placeholder:pl-8 placeholder:font-normal border-[1px] rounded-full"
              onSelect={handleSelectSearch}
            />
          </div>
          <div className="relative min-w-[17.5rem] min-h-[3rem] py-0 px-6 text-[#0e0e0e] items-center flex">
            <div className="h-[1.625rem] w-[1.625rem] flex-wrap items-center justify-center flex">
              <Image
                src={logoimage}
                className="filter-gray w-6 h-6 block relative rounded-full "
                width={23}
                height={18}
                alt="image"
              />
            </div>
            <p className="text-sm font-normal">Team @ Untapped</p>
            <span className="absolute top-[1.25rem] right-[1rem] h-2 w-2 bg-[#e74926] rounded-md shrink-0"></span>
          </div>
          <div className="">
            <div className="pt-8 px-6 pb-3 uppercase tracking-wider justify-between items-center flex">
              <h3 className="text-[#0e0e0e] text-xs font-normal leading-[150%]">
                Communities (3)
              </h3>
              <div>
                <div className="inline-block">
                  <div className="uppercase  items-center flex border-[1px] border-[#0e0e0e] px-2 py-2 rounded-[100px] hover:bg-gray-100">
                    <Image
                      src={add}
                      width={20}
                      className="w-[0.875rem] h-[0.656rem] mr-1 ml-1"
                      height={16}
                      alt={"add"}
                    />
                    <p className="text-[#0e0e0e] text-xs font-normal tracking-[0.08em] leading-[125%]">
                      Join
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {sidebarCommunity.map((option) => (
              // <span
              //   className={classNames(
              //     option.current ? "border-l-2 bg-gray-100 border-black" : "",
              //     "relative min-w-[17.5rem] min-h-[3rem] py-0 px-6 text-[#0e0e0e] items-center flex list-none"
              //   )}
              <li
                key={option.name}
                // className={classNames(
                // >
                //   option.current ? "border-l-2 border-black" : "",
                //   "text-red-800"
                // )}
                className={classNames(
                  option.current
                    ? "border-l-4 rounded-sm bg-gray-100 border-black"
                    : "",
                  "relative min-w-[17.5rem] min-h-[3rem] py-0 px-6 text-[#0e0e0e] items-center flex list-none"
                )}
              >
                <Link
                  className={classNames(
                    option.current
                      ? "bg-gray-100 items-center"
                      : // ? "bg-gray-200 border-l-4 text  border-black"
                        "",
                    "group text-sm flex items-center font-normal leading-[130%] "
                  )}
                  href={option.href}
                >
                  <Image
                    src={option.icon}
                    width={20}
                    className="w-6 h-6 mr-4 ml-1"
                    height={16}
                    alt={option.name}
                  />
                  {option.name}
                </Link>
              </li>
              // </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
