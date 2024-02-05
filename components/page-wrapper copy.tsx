import React from 'react';
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const ComponentsPageWrapper:React.FC<Props> = ({ children }) => {
    return (
        <div className="mx-auto w-full font-phudu my-10  max-w-[920px] xl:max-w-5xl lg:p-0  text-center">
        <div className="w-full flex flex-col gap-4 px-5">
              {children}
          </div>
          </div>
    )
}
