"use client";
import APPButton from "@/components/AppButton";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import uploadFileToImageKit, { ImagekitResType } from "@/utils/imagekit";
// import {
//   // Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   ModalProps,
//   Button,
//   useDisclosure,
//   RadioGroup,
//   Radio,
// } from "@nextui-org/react";
import Link from "next/link";
import Modal from "@/components/Modal";
import TipTapEditor from "@/components/TipTapEditor";
import AppInput from "@/components/AppInput";
import AppTextarea from "@/components/AppTextarea";

import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSocialProof } from "@/context/SocialProof";
import router from "next/router";
import AppSocialProofModal from "@/components/AppSocialProofModal";
import AppComment from "@/components/AppComment";
import useNode from "../hooks/useNode";
import useSocialModal from "@/hooks/UseSocialModal";
import PostCard from "../../components/PostCard";
import { cardData } from "@/utils/constant";
import JobCard from "@/components/JobCard";

interface Comment {
  id: number;
  text?: string;
  items: Comment[];
}
const commentData = {
  id: 1,
  items: [
    // {
    //   id: 2342323,
    //   name: "hellow",
    //   items: [
    //     {
    //       id: 3323232,
    //       name: "hellow world",
    //       items: [
    //         {
    //           id: 3322443,
    //           name: "hellow world 124",
    //           items: [],
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   id: 2342355,
    //   name: "Javascript",
    //   items: [
    //     {
    //       id: 3323232,
    //       name: "Javascaript typescript",
    //       items: [],
    //     },
    //   ],
    // },
  ],
};

interface createSocialProof {
  ProofTitle: string;
  AddTags: string;
  Post: string;
  Platform: string;
  PostLink: string;
  Comment: Comment;
  Reality: string;
  Images: string[] | null;
}
type FormData = {
  prooftitle: string;
  post_brief: string;
  addtag: string;
  comment: Comment;
  platform: string;
  postlink: string;
  reality: string;
  editor1Content: string;
  images?: string[] | null;
  editor2Content: string;
};

const SocialProofs = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const uploadModal = useSocialModal();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };
  const [uploadedImages, setUploadedImages] = useState<
    (string | ImagekitResType)[]
  >([]);
  const [comment, setComment] = useState<Comment>(commentData);
  const { insertNode, deleteNode } = useNode();

  const handleInsertNode = (folderId: number, item: any) => {
    const finalStructure = insertNode(comment, folderId, item);
    setComment(finalStructure);
  };

  const handleDeleteNode = (folderId: number) => {
    const finalStructure = deleteNode(comment, folderId);
    const temp = { ...finalStructure };
    setComment(temp);
  };

  // const [uploadedImages, setUploadedImages] = useState<Array<File>| string>([]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [uploadedImage, setUploadedImage] = useState<ImagekitResType | null>(
    null
  );
  const queryClient = useQueryClient();

  const [selectedItem, setSelectedItem] = useState<string>(""); // State to manage selected item in sidebar
  const {
    SocialProofNames,
    openEditModal,
    setOpenEditModal,
    selectedSocialProofId,
    setSelectedSocialProofId,
    fetchSocialProofById,
    SocialProofId,
    fetchSocialProofData,
  } = useSocialProof();
  // const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string>("");
  const [editor1Content, setEditor1Content] = useState("");
  const [editor2Content, setEditor2Content] = useState("");

  //set the data back from the database to the shwo the user
  const [editor1, setEditor1] = useState("");

  const onEditorChange1 = (content: string) => {
    // console.log("editor1 ", content);
    setEditor1Content(content);
  };

  const onEditorChange2 = (content: string) => {
    // console.log("editor2 ", content);
    setEditor2Content(content);
  };
  // const [openEditModal, setOpenEditModal] = useState(false);

  // const [scrollBehavior, setScrollBehavior] = React.useState<
  //   ModalProps["scrollBehavior"]
  // >("inside");

  const [mainComment, setMainComment] = useState<string>("");

  // const fetchSocialProof = async () => {
  //   const response = await axios.get(`/api/social-proof`);
  //   return response.data; // Return the data property
  // };

  const onSubmit: SubmitHandler<FormData> = async (data, events) => {
    events?.preventDefault();
    setLoading(true);
    // Access form data using the correct property names
    console.table(data);
    const {
      prooftitle,

      addtag,

      platform,
      postlink,
    } = data;

    let imagess: string[] = uploadedImages.map((img: any) => img?.url);
    const formData = {
      ProofTitle: prooftitle,
      AddTags: addtag,
      Post: editor1Content,
      Platform: platform,
      PostLink: postlink,
      Comment: comment,
      Reality: editor2Content,
      Images: imagess,
    };
    try {
      // console.log(formData)
      CreateSocialProof.mutate(formData);
      // If the mutation is successful, you can refetch the data
      // await refetchSocialProofs();

      setLoading(false);
      // onClose();
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = (index: number): void => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };
  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      try {
        // Assume uploadedImage contains the API response
        const uploadedImage = await uploadFileToImageKit({
          file,
          folder: "socialproof_Logo",
          uploadUrl: process.env.IMAGEKIT_API_UPLOAD_URL!, // Pass the ImageKit upload URL here
        });

        setUploadedImages((prevImages) => [...prevImages, uploadedImage]);
        console.log("this is actual url", uploadedImage);
        setUploadedImage(uploadedImage);
        // Handle the imageUrl as needed in your application
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle the error, show a message to the user, etc.
      }
    }
  };

  // ... (existing code)
  // const {
  //   data: socialProofsofId,
  //   refetch: refetchSocialProofsbyid,
  //   isLoading: socialproofmodalloading,
  //   isError: socialproofmodalerror,
  // } = useQuery({
  //   queryKey: ["socialProofbyId"],
  //   queryFn: fetchSocialProofById,
  //   enabled: false,
  // });

  const handleSocialProofClick = async (socialproofId: string) => {
    try {
      // Set the selected social proof ID
      setSelectedSocialProofId(socialproofId);

      // Check if the modal is open and the selected social proof ID is set
      // if (socialproofId) {
      //   // If not already open, fetch the data
      //   refetchSocialProofsbyid();
      //   // Toggle the modal state
      // } else {
      //   // If already open, close the modal
      setOpenEditModal((prev) => !prev);
      // }
    } catch (error) {
      console.error("Error fetching social proof by ID:", error);
    }
  };

  const CreateSocialProof = useMutation({
    mutationFn: (FormData: createSocialProof) =>
      axios.post("/api/social-proof", FormData),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["socialProof"] }),
  });
  // const {
  //   data: socialProofs,
  //   refetch: refetchSocialProofs,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["socialProof"],
  //   queryFn: fetchSocialProof,
  // });

  // if (isError) {
  //   return <div>Error fetching social proofs</div>;
  // }

  return (
    <main className="bg-[#fafafa] flex flex-col grow relative w-full  h-screen overflow-y-auto">
      {/* <header className="sticky z-20 top-0 shadow-md min-w-full bg-white border-b-[1px] border-[#dadada] min-h-[86px]  mb-0"> */}
      <header className="sticky z-20 top-0 shadow-md min-w-full justify-center items-center  flex bg-[#ffffff] border-b-[1px] border-[#dadada] min-h-[86px]  mb-0">
        <ul className="flex flex-wrap absolute right-4 justify-right items-center max-w-5xl">
          <button
            className="py-2 px-3 bg-blue-600 text-white rounded-xl"
            onClick={uploadModal.onOpen}
          >
            new proof
          </button>
          {/* <Button onPress={onOpen} color="primary">
            new proof
          </Button>

          <Modal
            isOpen={isOpen}
            size={"3xl"}
            onOpenChange={onOpenChange}
            scrollBehavior={scrollBehavior}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Social Proof
                  </ModalHeader>
                  <ModalBody> */}

          <Modal
            title="Social Proof"
            description=""
            isOpen={uploadModal.isOpen}
            onChange={onChange}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-[10px]  ">
                {" "}
                <div>
                  <AppInput
                    type="text"
                    label=""
                    placeholder="Proof Title"
                    {...register("prooftitle")} // Make sure to include this line
                    classname="w-full text-[15px] placeholder:text-[15px] h-[40px] tracking-[-0.015em]"
                  />
                </div>
                <div>
                  <textarea
                    className="placeholder:text-[#666666] w-full text-[15px] placeholder:text-[15px] h-full rounded-md border-[1px] border-gray-300 p-3"
                    placeholder="Post Brief"
                    {...register("post_brief")} // Make sure to include this line
                  />
                </div>
                <div className="w-full ">
                  <label className="text-[13px] ">Post description</label>
                  <TipTapEditor
                    onEditorContentChange={onEditorChange1}
                    editorcontent={editor1}
                  />
                </div>
                <div>
                  <AppInput
                    type={"text"}
                    label={""}
                    {...register("addtag")}
                    classname="w-full text-[15px] placeholder:text-[15px] h-[40px] "
                    placeholder="Add tags"
                  />
                </div>
                <div className="flex min-will gap-2 mb-1  ">
                  <div className="w-[33%]">
                    <AppInput
                      type={"text"}
                      label={""}
                      {...register("platform")}
                      classname=" w-full text-[15px] placeholder:text-[15px] h-[40px] "
                      placeholder="Platform"
                    />
                  </div>
                  <div className="w-[66%]">
                    <AppInput
                      type={"text"}
                      label={""}
                      {...register("postlink")}
                      classname="w-full text-[15px] placeholder:text-[15px] h-[40px] "
                      placeholder="Post Link"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col ">
                  <AppComment
                    handleInsertNode={handleInsertNode}
                    // handleEditNode={handleEditNode}
                    handleDeleteNode={handleDeleteNode}
                    comments={comment}
                  />
                </div>
                <div className="">
                <label className="text-[13px] ">Lesson</label>
                  <TipTapEditor onEditorContentChange={onEditorChange2} />
                </div>
              </div>
              <div className="flex w-full my-5 items-end justify-end   gap-10">
                <label className="px-3 flex gap-1 py-2 text-[12.5px] text-[#666666] font-medium bg-transparent border-[1px] border-gray-300 rounded-md cursor-pointer">
                  <span>Add</span>
                  <span>Image</span>
                  <input
                    type="file"
                    onChange={uploadAvatar}
                    className="hidden"
                    accept=".jpg, .jpeg, .png"
                  />
                </label>
                <div className="flex flex-col gap-3 w-full">
                  {uploadedImages.map((image: any, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <span className="text-[12.5px] w-full overflow-x-hidden">
                        {image.name}
                      </span>
                      <button
                        className="text-red-500 text-[12.5px]"
                        onClick={() => deleteImage(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  {errors.images && (
                    <span className="text-red-500">
                      {errors.images.message}
                    </span>
                  )}
                </div>
              </div>
              {/* <div className="w-full  sticky bottom-0 h-full min-w-full bg-white pt-5 py-2 z-50 flex flex-col justify-end"> */}
              <div className=" flex w-full justify-end items-end">
                <APPButton
                  classname="flex items-center w-20  justify-center capitalize rounded-xl bg-blue-600 text-white"
                  type="submit"
                  text={"Save"}
                  loading={loading}
                  forwardimage
                />
              </div>
              {/* </div> */}
            </form>
          </Modal>
          {/* </ModalBody> */}

          {/* </ModalContent> */}
          {/* </Modal> */}
        </ul>
      </header>
      <main className="block  ">
        <div className="my-5 mx-auto w-full  max-w-5xl">
          <div className="mb-4 w-full"></div>
          <div className="p-4 mb-4  mx-5 shadow-md border-[1px] border-[#dadada]  rounded-md overflow-hidden">
            <div className="w-full flex  justify-between mb-4">
              <span className="overflow-hidden text-[15px] text-[#666] font-medium">
                Social Proof
              </span>
            </div>
            {/* <div className="  min-h-[80vh]  flex flex-col w-full gap-4 justify-stretch items-stretch">
              {socialProofs && (
                <>
                  {socialProofs.socialproofs
                    .map((socialproof: any, idx: any) => (
                      <div key={idx} className="text-[#4766cc]">
                        <button
                          type="button"
                          onClick={() =>
                            handleSocialProofClick(socialproof._id || "")
                          }
                        >
                          <span className="font-medium  hover:text- text-md text-blue-500">
                            {socialproof.ProofTitle}
                          </span>
                        </button>
                      </div>
                    ))
                    .reverse()}
                  {socialProofs.isFetching && (
                    <div>Updating in the background...</div>
                  )}
                </>
              )}
            </div> */}

            <div className="mb-4 gap-5 flex flex-col max-lg:mr-20 md:px-5 w-full">
              {cardData.map((data, index) => {
                return (
                  <Link key={index} href={`/social-proofs/${data.id}`}>
                    <PostCard
                      key={index}
                      title={data.title}
                      tags={data.tags}
                      comment={commentData}
                      content={data.content}
                      image={data.image}
                      image2={data.image2}
                    />
                  </Link>
                );
              })}
              {/* <PostCard/>
        <PostCard/>
        <PostCard/> */}
              {/* </ComponentsPageWrapper> */}
            </div>
          </div>
        </div>

        <div className="">
          {/* {SocialProofId && ( */}
          <AppSocialProofModal
            Open={openEditModal}
            refetchSocialProofs={() => {}}
            Images={[]}
          />
          {/* )} */}
        </div>
      </main>
    </main>
  );
};

export default SocialProofs;
