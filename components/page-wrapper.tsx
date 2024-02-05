import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex  w-full  flex-col py-[60px]  sm:py-[60px] sm:px-[30px] 2xl:px-[4rem] 2xl:py-[60px] space-y-2  flex-grow pb-4">
      {children}
    </div>
  );
}