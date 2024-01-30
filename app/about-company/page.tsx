import APPButton from '@/components/AppButton'
import React from 'react'

type Props = {}

const AboutComapny = (props: Props) => {
  return (
    <main className="bg-[#fafafa] flex flex-col grow relative w-full  h-screen overflow-y-auto">
    {/* <header className="sticky z-20 top-0 shadow-md min-w-full bg-white border-b-[1px] border-[#dadada] min-h-[86px]  mb-0"> */}
    <header className="sticky z-20 top-0 shadow-md min-w-full justify-center items-center  flex bg-[#ffffff] border-b-[1px] border-[#dadada] min-h-[86px]  mb-0">
      <ul className="flex flex-wrap justify-center items-center max-w-5xl">
        <APPButton type={"button"} classname="px-10" text={"Add"} />{" "}
      </ul>
    </header>
    <main className="block  ">
      <div className="my-5 mx-auto w-full  max-w-5xl">
      
         
      </div>
    </main>
  </main>
  )
}

export default AboutComapny