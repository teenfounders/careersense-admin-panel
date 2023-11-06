"use client";
import { useCompany } from "@/context/CompanyId";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

type Props = {};

const Openings = (props: Props) => {
  const { selectedCompanyId } = useCompany();
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  return (
    <div className="h-full flex gap-2 flex-col relaitve ">
      <div className="flex justify-end pt-3 ">
        <Button onPress={onOpen} className="" color="primary">
          Add openings
        </Button>
      </div>
      <div className="my-5 mx-auto w-full  max-w-5xl  bg-[#FFFFFF] min-h-[363px] p-3 border-[1px]  shadow-sm border-[#D7D7D7]  ">
        {/* <div className="max-w-full  bg-[#FFFFFF] min-h-[363px] p-3 border-[1px]  shadow-sm border-[#D7D7D7]  "> */}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button type="submit" color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Openings;
