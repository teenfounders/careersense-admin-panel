"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { ICompany } from "@/utils/types";
import axios from "axios";
import Image from "next/image";
import { useCompany } from "@/context/CompanyId";
import { useForm } from "react-hook-form";
import AppInput from "@/components/AppInput";
import error from "next/error";
import APPButton from "@/components/AppButton";
import toast, { Toaster } from "react-hot-toast";

type FormData = {
  company: string;
  oneliner: string;
  careerURl: string;
  website: string;
  atsurl: string;
  linkdin: string;
  companylogo: string;
  Logo: string;
};
export default function Page({ params }: { params: { companies: string } }) {
  const [companyData, setCompanyData] = useState<ICompany | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,

    trigger,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>();
  const [error, setError] = useState(false);
  const [name, setName] = useState({
    company: "",
    oneliner: "",
    careerURl: "",
    website: "",
    atsurl: "",
    linkdin: "",
    companylogo: "",
  });
  const { selectedCompanyId } = useCompany();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
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
    console.log(data);
    const fetchData = async () => {
      try {
        //        Company_Name: string;
        // Tagline?: string;
        // Website?: string;
        // Company_Size?: string;
        // Keywords?: string[];
        // Careers_Page_ATS?: string;
        // Company_LinkedIn?: string;
        // Company_Logo: string;
        // About_Company?: string;
        // Company_Description?: string;
        // Careers_Page?: string;
        const formData = {
          _id: selectedCompanyId, // Replace this with the actual companyId value
          Company_Name: data.company,
          Website: data.website,
          Careers_Page: data.careerURl,
          Company_LinkedIn: data.linkdin,
          Careers_Page_ATS: data.atsurl,
          Tagline: data.oneliner,
          Company_Logo: data.Logo,
          // Assuming campusPartner corresponds to experience
          // Replace this with the actual URL value
        };
        const response = await axios.patch(
          "/api/companies/${selectedCompanyId}",
          formData
        );
        console.log(response.data);
        toast.success("Successfully updated!");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setLoading(false);
    // let url1 = data.website;
    // let url2 = data.linkdin;
    // console.log(url1, url2);

    // const fetchData = async () => {
    //   try {
    //     console.log("here in the link");
    //     const response = await axios.post("/api/openGraph", { url1, url2 });

    //     console.log("response form addmoda", response.data);
    //     const { ogTitle, ogDescription } = response.data.data1.result;
    //     const { ogImage, ogUrl: linkdin } = response.data.data2.result;
    //     setName((prev) => ({
    //       ...prev,
    //       oneliner: ogDescription,
    //       company: ogTitle,
    //       website: data.website,
    //       linkdin: linkdin,

    //       companylogo: ogImage[0].url,
    //     }));
    //   } catch (error) {
    //     console.error("Error fetching data from the API", error);
    //   }
    // };
  });
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`/api/companies/${selectedCompanyId}`);
        const data = response.data; // Assuming the API response is an object containing the company data
        setCompanyData(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [id, selectedCompanyId]); // Include 'id' as a dependency to re-fetch data when the 'id' changes

  return (
    <>
      <main className="bg-[#fafafa] flex flex-col grow relative w-full  h-screen overflow-y-auto">
        {/* <header className="sticky z-20 top-0 shadow-md min-w-full bg-white border-b-[1px] border-[#dadada] min-h-[86px]  mb-0"> */}

        <main className="block relative  ">
          <div className="my-5 mx-auto w-full  max-w-5xl">
            <div className="mb-4 w-full"></div>
            <div className="p-4 mb-4 bg-white shadow-md border-[1px] border-[#dadada]  rounded-md overflow-hidden">
              <div className="max-w-5xl flex flex-col gap-6 relative mx-auto p-4">
                <form onSubmit={onSubmitLink}>
                  {companyData && (
                    <div className="flex relative flex-col gap-3">
                      <AppInput
                        type="text"
                        label="comapny"
                        id="company"
                        defaultValue={companyData.Company_Name}
                        className={`w-full text-sm h-[40px] placeholder:text-sm border rounded-md px-3 py-1
                      
                      `}
                        {...register("company")}
                        placeholder="Eg: Google"
                      />
                      <AppInput
                        type="text"
                        label=""
                        id="carrerUrl"
                        defaultValue={companyData.Careers_Page}
                        {...register("careerURl")}
                        classname="w-full text-sm  placeholder:text-sm h-[40px]"
                        errors={error}
                        placeholder="Career Site URL"
                      />
                      <AppInput
                        type="text"
                        label=""
                        id="website"
                        defaultValue={companyData.Website}
                        {...register("website")}
                        classname="w-full text-sm  placeholder:text-sm h-[40px]"
                        errors={error}
                        placeholder="Website"
                      />
                      <AppInput
                        type="text"
                        label=""
                        defaultValue={companyData.Careers_Page_ATS}
                        id="atsurl"
                        {...register("atsurl")}
                        classname="w-full py-1 text-sm placeholder:text-sm  h-[40px]"
                        errors={error}
                        placeholder="Ats URL"
                      />
                      <AppInput
                        type="text"
                        label=""
                        defaultValue={companyData.Tagline}
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
                        defaultValue={companyData.Company_LinkedIn}
                        {...register("linkdin")}
                        classname="w-full py-1 text-sm placeholder:text-sm  h-[40px]"
                        errors={error}
                        onChange={handleInputChange}
                        placeholder="Linkdin"
                      />
                      <AppInput
                        type="text"
                        label=""
                        id="Logo Url"
                        {...register("Logo")}
                        classname="w-full py-1 text-sm placeholder:text-sm  h-[40px]"
                        defaultValue={companyData.Company_Logo}
                        errors={error}
                        onChange={handleInputChange}
                        placeholder="Logo Url"
                      />

                      {/* <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Links:</h2>
            <ul className="list-disc pl-6">
            <li>
            <span className="text-blue-500 hover:underline">
            <a
            href={companyData.Website}
            target="_blank"
            rel="noopener noreferrer"
            >
            Website
            </a>
            </span>
            </li>
            <li>
            <span className="text-blue-500 hover:underline">
            <a
            href={companyData.Careers_Page}
            target="_blank"
            rel="noopener noreferrer"
            >
                    Careers Page
                  </a>
                </span>
              </li>
              <li>
              <span className="text-blue-500 hover:underline">
              <a
              href={companyData.Company_LinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              >
              LinkedIn
              </a>
              </span>
              </li>
              </ul>
            </div> */}
                    </div>
                  )}
                  <div className="flex items-center  mt-5 justify-right">
                    <APPButton
                      type={"submit"}
                      loading={loading}
                      text={"Save"}
                      classname="w-20"
                      forwardimage
                    />
                  </div>
                </form>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </main>
        <div className="absolute bottom-0 right-3">
          {/* <AppModal open={open} handleModalOpen={handleModalOpen} /> */}
        </div>
        <Toaster />
      </main>
    </>
  );
}