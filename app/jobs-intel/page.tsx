"use client";
import APPButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import JobInter from "@/components/JobIntel";
import Modal from "@/components/Modal";
import TipTapEditor from "@/components/TipTapEditor";
import useJobIntel from "@/hooks/useJobIntel";
import { jobintel, jobintelforEditor } from "@/utils/constant";
import {
  Button,
  // Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  job_title: string;
  skills_required: string;
  company_name: string;
  yoe: string;
 
};
type FormData1 = {
  id:number;
  job_title: string;
  skills_required: string;
  company_name: string;
  yoe: string;
  expereindetails:string[]|string;
};
type Props = {};
const JobIntel = (props: Props) => {
  const jobIntelModal = useJobIntel();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      jobIntelModal.onClose();
    }
  };
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [editor2Content, setEditor2Content] = useState("");
const [data, setData] = useState<FormData1|null>(null);
  const {
    register,
    setValue,
    reset,
    trigger,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>();

  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  const onEditorChange2 = (content: string) => {
    console.log("editor2 ", content);
    setEditor2Content(content);
  };
  const handleOpenModal = (id:any)=>{
    console.log(id)
    const data = jobintelforEditor.find((job)=> job.id === id)
 
    console.log(data);
    if (data) {
      setValue("job_title", data.job_title);
      setValue("skills_required", data.skills_required);
      setValue("yoe", data.yoe);
      setValue("company_name", data.company_name);
      setEditor2Content(data.experienceDetails)
      
      // Set other values accordingly
      jobIntelModal.onOpen();
    }


  }
  return (
    <main className="bg-[#fafafa]  flex flex-col grow relative w-full  h-screen overflow-y-auto">
      {/* <header className="sticky z-20 top-0 shadow-md min-w-full bg-white border-b-[1px] border-[#dadada] min-h-[86px]  mb-0"> */}
      <header className="sticky z-20 top-0 shadow-md min-w-full justify-center items-center  flex bg-[#ffffff] border-b-[1px] border-[#dadada] min-h-[86px]  mb-0">
        <ul className="flex flex-wrap  absolute right-4 justify-right items-center max-w-5xl">
          <button
            className="py-2 px-3 bg-blue-600 text-white rounded-xl"
            onClick={jobIntelModal.onOpen}
          >
            Add Job Intel
          </button>
      
          <Modal
            title="Jobs Intel"
            description=""
            isOpen={jobIntelModal.isOpen}
            onChange={onChange}
          >
            <form className=" flex flex-col gap-2">
              <AppInput
                type="text"
                label=""
                id="carrerUrl"
                // defaultValue={companyNamesById.Careers_Page}
                {...register("job_title")}
                classname="w-full text-[15px]  placeholder:text-[15px] h-[40px]"
                placeholder="Job Title"
              />
              <AppInput
                type="text"
                label=""
                id="carrerUrl"
                // defaultValue={companyNamesById.Careers_Page}
                {...register("skills_required")}
                classname="w-full text-[15px]   placeholder:text-[15px] h-[40px]"
                placeholder="Skills Required"
              />
              <div className=" gap-2 grid grid-cols-1 lg:grid-cols-2 flex-row w-full relative">
                <AppInput
                  type="text"
                  label=""
                  id="carrerUrl"
                  // defaultValue={companyNamesById.Careers_Page}
                  {...register("yoe")}
                  classname=" w-full  text-[15px] col-span-1  placeholder:text-[15px] h-[40px]"
                  placeholder="YOE"
                />
                <AppInput
                  type="text"
                  label=""
                  id="carrerUrl"
                  // defaultValue={companyNamesById.Careers_Page}
                  {...register("company_name")}
                  classname="w-full text-[15px] col-span-1 placeholder:text-[15px] h-[40px]"
                  placeholder="Company Name"
                />
              </div>
              <TipTapEditor editorcontent={editor2Content} onEditorContentChange={onEditorChange2} />
              <div className="w-full flex items-center justify-end">
                <APPButton
                  classname="flex items-center w-20 my-4  justify-center capitalize rounded-xl bg-blue-600 text-white"
                  type="submit"
                  text={"Save"}
                  forwardimage
                />
              </div>
            </form>
          </Modal>
          {/* </ModalBody>
                  <ModalFooter> */}
          {/* </ModalFooter> */}
          {/* </> */}

          {/* </ModalContent>
          </Modal> */}
        </ul>
      </header>
      <main className="block  ">
        <div className="my-5 mx-auto w-full max-xl:px-10 max-w-5xl">
          <div className="mb-4 w-full"></div>
          <div className="p-4 mb-4  bg-white mx-5 shadow-md border-[1px] border-[#dadada]  rounded-md overflow-hidden">
            <div className="mb-4 gap-5 flex flex-col max-lg:mr-20 max-xl:max-w-[920px] px-5 w-full">

              {jobintel.map((job, index) => (
                <div className="" key={index} onClick={()=>handleOpenModal(job.id)}>

                <JobInter  {...job} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </main>
  );
};

export default JobIntel;
