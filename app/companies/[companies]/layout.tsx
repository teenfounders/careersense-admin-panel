"use client";
import { useCompany } from "@/context/CompanyId";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import React, { ReactNode, useContext } from "react";

type Props = {
  children: ReactNode;
  params: { companies: string };
};

const Layout = ({ params, children }: Props) => {
  const router = useRouter();
  const path = useSearchParams();
  const id = path.get("id");
  const { setSelectedCompanyId, selectedCompanyId } = useCompany();
  const segment = useSelectedLayoutSegment();
  const { companies } = params;

  // Define base route based on whether it's a home route or specific company route
  const baseRoute = companies ? `/companies/${companies}` : "/companies";

  return (
    <main className="bg-[#fafafa] flex flex-col grow relative w-full h-screen overflow-y-auto">
      <header className="sticky z-20 top-0 shadow-md min-w-full justify-center items-center flex bg-[#ffffff] border-b-[1px] border-[#dadada] min-h-[86px] mb-0">
        <ul className="flex gap-4 flex-wrap  justify-center items-center max-w-5xl">
          {/* Handle click on company name link */}
          <Link
            href={{
              pathname: `${baseRoute}`,
              // query: {
              //   id: `${id}`,
              // },
            }}
            // href={`${baseRoute}`}
            className={`text-[#4E71DA] capitalize transition duration-300 ease-in-out ${
              baseRoute === "/companies" ? "hover:text-[#5b74c0] " : ""
            }`}
          >
            {baseRoute === "/companies" ? "Home" : params.companies}
          </Link>
          <Link
            href={{
              pathname: `${baseRoute}/experience-tracker`,
              // query: {
              //   id: `${id}`,
              // },
            }}
            className={`${
              segment === "experience-tracker"
                ? "bg-gray-300/50 rounded-md px-3 py-2 transition duration-1000 ation-900 ease-in-out"
                : "px-3 py-2"
            }`}
          >
            Experience-Tracker
          </Link>
          <Link
            href={{
              pathname: `${baseRoute}/openings`,
              // query: {
              //   id: `${id}`,
              // },
            }}
            className={`${
              segment === "openings"
                ? "bg-gray-300/50 rounded-md px-3 py-2 transition duration-1000 ease-in-out"
                : "px-3 py-2"
            }`}
          >
            Openings
          </Link>
        </ul>
      </header>
      <main className="block p-3 bg-[#FAFAFA]">{children}</main>
    </main>
  );
};

export default Layout;
