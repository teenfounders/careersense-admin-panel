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
import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { useSocialProof } from "@/context/SocialProof";
import router from "next/router";
import { socialproof } from "@/models/social-proof";
interface Comment {
  id: number;
  text: string;
  comment?: string[] | string;
}
interface createSocialProof {
  ProofTitle?: string;
  AddTags?: string;
  Post?: string;
  Platform?: string;
  PostLink?: string;
  Comment?: string[] | string;
  Reality?: string;
  Images: string[] | null | undefined;
  Open: boolean;
}
type FormData = {
  prooftitle: string;

  addtag: string;
  comment: string[] | string;
  platform: string;
  postlink: string;
  reality: string;
  editor1Content: string;
  images?: string[] | null;
  editor2Content: string;
};
type Props = {};

const AppSocialProofModal: React.FC<createSocialProof> = ({ Open, Images }) => {
  const firstInputRef = useRef<HTMLInputElement>(null);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [editor1Content, setEditor1Content] = useState("");
  const [editor2Content, setEditor2Content] = useState("");
  const {
    selectedSocialProofId,
    setSelectedSocialProofId,
    // fetchSocialProofById,

    openEditModal,
    SocialProofId,
    setOpenEditModal,
    setSocialProofId,
    fetchSocialProofData,
  } = useSocialProof();

  const [uploadedImages, setUploadedImages] = useState<
    (string | ImagekitResType)[]
  >([]);

  // const [uploadedImages, setUploadedImages] = useState<Array<File>| string>([]);

  const fetchSocialProofById = async (selectedSocialProofId: any) => {
    const response = await axios.get(
      `/api/social-proof/${selectedSocialProofId}`
    );
    console.log(response.data);
    if (response) {
      let {
        ProofTitle,
        AddTags,
        Post,
        Platform,
        PostLink,
        Comment,
        Reality,
        Images,
      } = response.data;
      let formdata = {
        prooftitle: ProofTitle,

        addtag: AddTags,
        comment: Comment,

        platform: Platform,
        postlink: PostLink,
        reality: Reality,

        editor1Content: Post,
        images: Images,
      };

      setEditor2Content(formdata.reality);
      setEditor1Content(formdata.editor1Content);
      const commentArray = Array.isArray(formdata.comment)
        ? formdata.comment
        : [formdata.comment];

      // Set comments state with API response
      setComments(
        commentArray.map((comment, index) => ({ id: index + 1, text: comment }))
      );
      setUploadedImages(formdata.images);
      // setEditor2Content(formdata.editor2Content)
      reset(formdata);
    }

    return response.data; // Assuming the data you want is in response.data
  };

  const {
    data: socialProofData,
    refetch: refetchSocialProof,
    isLoading: loadingsocial,
    isError: socialError,
  } = useQuery({
    queryKey: ["socialProofById", selectedSocialProofId], // Pass the selectedSocialProofId as part of the query key
    queryFn: () => fetchSocialProofById(selectedSocialProofId),
    enabled: false,
    // Call the function with the selectedSocialProofId
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [uploadedImage, setUploadedImage] = useState<
    ImagekitResType | string[] | string | null | undefined
  >(Images);
  const queryClient = useQueryClient();

  const [socialProofDatas, SetSocialProofDatas] = useState<string>(""); // State to manage selected item in sidebar

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  //set the data back from the database to the shwo the user
  const [editor1, setEditor1] = useState("");

  const onEditorChange1 = (content: string) => {
    console.log("editor1 ", content);
    setEditor1Content(content);
  };

  const onEditorChange2 = (content: string) => {
    console.log("editor2 ", content);
    setEditor2Content(content);
  };

  const [scrollBehavior, setScrollBehavior] = React.useState<
    ModalProps["scrollBehavior"]
  >("inside");

  const [mainComment, setMainComment] = useState<string>("");
  const handleComment = () => {
    const newComment: Comment = {
      id: comments.length + 1,
      text: mainComment,
    };

    // Create a new array with the new comment object
    setComments((prevComments) => [...prevComments, newComment]);

    // Clear the input field
    setMainComment("");
  };
  const handleCommentDelete = (id: number) => {
    if (comments) {
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
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

        // Construct the full image URL
        // const imageUrl = `${uploadedImage.urlEndpoint}/${uploadedImage.folder}/${file.name}`;

        // console.log("Image uploaded successfully. Image URL:", imageUrl);

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

      // editor1Content,
      // editor2Content,
    } = data;

    let additionalComments: string[] = [];
    if (comments && comments.length > 0) {
      additionalComments = comments.map((comment) => comment.text);
      console.log(additionalComments);
    }

    // Combine the main comment and additional comments into a single array
    const allComments = [mainComment, ...additionalComments];

    let imagess: string[] = uploadedImages.map((img: any) => img?.url);
    console.log(imagess);
    console.log(editor1Content, "this is e", editor2Content);
    const formData = {
      ProofTitle: prooftitle,
      AddTags: addtag,
      Post: editor1Content,
      Platform: platform,
      PostLink: postlink,
      Comment: allComments,
      Reality: editor2Content,
      Images: imagess,
    };
    try {
      //   CreateSocialProof.mutate(formData);
      // If the mutation is successful, you can refetch the data
      // await refetchSocialProofs();
      console.log(formData);
      setLoading(false);
      onClose();
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
    // axios
    //   .post(`/api/social-proof`, formData)
    //   .then((response) => {
    //     console.log("POST Response:", response);
    //     // Close the modal after successful submission
    //   })

    //   .catch((error) => {
    //     console.error("Error submitting form:", error);
    //     // Handle error state or display error message to the user
    //   });

    // Assuming you have a `reset` function from the `useForm` hook
  };

  const handlemodalstate = () => {
    setSocialProofId(undefined);
    setOpenEditModal((prev) => prev === true && false);
    console.log(openEditModal);
  };

  useEffect(() => {
    if (Open) {
      onOpen();

      // Trigger data fetching when modal is opened
    } else {
      onClose();
    }
  }, [Open, onOpen, onClose, refetchSocialProof]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        size={"3xl"}
        onOpenChange={onOpenChange}
        onClose={handlemodalstate}
        scrollBehavior={scrollBehavior}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Social Proof
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
                        <div>
                          <AppInput
                            type="text"
                            // defaultValue={socialProofData?.ProofTitle}
                            label=""
                            placeholder="Proof Title"
                            {...register("prooftitle")} // Make sure to include this line
                            classname="w-full text-sm placeholder:text-sm h-[40px] tracking-[-0.015em]"
                          />
                        </div>
                        <div className="w-full ">
                          <TipTapEditor
                            onEditorContentChange={onEditorChange1}
                            editorcontent={editor1Content}
                          />
                        </div>
                        <div>
                          <AppInput
                            type={"text"}
                            // defaultValue={socialProofData?.AddTags}
                            label={""}
                            {...register("addtag")}
                            classname="w-full text-sm placeholder:text-sm h-[40px] "
                            placeholder="Add tags"
                          />
                        </div>
                        <div className="flex min-will gap-2 mb-1  ">
                          <div className="w-[33%]">
                            <AppInput
                              type={"text"}
                              label={""}
                              // defaultValue={socialProofData?.Platform}
                              {...register("platform")}
                              classname=" w-full text-sm placeholder:text-sm h-[40px] "
                              placeholder="Platform"
                            />
                          </div>
                          <div className="w-[66%]">
                            <AppInput
                              type={"text"}
                              label={""}
                              // defaultValue={socialProofData?.PostLink}
                              {...register("postlink")}
                              classname="w-full text-sm placeholder:text-sm h-[40px] "
                              placeholder="Post Link"
                            />
                          </div>
                        </div>
                        <div className="w-full flex flex-col ">
                          <div className="">
                            <AppTextarea
                              placeholder="Comment...."
                              {...register("comment")}
                              value={mainComment}
                              onChange={(e) => setMainComment(e.target.value)}
                              className="placeholder:text-[#666666] w-full h-full rounded-md border-[1px] border-gray-300 p-3"
                            />
                            <div className="flex justify-end gap-2 items-center w-full">
                              <button
                                type="button"
                                onClick={() => handleComment()}
                                className="text-xs font-semibold text-[#4E71DA]"
                              >
                                Add Comment
                              </button>
                            </div>
                          </div>

                          {comments?.map((c, index) => (
                            <div key={index} className="">
                              <AppTextarea
                                placeholder="Comment...."
                                defaultValue={c.text}
                                onChange={(e) => {
                                  const updatedComments = [...comments];
                                  updatedComments[index].text = e.target.value;
                                  setComments(updatedComments);
                                }}
                                className="placeholder:text-[#666666] w-full rounded-md h-full border-[1px] border-gray-300 p-3 "
                              />
                              <div className="flex justify-end gap-2 items-center w-full">
                                <button
                                  type="button"
                                  onClick={() => handleCommentDelete(index)}
                                  className="text-xs font-semibold text-[#E51010]"
                                >
                                  Delete Comment
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="">
                          <TipTapEditor
                            editorcontent={editor2Content}
                            onEditorContentChange={onEditorChange2}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex w-full py-5 items-end justify-end   gap-10">
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
                          <span className="text-[12.5px] text-black w-full overflow-x-hidden">
                            {image}
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

                  <div className="w-full  sticky -bottom-2 h-full min-w-full bg-white pt-5 py-2 z-50 flex flex-col justify-end">
                    <div className=" flex w-full justify-end items-end">
                      <APPButton
                        classname="flex items-center w-20  justify-center capitalize rounded-xl bg-blue-600 text-white"
                        type="submit"
                        text={"Save"}
                        loading={loading}
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

export default AppSocialProofModal;
