// "use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Providers } from "@/components/Provider";
const inter = Inter({ subsets: ["latin"] });

import { NextUIProvider } from "@nextui-org/react";
import MenuContextProvider from "@/context/MenuContext";
import Sidebar from "@/components/Sidebar";
import MainHeader from "@/components/MainHeader";
import { CompanyProvider } from "@/context/CompanyId";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <QueryClientProvider client={queryClient}> */}
        <Providers>
          <CompanyProvider>
            <MenuContextProvider>
              <div className="flex  relative overflow-hidden ">
                <Sidebar />

                <div className=" relative flex-col lg:ml-[280px] flex flex-1 w-full xl:ml-18  ">
                  {/* <div className="lg:hidden">
                  <MainHeader />
                </div> */}
                  <div className="relative">{children}</div>
                </div>
              </div>
            </MenuContextProvider>
          </CompanyProvider>
        </Providers>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
