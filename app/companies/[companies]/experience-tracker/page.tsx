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
import loader from "@/assets/loder.svg";
import toast, { Toaster } from "react-hot-toast";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ExperienceModal from "@/components/ExperienceModal";
// import { fetchCompanyData } from "@/lib/action";
type Inputs = {
  role: string;
  experience: string;
};

type Props = {};

interface updateformdataexperience {
  _id?: string;
  role?: string;
  experience?: string; // Assuming campusPartner corresponds to experience
  url?: string;
}
const initialState = {
  role: "",
  experience: "",
};
const ExperienceTracker = (props: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [getEditId, setGetEditId] = useState("");
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [experienceTracker, setExperiencTracker] = useState<
    IExperiencetrackerProps
  >();
  const {
    setSelectedCompanyId,
    selectedCompanyId,
    setselectedExperienceId,
  } = useCompany();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedCard, setSelectedCard] = useState<IExperiencetrackerProps>();
  // const id = searchParams.get("id");
  const [name, setName] = useState(initialState);
  const [error, setError] = useState(false);
  const [deleteExp, setDeleteExp] = useState<string | "">("");
  const [loading, setLoading] = useState(false);
  const pat = useParams();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = async (data, events) => {
  //   console.log("Form Data:", data);
  //   console.log(watch());
  // };

  const handleEditExperience = (experience: IExperiencetrackerProps) => {
    setGetEditId(experience._id);
    setselectedExperienceId(experience._id);
    // setSelectedCard(experience);

    // setModalMode("edit");
    // setName({
    //   role: experience.role,
    //   experience: experience.experience,
    // });
    // onOpen();
    setOpenEditor((prev) => !prev);

    // Open the modal
  };
  const handleDelete = (experience: IExperiencetrackerProps) => {
    setDeleteExp(experience._id);
    if (confirm("Are you sure you want to delete this experience?")) {
      deleteCompanyMutation.mutate();
    }
  };

  const deleteCompanyMutation = useMutation({
    mutationFn: () =>
      axios.delete(
        `/api/companies/${selectedCompanyId}/experience-tracker/${deleteExp}`
      ),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["experiencecompany"] }),
    onSuccess: () => {
      toast.success("deleted successfully");

      // Invalidate and refetch the query to update the list
      setDeleteExp("");
      // Redirect to the home page
    },
    onError: (error) => {
      console.error("Error deleting company:", error);
      toast.error("Error deleting company");
    },
  });
  const resetForm = () => {
    setName({ role: "", experience: "" });
    setError(false);
    // setLoader(false);
  };

  const handleEditSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data);
    // console.log(data);
    // setLoading(true);
    // try {
    //   const formData = {
    //     _id: getEditId, // Replace this with the actual companyId value
    //     role: data.role,
    //     experience: data.experience, // Assuming campusPartner corresponds to experience
    //     // Replace this with the actual URL value
    //   };
    //   updateExpereinceTracker.mutate(formData);
    //   setLoading(false);
    //   // Make a PATCH request to update the existing experience
    // } catch (error) {
    //   console.error("Error updating experience:", error);
    //   // Handle error state or display error message to the user
    // }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data, events) => {
    events?.preventDefault();
    setLoading(true);
    const {
      role,
      experience,

      // editor1Content,
      // editor2Content,
    } = data;
    // console.log(role);
    // console.log(experience);

    try {
      const formData = {
        companyId: selectedCompanyId,
        role: role,
        experience: experience, // Assuming campusPartner corresponds to experience
        url: "https://www.google.com/", // Replace this with the actual URL value
      };
      // console.log(formData);
      // console.log(formData);
      setLoading(true);
      // createExpereinceTracker.mutate(formData);
      toast.success("Successfully created!");
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error state or display error message to the user
    }
  };
  const fetchExperienceTracker = async () => {
    const response = await axios.get(
      `/api/companies/${selectedCompanyId}/experience-tracker`
    );
    // console.log(response.data);
    return response.data;
  };
  const {
    data: experienceCompanyByid,
    refetch: refetchexperienceCompanyByid,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["experiencecompany"],
    queryFn: fetchExperienceTracker,
    // enabled: false,
  });
  // console.log(experienceCompanyByid);

  // React.useEffect(() => {
  //   const fetchCompanyData = async () => {
  //     if (selectedCompanyId === null) {
  //       router.push("/companies");
  //     }
  //     try {
  //       const response = await axios(
  //         `/api/companies/${selectedCompanyId}/experience-tracker`
  //       );
  //       const data = response.data; // Assuming the API response is an object containing the company data
  //       setExperiencTracker(data);
  //     } catch (error) {
  //       console.error("Error fetching company data:", error);
  //     }
  //   };

  //   fetchCompanyData();
  // }, [id, selectedCompanyId, router]);
  const updateExpereinceTracker = useMutation({
    mutationFn: (formData: updateformdataexperience) =>
      axios.patch(
        `/api/companies/${selectedCompanyId}/experience-tracker`,
        formData
      ),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["experiencecompany"] }),
  });
  const createExpereinceTracker = useMutation({
    mutationFn: (formData: Inputs) =>
      axios.post(
        `/api/companies/${selectedCompanyId}/experience-tracker`,
        formData
      ),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["experiencecompany"] }),
  });
  React.useEffect(() => {
    // if (isOpen) {
    // }
    // if (!isOpen) {
    //   reset();
    // }
  // }, [onOpenChange, isOpen]);
  }, []);

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
          {isLoading ? (
            <div className="w-full mx-auto col-span-3 flex gap-3 justify-center my-10">
              <Image
                src={loader}
                alt="loader"
                className="animate-spin invert"
              />
              Loading...
            </div>
          ) : isError ? (
            <div className="w-full mx-auto col-span-3 flex gap-3 justify-center my-10">
              <Image
                src={loader}
                alt="loader"
                className="animate-spin invert"
              />
              Something went wrong...
            </div>
          ) : experienceCompanyByid ? (
            experienceCompanyByid.map((experience: any, idx: any) => (
              <div key={experience._id}>
                <AppExpereinceCard
                  _id={experience._id}
                  deleteExperience={() => handleDelete(experience)}
                  role={experience.role}
                  experience={experience.experience}
                  edit={() => handleEditExperience(experience)} // Pass the experience data
                />
              </div>
            ))
          ) : (
            <div className="w-full mx-auto col-span-3 flex gap-3 justify-center my-10">
              No Data available.
            </div>
          )}
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
                {/* {modalMode === "add" ? ( */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex relative  flex-col gap-3"
                >
                  <AppInput
                    type={"text"}
                    label={""}
                    {...register("role")}
                    classname="w-full text-sm placeholder:text-sm h-[40px] "
                    placeholder="Role"
                  />
                  <AppInput
                    type={"text"}
                    label={""}
                    {...register("experience")}
                    classname="w-full text-sm placeholder:text-sm h-[40px] "
                    placeholder="Experience"
                  />
                  <div className="w-full flex justify-end">
                    <APPButton
                      classname="flex items-center w-20 justify-center capitalize rounded-xl bg-blue-600 text-white"
                      type="submit"
                      text={"Save"}
                      loading={loading}
                      forwardimage
                    />
                  </div>
                </form>
                {/* ) : ( */}
                {/* <form
                    className="flex relative  flex-col gap-3"
                    onSubmit={handleSubmit(handleEditSubmit)}
                  >
                    <AppInput
                      type={"text"}
                      label={""}
                      // value={}

                      {...register("role")}
                      classname="w-full text-sm placeholder:text-sm h-[40px] "
                      placeholder="edit role"
                    />
                    <AppInput
                      type={"text"}
                      label={""}
                      {...register("experience")}
                      classname="w-full text-sm placeholder:text-sm h-[40px] "
                      placeholder="edit experience"
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
                  </form> */}
                {/* )} */}
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
      <div className="">
        {openEditor && (
          <ExperienceModal
            onclose={setOpenEditor}
            refetchexperienceCompanyByid={refetchexperienceCompanyByid}
            Open={openEditor}
          />
        )}
      </div>
    </div>
  );
};

export default ExperienceTracker;
