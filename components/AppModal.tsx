"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import AppInput from "./AppInput";
import APPButton from "./AppButton";
import toast from "react-hot-toast";
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

import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import uploadFileToImageKit, { ImagekitResType } from "@/utils/imagekit";
import { useCompany } from "@/context/CompanyId";
// import { useOnboardingContext } from "@/context/OnboardingContext"; // Provide the correct path to your OnboardingProvider file

type FormData = {
  company?: string;
  oneliner?: string;
  careerURl?: string;
  website: string;
  atsurl?: string;
  linkdin: string;
  companylogo?: string;
  Logo?: string;
};
interface postCompanyInterface {
  Company_Name?: string;
  Careers_Page?: string;
  Website?: string;
  Careers_Page_ATS?: string;
  Tagline?: string;
  Company_LinkedIn?: string;
  Company_Logo?: string;
}
type formDataurl = {
  website?: string;
  linkdin?: string;
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

const AppModal: React.FC<props> = ({ open, handleModalOpen }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const {
    register,
    setValue,
    reset,
    trigger,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<formDataurl>();
  // const handleCompanyBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   handleBlur("company"); // Trigger validation for "company" field
  //   // Your additional onBlur logic for company field goes here
  // };
  // const handleBlur = async (fieldName: keyof FormData) => {
  //   // Trigger validation for the specified field
  //   await trigger(fieldName);
  // };

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
  const {
    selectedCompanyId,
    setSelectedCompanyId,
    fetchData,
    companyNames,
  } = useCompany();
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
  const onSubmitLink = handleSubmit((data) => {
    setLoading(true);
    let url1 = data.website;
    let url2 = data.linkdin;
    console.log(url1, url2);

    const fetchOgData = async () => {
      try {
        // console.log("here in the link");
        const response = await axios.post("/api/openGraph", { url1, url2 });

        // console.log("respo.nse form addmoda", response.data);
        const { ogTitle, ogDescription } = response.data.data1.result;
        const { ogImage, ogUrl: linkdin } = response.data.data2.result;
        const additionalContent = {
          Company_Name: ogTitle,
          Careers_Page: "",
          Website: url1,
          Careers_Page_ATS: "",
          Tagline: ogDescription,
          Company_LinkedIn: url2,
          Company_Logo: ogImage[0].url,
        };
        // console.log(ogImage[0].url);
        // console.log(ogTitle, ogDescription, ogImage, linkdin);

        createCompany.mutate(additionalContent);
        toast.success("Company created Successfully");
        setLoading(false);
        reset();
        onClose();
        // setName((prev) => ({
        //   ...prev,
        //   oneliner: ogDescription,
        //   company: ogTitle,
        //   website: data.website,
        //   linkdin: linkdin,

        //   companylogo: ogImage[0].url,
        // }));
        // onSubmit();
      } catch (error) {
        console.error("Error fetching data from the API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOgData();
  });
  const onSubmit = handleSubmit((data) => {
    // Perform form submission logic here

    const additionalContent = {
      Company_Name: name.company,
      Careers_Page: name.careerURl,
      Website: name.website,
      Careers_Page_ATS: name.atsurl,
      Tagline: name.oneliner,
      Company_LinkedIn: name.linkdin,
      Company_Logo: name.companylogo,
    };
    // console.log(additionalContent);
    // const additionalContent = {
    //   Company_Name: name.company,
    //   Careers_Page: name.careerURl,
    //   Website: name.website,
    //   Careers_Page_ATS: name.atsurl,
    //   Tagline: name.oneliner,
    //   Company_LinkedIn: name.linkdin,
    //   Company_Logo: uploadedImage?.url,
    // };
    // Make a POST request to your API endpoint with the formData
    axios
      .post(`/api/companies`, additionalContent)
      .then((response) => {
        // console.log("POST Response:", response);
        // Close the modal after successful submission
        // fetchData();
      })
      .then(() => {
        onClose();
      })

      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle error state or display error message to the user
      });
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
        // console.log("this is actual url", uploadedImage);
        setUploadedImage(uploadedImage);
        // Handle the imageUrl as needed in your application
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle the error, show a message to the user, etc.
      }
    }
  };

  const resetForm = () => {
    setError(false);
    // setLoader(false);
    // setUploadedImages('');

    setSelectedLogo(null);
  };
  const createCompany = useMutation({
    mutationFn: (FormData: postCompanyInterface) =>
      axios.post(`/api/companies`, FormData),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["companynames"] }),
  });

  React.useEffect(() => {
    // Reset the form when the modal is opened or closed
    if (open || !isOpen) {
      reset(); // Call the reset function from react-hook-form
    }
  }, [open, isOpen, reset]);

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
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody>
                  <form onSubmit={onSubmitLink}>
                    <div className="flex flex-col w-full ">
                      <div className="flex flex-col gap-3">
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
                          id="linkdin"
                          {...register("linkdin")}
                          classname="w-full py-1 text-sm placeholder:text-sm  h-[40px]"
                          errors={error}
                          placeholder="Linkdin"
                        />

                        <div className="w-full flex  justify-end">
                          <APPButton
                            classname="flex items-center w-20   justify-center capitalize rounded-xl bg-blue-600 text-white"
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
