"use client";
import APPButton from "@/components/AppButton";
import AppSearchLeftInput from "@/components/AppSearchLeftInput";
import { dummyItems } from "@/components/Sidebar";
import { jobcardContent } from "@/utils/postdata";
import Link from "next/link";
import { fetchSocialProofById } from "@/lib/action";
import React, {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import uploadFileToImageKit, { ImagekitResType } from "@/utils/imagekit";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import TipTapEditor from "@/components/TipTapEditor";
import AppInput from "@/components/AppInput";
import AppTextarea from "@/components/AppTextarea";

import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IoConstructOutline } from "react-icons/io5";
import axios, { AxiosResponse } from "axios";
import { fetchSocialProof } from "@/lib/action";
import loader from "@/assets/loder.svg";
import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { useSocialProof } from "@/context/SocialProof";
import router from "next/router";
import { socialproof } from "@/models/social-proof";
import { FaClosedCaptioning } from "react-icons/fa";
import { useCompany } from "@/context/CompanyId";

interface createExperience {
  _id?: string;
  Open: boolean;
  onclose: React.Dispatch<React.SetStateAction<boolean>>;
  refetchexperienceCompanyByid: () => void;
}
type Inputs = {
  role: string;

  experience: string;
};
interface updateformdataexperience {
  _id?: string;
  role: string;
  experience: string; // Assuming campusPartner corresponds to experience
  url?: string;
}

const ExperienceModal: React.FC<createExperience> = ({
  onclose,
  refetchexperienceCompanyByid,
  Open,
  _id,
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const {
    setSelectedCompanyId,
    selectedCompanyId,
    selectedExperienceId,
    setselectedExperienceId,
  } = useCompany();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [experience, setExperience] = useState<updateformdataexperience | null>(
    null
  );
  const queryClient = useQueryClient();

  // const [uploadedImages, setUploadedImages] = useState<Array<File>| string>([]);

  const fetchexperience = async (selectedExperience: any) => {
    const response = await axios.get(
      `/api/companies/${selectedCompanyId}/experience-tracker/${selectedExperienceId}`
    );
    setExperience(response.data);
    if (response) {
      // console.log(response);
      const { role, experience } = response.data;
      // console.log(role);
      let formdata = {
        role: role,
        experience: experience,
      };

      // console.log(formdata);
      reset(formdata);
    }
    return response.data; // Assuming the data you want is in response.data
  };

  const {
    data: expericenTrackerData,
    refetch: refetchExperienceTracker,
    isLoading: loadingsocial,
    isError: socialError,
  } = useQuery({
    queryKey: ["experienceId", selectedExperienceId], // Pass the selectedSocialProofId as part of the query key
    queryFn: () => fetchexperience(_id),
    enabled: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({});

  const onSubmit = async (data: any) => {
    // Combine the main comment and additional comments into a single array
    // console.log(data);
    try {
      const formData = {
        // Replace this with the actual companyId value
        _id: experience?._id,
        role: data.role,
        experience: data.experience,
        // Assuming campusPartner corresponds to experience
        // Replace this with the actual URL value
      };
      updateExpereinceTracker.mutate(formData);

      setExperience(null);
      onclose((prev) => prev === true && false);
      onClose();
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
    }
  };

  //   const handlemodalstate = () => {
  //     setSocialProofId(undefined);
  //     setOpenEditModal((prev) => prev === true && false);
  //     console.log(openEditModal);
  //   };
  // const UpdateSocialProof = useMutation({
  //   mutationFn: (FormData: updateSocialProof) =>
  //     axios.patch(`/api/social-proof/${selectedSocialProofId}`, FormData),
  //   onSettled: () =>
  //     queryClient.invalidateQueries({ queryKey: ["socialProof"] }),
  // });
  const updateExpereinceTracker = useMutation({
    mutationFn: (formData: updateformdataexperience) =>
      axios.patch(
        `/api/companies/${selectedCompanyId}/experience-tracker/${selectedExperienceId}`,
        formData
      ),
    onSuccess: () => refetchexperienceCompanyByid(),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["experiencecompany"] }),
  });
  const handlemodalstate = () => {
    setselectedExperienceId(null);
    onclose((prev) => prev === true && false);
  };
  useEffect(() => {
    if (Open) {
      onOpen();

      refetchExperienceTracker();
      setExperience(null);
      // Trigger data fetching when modal is opened
    } else {
      onClose();
    }
  }, [Open, onOpen, onClose, refetchExperienceTracker]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        size={"md"}
        onClose={handlemodalstate}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit modal
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-[10px]  ">
                    {loadingsocial ? (
                      // Render a loading state here, e.g., a spinner or message
                      <div>Loading...</div>
                    ) : (
                      <>
                        {" "}
                        <AppInput
                          type={"text"}
                          // defaultValue={socialProofData?.AddTags}
                          label={""}
                          {...register("role")}
                          classname="w-full text-sm placeholder:text-sm h-[40px] "
                          placeholder="Add tags"
                        />
                        <AppInput
                          type={"text"}
                          // defaultValue={socialProofData?.AddTags}
                          label={""}
                          {...register("experience")}
                          classname="w-full text-sm placeholder:text-sm h-[40px] "
                          placeholder="Add tags"
                        />
                      </>
                    )}
                  </div>

                  <div className="w-full  sticky -bottom-2 h-full min-w-full bg-white pt-5 py-2 z-50 flex flex-col justify-end">
                    <div className=" flex w-full justify-end items-end">
                      <APPButton
                        classname="flex items-center w-20  justify-center capitalize rounded-xl bg-blue-600 text-white"
                        type="submit"
                        text={"Save"}
                        loading={loadingsocial}
                        forwardimage
                      />
                    </div>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ExperienceModal;
