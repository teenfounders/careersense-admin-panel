"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import AppInput from "./AppInput";
import APPButton from "./AppButton";
import downarrow from "@/assets/downarrow.svg";
import cross from "@/assets/corss2.svg";
import forwardarrow from "@/assets/forwardarrow.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
// import ImageUpload from "@/components/uploadImage";
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
import axios from "axios";
import { Processor } from "postcss";
import uploadFileToImageKit, { ImagekitResType } from "@/utils/imagekit";
// import { useOnboardingContext } from "@/context/OnboardingContext"; // Provide the correct path to your OnboardingProvider file

type FormData = {
  company: string;
  oneliner: string;
  careerURl: string;
  website: string;
  atsurl: string;
  linkdin: string;
  companylogo: string;
};
interface props {
  open: boolean;
  handleModalOpen: () => void;
  // handleMod: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialState = {
  company: "",
  oneliner: "",
  careerURl: "",
  website: "",
  atsurl: "",
  linkdin: "",
};
const publicKey = "public_JiAIs/vzR3BcOkQssCMuQjZ2r8w=";
const urlEndpoint = "https://ik.imagekit.io/5npsdc2r7";
const authenticationEndpoint = "http://localhost:3000/api/upload";

const AppModal: React.FC<props> = ({ open, handleModalOpen }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    setValue,

    trigger,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>();
  const handleCompanyBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleBlur("company"); // Trigger validation for "company" field
    // Your additional onBlur logic for company field goes here
  };
  const handleBlur = async (fieldName: keyof FormData) => {
    // Trigger validation for the specified field
    await trigger(fieldName);
  };

  const [name, setName] = useState({
    company: "",
    oneliner: "",
    careerURl: "",
    website: "",
    atsurl: "",
    linkdin: "",
    companylogo: "",
  });
  const [error, setError] = useState(false);

  const [logoName, setLogoName] = useState<string[]>([]);

  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<ImagekitResType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];

  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     try {
  //       const response = await axios.post<{ imageUrl: string }>(
  //         "/api/auth",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       const imageUrl = response.data.imageUrl;
  //       console.log("Image uploaded successfully:", imageUrl);
  //       // Use the imageUrl as needed in your application
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       // Handle the error, show a message to the user, etc.
  //     }
  //   }
  // };

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

  const onSubmit = handleSubmit((data) => {
    // Perform form submission logic here
    setLoading(true);

    const additionalContent = {
      Company_Name: data.company,
      Careers_Page: data.careerURl,
      Website: data.website,
      Careers_Page_ATS: data.atsurl,
      Tagline: data.oneliner,
      Company_LinkedIn: data.linkdin,
      Company_Logo: uploadedImage?.url,
    };
    // Make a POST request to your API endpoint with the formData
    axios
      .post(`/api/companies`, additionalContent)
      .then((response) => {
        console.log("POST Response:", response);
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
    if (loading == false) {
      onClose();
    }
  });
  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      try {
        // Assume uploadedImage contains the API response
        const uploadedImage = await uploadFileToImageKit({
          file,
          folder: "Company_Logo",
          uploadUrl: process.env.IMAGEKIT_API_UPLOAD_URL!, // Pass the ImageKit upload URL here
        });

        // Construct the full image URL
        // const imageUrl = `${uploadedImage.urlEndpoint}/${uploadedImage.folder}/${file.name}`;

        // console.log("Image uploaded successfully. Image URL:", imageUrl);
        console.log("this is actual url", uploadedImage);
        setUploadedImage(uploadedImage);
        // Handle the imageUrl as needed in your application
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle the error, show a message to the user, etc.
      }
    }
  };

  const resetForm = () => {
    setName({
      company: "",
      oneliner: "",
      careerURl: "",
      website: "",
      atsurl: "",
      linkdin: "",
      companylogo: "",
    });
    setError(false);
    // setLoader(false);
    // setUploadedImages('');
    setSelectedLogo(null);
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
    <div className={``}>
      {/* <div className="fixed w-screen overflow-x-hidden overflow-y-hidden h-screen z-[999] bg-black/50  items-center justify-center flex flex-col lg:p-[18.5px]  border-none"> */}
      <div className="obverflow-x-hidden ">
        <Button onPress={onOpen} color="primary">
          Add Company
        </Button>
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
                  {/* <AppInput
                    type="text"
                    label="job title"
                    id="jobtitle"
                    // value={name.jobtitle}
                    // name="jobtitle"
                    classname="w-full text-sm  h-[40px] "
                    errors={error}
                    {...register("jobtitle")}
                    // onChange={handleInputChange}
                    placeholder="Eg: Google"
                  /> */}
                  <form onSubmit={onSubmit}>
                    <div className="flex flex-col w-full ">
                      <div className="flex flex-col gap-3">
                        <AppInput
                          type="text"
                          label="comapny"
                          id="company"
                          className={`w-full text-sm h-[40px] placeholder:text-sm border rounded-md px-3 py-1 border-black
  ${
    errors.company &&
    errors.company.type === "required" &&
    touchedFields.company!
      ? "border-red-700 border-2"
      : "border-gray-300"
  }
  `}
                          {...register("company", {
                            required: "Company name is required",
                          })}
                          placeholder="Eg: Google"
                        />
                        <AppInput
                          type="text"
                          label=""
                          id="carrerUrl"
                          {...register("careerURl")}
                          classname="w-full text-sm  placeholder:text-sm h-[40px]"
                          errors={error}
                          placeholder="Career Site URL"
                        />
                        <AppInput
                          type="text"
                          label=""
                          id="website"
                          {...register("website")}
                          classname="w-full text-sm  placeholder:text-sm h-[40px]"
                          errors={error}
                          placeholder="Website"
                        />
                        <AppInput
                          type="text"
                          label=""
                          id="atsurl"
                          {...register("atsurl")}
                          classname="w-full py-1 text-sm placeholder:text-sm  h-[40px]"
                          errors={error}
                          placeholder="Ats URL"
                        />
                        <AppInput
                          type="text"
                          label=""
                          id="oneliner"
                          {...register("oneliner")}
                          classname="w-full py-1 text-sm placeholder:text-sm  h-[40px]"
                          errors={error}
                          onChange={handleInputChange}
                          placeholder="One Liner"
                        />

                        <AppInput
                          type="text"
                          label=""
                          id="linkdin"
                          {...register("linkdin")}
                          classname="w-full py-1 text-sm placeholder:text-sm  h-[40px]"
                          errors={error}
                          onChange={handleInputChange}
                          placeholder="Linkdin"
                        />

                        {/* <div className="flex w-full items-center gap-10">
                          <label className="px-3 flex gap-1 py-2 text-[12.5px] text-[#666666] font-medium bg-transparent border-[1px] border-gray-300 rounded-md   cursor-pointer">
                            <span>Add</span>
                            <span>Logo</span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".jpg, .jpeg, .png"
                              {...register("companylogo")}
                            />
                            {errors.companylogo && (
                              <span className="text-red-500">
                                {errors.companylogo.message}
                              </span>
                            )}
                          </label>
                          <div className="flex w-full flex-col">
                            {uploadedImage && (
                              <div className="flex gap-3 justify-between w-full items-center">
                                <span className="text-[12.5px] w-full overflow-x-hidden">
                                  {uploadedImage.name.length >= 20
                                    ? `${uploadedImage.name.slice(
                                        0,
                                        20
                                      )}...${uploadedImage.name.slice(-10)}`
                                    : uploadedImage.name}
                                </span>
                                <button
                                  className="text-red-500 text-[12.5px]"
                                  onClick={() => setUploadedImage(null)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div> */}
                        <div className="flex w-full items-center gap-10">
                          <label className="px-3 flex gap-1 py-2 text-[12.5px] text-[#666666] font-medium bg-transparent border-[1px] border-gray-300 rounded-md cursor-pointer">
                            <span>Add</span>
                            <span>Logo</span>
                            <input
                              type="file"
                              onChange={uploadAvatar}
                              className="hidden"
                              required
                              accept=".jpg, .jpeg, .png"
                            />
                          </label>
                          {uploadedImage && (
                            <div className="flex gap-3 justify-between w-full items-center">
                              <span className="text-[12.5px] w-full overflow-x-hidden">
                                {/* {uploadedImage.url} */}
                                {uploadedImage.url &&
                                  (uploadedImage.url.length >= 0
                                    ? `${uploadedImage.url.slice(
                                        0,
                                        14
                                      )}...${uploadedImage.name.slice(-10)}`
                                    : uploadedImage.name)}
                              </span>
                              <button
                                className="text-red-500 text-[12.5px]"
                                onClick={() => setUploadedImage(null)}
                              >
                                Delete
                              </button>
                            </div>
                          )}

                          {errors.companylogo && (
                            <span className="text-red-500">
                              {errors.companylogo.message}
                            </span>
                          )}
                        </div>
                        <div className="w-full flex -mb-8 justify-end">
                          <APPButton
                            classname="flex items-center w-20  justify-center capitalize rounded-xl bg-blue-600 text-white"
                            type="submit"
                            text={"Save"}
                            loading={loading}
                            forwardimage
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default AppModal;
