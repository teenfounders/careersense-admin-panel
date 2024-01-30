"use client";
import APPButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import TipTapEditor from "@/components/TipTapEditor";
import {
  Button,
  Modal,
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
  atsurl: string;
  linkdin: string;
  companylogo: string;
  Logo: string;
};
type Props = {};
const JobIntel = (props: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [editor2Content, setEditor2Content] = useState("");

  const {
    register,
    setValue,
    reset,
    trigger,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>();

  const [scrollBehavior, setScrollBehavior] = React.useState<
  ModalProps["scrollBehavior"]
>("inside");
  const onEditorChange2 = (content: string) => {
    // console.log("editor2 ", content);
    setEditor2Content(content);
  };
  return (
    <main className="bg-[#fafafa]  flex flex-col grow relative w-full  h-screen overflow-y-auto">
      {/* <header className="sticky z-20 top-0 shadow-md min-w-full bg-white border-b-[1px] border-[#dadada] min-h-[86px]  mb-0"> */}
      <header className="sticky z-20 top-0 shadow-md min-w-full justify-center items-center  flex bg-[#ffffff] border-b-[1px] border-[#dadada] min-h-[86px]  mb-0">
        <ul className="flex flex-wrap  absolute right-4 justify-right items-center max-w-5xl">
          {/* <Link href={"/social-proofs/new-proof"}>
            {" "}
            <APPButton
              types={"button"}
              classname="px-10"
              text={"New Proof"}
            />{" "}
          </Link> */}
          <Button onPress={onOpen} color="primary">
            Add
          </Button>

          <Modal isOpen={isOpen}    scrollBehavior={scrollBehavior} size={"3xl"} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Jobs Intel
                  </ModalHeader>
                  <ModalBody>
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
                    <div className="flex gap-2 flex-row w-full relative">
                      <AppInput
                        type="text"
                        label=""
                        id="carrerUrl"
                        // defaultValue={companyNamesById.Careers_Page}
                        {...register("yoe")}
                        classname=" w-full  text-[15px]  placeholder:text-[15px] h-[40px]"
                        placeholder="YOE"
                      />
                      <AppInput
                        type="text"
                        label=""
                        id="carrerUrl"
                        // defaultValue={companyNamesById.Careers_Page}
                        {...register("company_name")}
                        classname="w-full text-[15px]  placeholder:text-[15px] h-[40px]"
                        placeholder="Company Name"
                      />
                    </div>
                    <TipTapEditor onEditorContentChange={onEditorChange2} />
                  </ModalBody>
                  <ModalFooter>
                    <APPButton
                      classname="flex items-center w-20  justify-center capitalize rounded-xl bg-blue-600 text-white"
                      type="submit"
                      text={"Save"}
                      forwardimage
                    />
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </ul>
      </header>
      <main className="block  ">
        <div className="my-5 mx-auto w-full max-xl:px-10 max-w-5xl">
          <div className="mb-4 w-full"></div>
          <div className="p-4 mb-4  bg-white shadow-md border-[1px] border-[#dadada]  rounded-md overflow-hidden"></div>
        </div>
      </main>
    </main>
  );
};

export default JobIntel;
