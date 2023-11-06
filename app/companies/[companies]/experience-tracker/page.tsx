"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AppInput from "@/components/AppInput";

import { useForm, SubmitHandler } from "react-hook-form";
type editProps = {
  _id?: string;
  title?: string;
  experience?: string;
};
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
import AppExpereinceCard from "@/components/AppExpereinceCard";
import { useParams, useSearchParams } from "next/navigation";
import APPButton from "@/components/AppButton";
import axios from "axios";
import { IExperiencetrackerProps } from "@/utils/types";
import { useCompany } from "@/context/CompanyId";
import { useRouter } from "next/navigation";
// import { fetchCompanyData } from "@/lib/action";
type Inputs = {
  role: string;
  experience: string;
};

type Props = {};
const initialState = {
  role: "",
  experience: "",
};
const ExperienceTracker = (props: Props) => {
  const router = useRouter();
  const [getEditId, setGetEditId] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [experienceTracker, setExperiencTracker] = useState<
    IExperiencetrackerProps
  >();
  const { setSelectedCompanyId, selectedCompanyId } = useCompany();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedCard, setSelectedCard] = useState<IExperiencetrackerProps>();
  const id = searchParams.get("id");
  const [name, setName] = useState(initialState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const pat = useParams();

  const handleEditExperience = (experience: IExperiencetrackerProps) => {
    setGetEditId(experience._id);
    setSelectedCard(experience);
    setModalMode("edit");
    setName({
      role: experience.role,
      experience: experience.experience,
    });
    onOpen();

    // Open the modal
  };

  const resetForm = () => {
    setName({ role: "", experience: "" });
    setError(false);
    // setLoader(false);
  };
  const handleEditSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data);
    try {
      const formData = {
        _id: getEditId, // Replace this with the actual companyId value
        role: data.role,
        experience: data.experience, // Assuming campusPartner corresponds to experience
        // Replace this with the actual URL value
      };

      setLoading(true);

      // Make a PATCH request to update the existing experience
      axios
        .patch(
          `/api/companies/${selectedCompanyId}/experience-tracker`,
          formData
        )
        .then((response) => {
          console.log(response);
          // Handle the response accordingly, update local state if needed
        })
        .catch((error) => {
          console.error("Error updating experience:", error);
          // Handle error state or display error message to the user
        })
        .finally(() => {
          setLoading(false); // Set loading state to false regardless of success or failure
          onClose(); // Close the modal after successful submission
        });
    } catch (error) {
      console.error("Error updating experience:", error);
      // Handle error state or display error message to the user
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      const formData = {
        companyId: id, // Replace this with the actual companyId value
        role: data.role,
        experience: data.experience, // Assuming campusPartner corresponds to experience
        url: "https://www.google.com/", // Replace this with the actual URL value
      };

      setLoading(true);
      // Make a POST request to your API endpoint with the formData
      axios
        .post(
          `/api/companies/${selectedCompanyId}/experience-tracker`,
          formData
        )
        .then((response) => {
          onClose(); // Close the modal after successful submission
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          // Handle error state or display error message to the user
        });

      // Assuming the API response contains the updated experience tracker data
      // Update your local state or re-fetch the experience tracker data to reflect the changes
      // Example: setExperiencTracker(response.data);

      // Close the modal after successful submission
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error state or display error message to the user
    }
  };

  React.useEffect(() => {
    const fetchCompanyData = async () => {
      if (selectedCompanyId === null) {
        router.push("/companies");
      }
      try {
        const response = await axios(
          `/api/companies/${selectedCompanyId}/experience-tracker`
        );
        const data = response.data; // Assuming the API response is an object containing the company data
        setExperiencTracker(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [id, selectedCompanyId, router]);

  React.useEffect(() => {
    if (isOpen) {
      resetForm();
    }
    if (!isOpen) {
      resetForm();
    }
  }, [onOpenChange, isOpen]);

  //     resetForm();
  //   }
  // }, [isOpen]);
  return (
    <div className="h-full flex gap-2 flex-col relaitve ">
      <div className="flex justify-end pt-3 ">
        <Button onPress={onOpen} className="" color="primary">
          Add Experience
        </Button>
      </div>
      <div className="my-5 mx-auto w-full  max-w-5xl  bg-[#FFFFFF] min-h-[363px] p-3 border-[1px]  shadow-sm border-[#D7D7D7]  ">
        {/* <div className="max-w-full  bg-[#FFFFFF] min-h-[363px] p-3 border-[1px]  shadow-sm border-[#D7D7D7]  "> */}
        <div className=" mx-auto   w-full   grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-auto gap-1 justify-stretch items-stretch   ">
          {experienceTracker &&
            experienceTracker.map((experience, idx) => (
              <div key={idx}>
                <AppExpereinceCard
                  title={experience.role}
                  experience={experience.experience}
                  edit={() => handleEditExperience(experience)} // Pass the experience data
                />
              </div>
            ))}
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalMode === "add" ? "Add Experience" : "Edit Experience"}
              </ModalHeader>
              <ModalBody>
                {modalMode === "add" ? (
                  <form
                    className="flex relative  flex-col gap-3"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <AppInput
                      type="text"
                      label="role"
                      id="role"
                      // value={name.jobtitle}
                      // name="jobtitle"
                      classname="w-full text-sm  h-[40px] "
                      errors={error}
                      defaultValue={name.role}
                      {...register("role")}
                      // onChange={handleInputChange}
                      placeholder="Job/Internship Title"
                    />
                    <AppInput
                      type="text"
                      label=""
                      id="experience"
                      // value={name.experience}
                      classname="w-full text-sm  h-[40px]"
                      errors={error}
                      defaultValue={name.experience}
                      {...register("experience")}
                      // onChange={handleInputChange}
                      placeholder="Experience Required"
                    />
                    <div
                      className="w-full flex justify-end"
                      onClick={() => onClose()}
                    >
                      <APPButton
                        classname="flex items-center w-20  justify-center capitalize rounded-xl bg-blue-600 text-white"
                        type="submit"
                        text={"Save"}
                        loading={loading}
                        forwardimage
                      />
                    </div>
                  </form>
                ) : (
                  <form
                    className="flex relative  flex-col gap-3"
                    onSubmit={handleSubmit(handleEditSubmit)}
                  >
                    <AppInput
                      type="text"
                      label="role"
                      id="role"
                      // value={name.jobtitle}
                      // name="jobtitle"
                      classname="w-full text-sm  h-[40px] "
                      errors={error}
                      defaultValue={name.role}
                      {...register("role")}
                      // onChange={handleInputChange}
                      placeholder="Job/Internship Title"
                    />
                    <AppInput
                      type="text"
                      label=""
                      id="experience"
                      // value={name.experience}
                      classname="w-full text-sm  h-[40px]"
                      errors={error}
                      defaultValue={name.experience}
                      {...register("experience")}
                      // onChange={handleInputChange}
                      placeholder="Experience Required"
                    />
                    <div
                      className="w-full flex justify-end"
                      onClick={() => onClose()}
                    >
                      <APPButton
                        classname="flex items-center w-20  justify-center capitalize rounded-xl bg-blue-600 text-white"
                        type="submit"
                        text={"Save"}
                        loading={loading}
                        forwardimage
                      />
                    </div>
                  </form>
                )}
              </ModalBody>
              {/* <ModalFooter>
                <Button type="submit" color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ExperienceTracker;
