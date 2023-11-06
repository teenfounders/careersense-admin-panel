"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import AppInput from "./AppInput";
import APPButton from "./AppButton";
import downarrow from "@/assets/downarrow.svg";
import cross from "@/assets/corss2.svg";
import forwardarrow from "@/assets/forwardarrow.svg";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import DropdownInput from "./AppDropDown";
import CustomDropdown, { DropdownOption } from "@/components/AppDropDown";
import DateInput from "./AppData";
import AppSearchInput from "./AppSearchInput";
import { useGlobalState } from "@/context/globalstateContainer";
import Logo from "./AddLogo";
// import { useOnboardingContext } from "@/context/OnboardingContext"; // Provide the correct path to your OnboardingProvider file

interface props {
  open: boolean;
  handleModalOpen: () => void;
  // handleMod: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialState = {
  jobtitle: "",
  experience: "",
};

const AppModalExperience: React.FC<props> = ({ open, handleModalOpen }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [name, setName] = useState(initialState);
  const [error, setError] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target) {
      const { name, value } = e.target;

      // Ensure name and value are defined before updating the state
      if (name !== undefined && value !== undefined) {
        setName((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        console.error("Name or value is undefined in the event target.");
      }
    } else {
      console.error("Event target is undefined.");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAnyEmpty = Object.values(name).some((value) => value === "");
    // setLoader(true);

    if (isAnyEmpty) {
      setError(true);
    } else {
      setError(false);
    }
    // handleNextSection();
  };

  const resetForm = () => {
    setName(initialState);
    setError(false);
    // setLoader(false);
  };

  React.useEffect(() => {
    if (open) {
      // Reset the form when the modal is opened
      resetForm();
    }
    if (!isOpen) {
      resetForm();
    }
  }, [open, isOpen]);

  // Call resetForm function when the modal is closed

  return (
    <div className={`w-full relative `}>
      {/* <div className="fixed w-screen overflow-x-hidden overflow-y-hidden h-screen z-[999] bg-black/50  items-center justify-center flex flex-col lg:p-[18.5px]  border-none"> */}
      <div className="flex justify-end absolute right-3">
        <Button onPress={onOpen} className="" color="primary">
          Add Company
        </Button>
      </div>
      <div className="obverflow-x-hidden w-full ">
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody>
                  <AppInput
                    type="text"
                    label=""
                    value={name.jobtitle}
                    name="company"
                    classname="w-full text-sm  h-[40px] "
                    errors={error}
                    onChange={handleInputChange}
                    placeholder="Eg: Google"
                  />
                  <AppInput
                    type="text"
                    label=""
                    value={name.experience}
                    name="careerURl"
                    classname="w-full text-sm  h-[40px]"
                    errors={error}
                    onChange={handleInputChange}
                    placeholder="Career Site URL"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default AppModalExperience;
