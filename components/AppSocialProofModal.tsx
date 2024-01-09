"use client";
import APPButton from "@/components/AppButton";
import AppSearchLeftInput from "@/components/AppSearchLeftInput";
import { dummyItems } from "@/components/Sidebar";
import { jobcardContent } from "@/utils/postdata";
import Link from "next/link";
import { fetchSocialProofById } from "@/lib/action";

// import { commentData } from "@/utils/postdata";

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
import { FaClosedCaptioning } from "react-icons/fa";
import toast from "react-hot-toast";
import AppComment from "./AppComment";
import useNode from "@/app/hooks/useNode";
 
interface Comments {
  id: number;
  name?: string;

  items: Comments[];
}

export interface Comment {
  id: number;
  text: string;
  comments?: Comments[];
}

interface createSocialProof {
  Images: string[] | null | undefined;
  Open: boolean;
  refetchSocialProofs: () => void;
}

interface updateSocialProof {
  _id?: string | null;
  ProofTitle?: string;
  AddTags?: string;
  Post?: string;
  Platform?: string;
  PostLink?: string;
  Comment?: Comments;
  Reality?: string;
  Images: string[] | undefined;
}
type FormData = {
  prooftitle: string;
  addtag: string;
  comment: Comments;
  platform: string;
  postlink: string;
  reality: string;
  editor1Content: string;
  images?: string[] | null;
  editor2Content: string;
};
type Props = {};

const AppSocialProofModal: React.FC<createSocialProof> = ({
  refetchSocialProofs,
  Open,
  Images,
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);

  // new comment section

  const [addComment, setAddComment] = useState(false);
  const [comments, setComments] = useState<Comments>(commentData);
  const { insertNode, deleteNode } = useNode();

  const handleInsertNode = (folderId: number, item: any) => {
    const finalStructure = insertNode(comments, folderId, item);
    setComments(finalStructure);
  };

  const handleDeleteNode = (folderId: number) => {
    const finalStructure = deleteNode(comments, folderId);
    const temp = { ...finalStructure };
    setComments(temp);
  };

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [editor1Content, setEditor1Content] = useState("");
  const [editor2Content, setEditor2Content] = useState("");
  const [proofId, setProofId] = useState<string | "">("");
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
      // console.log(Comment);

      setEditor2Content(formdata.reality);
      setEditor1Content(formdata.editor1Content);
      // const commentArray = Array.isArray(formdata.comment)
      //   ? formdata.comment
      //   : [formdata.comment];
      setComments(Comment);
      // Set comments state with API response
      // setComments(
      // commentArray.map((comment, index) => ({ id: index + 1, text: comment }))
      // );
      setUploadedImages(formdata.images);
      // setEditor2Content(formdata.editor2Content)
      reset(formdata);
    }

    return response.data; // Assuming the data you want is in response.data
  };
  // Initial get data selected proof
  const {
    data: socialProofData,
    refetch: refetchSocialProof,
    isLoading: loadingsocial,
    isError: socialError,
  } = useQuery({
    queryKey: ["socialProofById", selectedSocialProofId], // Pass the selectedSocialProofId as part of the query key
    queryFn: () => fetchSocialProofById(selectedSocialProofId),
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
  } = useForm<FormData>();
  // bunch of state
  const [uploadedImage, setUploadedImage] = useState<
    ImagekitResType | string[] | string | null | undefined
  >(Images);
  const queryClient = useQueryClient();

  const [socialProofDatas, SetSocialProofDatas] = useState<string>(""); // State to manage selected item in sidebar

  // const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

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

  const [scrollBehavior, setScrollBehavior] = React.useState<
    ModalProps["scrollBehavior"]
  >("inside");

  const [mainComment, setMainComment] = useState<string>("");
  // const handleComment = () => {
  //   const newComment: Comment = {
  //     id: comments.length + 1,
  //     text: mainComment,
  //     comments: [],
  //   };

  //   setComments((prevComments) => [...prevComments, newComment]);
  //   setMainComment("");
  // };

  // const handleCommentEdit = (commentIndex: number, newText: string) => {
  //   // Create a copy of the current state (comments)
  //   const updatedComments = [...comments];
  //   // Modify the copy
  //   updatedComments[commentIndex].text = newText;
  //   // Set the state with the modified copy
  //   setComments(updatedComments);
  // };

  // const handleCommentDelete = (commentIndex: number) => {
  //   // Create a copy of the current state (comments)
  //   const updatedComments = [...comments];
  //   // Modify the copy
  //   updatedComments.splice(commentIndex, 1);
  //   // Set the state with the modified copy
  //   setComments(updatedComments);
  // };

  // const handleReply = (commentIndex: number, replyText: string) => {
  //   const updatedComments = [...comments];
  //   const currentComment = updatedComments[commentIndex];
  //   console.log(commentIndex, replyText);

  //   if (!currentComment.comments) {
  //     currentComment.comments = [];
  //   }

  //   const newReply: Reply = {
  //     id: currentComment.comments.length + 1,
  //     text: replyText,
  //   };

  //   currentComment.comments.push({
  //     replies: [],
  //   });

  //   // Clear the replyText for the current comment

  //   // Set the state with the modified copy
  //   setComments(updatedComments);
  // };

  // const handleComment = () => {
  //   const newComment: Comment = {
  //     id: comments.length + 1,
  //     text: mainComment,

  //   };

  //   // Create a new array with the new comment object
  //   setComments((prevComments) => [...prevComments, newComment]);

  //   // Clear the input field
  //   setMainComment("");
  // };
  // const handleCommentEdit = (index: number, newText: string) => {
  //   const updatedComments = [...comments];
  //   updatedComments[index].text = newText;
  //   setComments(updatedComments);
  // };
  // const handleCommentDelete = (index: number) => {
  //   const updatedComments = [...comments];
  //   updatedComments.splice(index, 1);
  //   setComments(updatedComments);
  // };
  // Update the 'comments' state with the edited comment
  // Update the 'comments' state by removing the comment at the specified index
  // const handleCommentDelete = (id: number) => {
  //   if (comments) {
  //     // const updatedComments = comments.filter((comment) => comment.id !== id);
  //     const updatedComments = [...comments];
  //     updatedComments.splice(id, 1);
  //     setComments(updatedComments);
  //   }
  // };
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

        // console.log("this is actual url", uploadedImage);
        setUploadedImages((prevImages) => [...prevImages, uploadedImage.url]);
        // setUploadedImage(uploadedImage);

        // Handle the imageUrl as needed in your application
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle the error, show a message to the user, etc.
      }
    }
  };

  const handlemodalstate = () => {
    setSocialProofId(undefined);
    setOpenEditModal((prev) => prev === true && false);
    // console.log(openEditModal);
  };
  // const UpdateSocialProof = useMutation({
  //   mutationFn: (FormData: updateSocialProof) =>
  //     axios.patch(`/api/social-proof/${selectedSocialProofId}`, FormData),
  //   onSettled: () =>
  //     queryClient.invalidateQueries({ queryKey: ["socialProof"] }),
  // });
  const UpdateSocialProof = useMutation({
    mutationFn: (FormData: updateSocialProof) =>
      axios.patch(`/api/social-proof/${selectedSocialProofId}`, FormData),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["socialProof"] }),
  });
  const fetchSocialProof = async () => {
    const response = await axios.get(`/api/social-proof`);
    return response;
  };

  // delete
  const handleDelete = (selectedSocialProofId?: string) => {
    if (confirm("Are you sure you want to delete this Post?")) {
      deleteCompanyMutation.mutate();
    }
  };

  const deleteCompanyMutation = useMutation({
    mutationFn: () =>
      axios.delete(`/api/social-proof/${selectedSocialProofId}`),
    onSettled: () => {
      refetchSocialProofs();
      refetchSocialProofs(),
        queryClient.invalidateQueries({ queryKey: ["experiencecompany"] });
    },

    onSuccess: () => {
      toast.success("Company deleted successfully");
      setOpenEditModal((prev) => prev === true && false);
      // Invalidate and refetch the query to update the list

      // Redirect to the home page
    },
    onError: (error) => {
      console.error("Error deleting company:", error);
      toast.error("Error deleting company");
    },
  });

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

    // let additionalComments: string[] = [];
    // if (comments && comments.length > 0) {
    //   additionalComments = comments.map((comment) => comment.text);
    //   // console.log(additionalComments);
    // }

    // // Combine the main comment and additional comments into a single array
    // const allComments = [mainComment, ...additionalComments].filter(
    //   (comment) => comment.trim() !== ""
    // );

    let imagess: string[] = uploadedImages.map((img: any) => img);
    // console.log(imagess);
    // console.log(editor1Content, "this is e", editor2Content);
    const formData: updateSocialProof = {
      _id: selectedSocialProofId,
      ProofTitle: prooftitle,
      AddTags: addtag,
      Post: editor1Content,
      Platform: platform,
      PostLink: postlink,
      Comment: comments,
      Reality: editor2Content,
      Images: imagess,
    };
    try {
      //   CreateSocialProof.mutate(formData);
      // If the mutation is successful, you can refetch the data
      // await refetchSocialProofs();
      // console.log(formData);
      UpdateSocialProof.mutate(formData);
      toast.success("Post Successfully Created");
      // console.log(formData);
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

  useEffect(() => {
    if (Open) {
      onOpen();
      refetchSocialProof();
      // setMainComment("");
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
                            classname="w-full  text-sm placeholder:text-sm h-[40px] tracking-[-0.015em]"
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
                          {/* {addComment ? ( */}
                          <div className="">
                            <AppComment
                              handleInsertNode={handleInsertNode}
                              // handleEditNode={handleEditNode}
                              handleDeleteNode={handleDeleteNode}
                              comments={comments}
                            />
                            {/* <AppTextarea
                              placeholder="Comment...."
                              {...register("comment")}
                              value={mainComment}
                              onChange={(e) => setMainComment(e.target.value)}
                              className="placeholder:text-[#666666] w-full h-full rounded-md border-[1px] border-gray-300 p-3"
                              /> */}
                            {/* <div className="flex justify-end gap-2 items-center w-full">
                              <button
                                type="button"
                                onClick={() => handleComment()}
                                className="text-xs font-semibold text-[#4E71DA]"
                                >
                                reply
                              </button>
                              <button
                                type="button"     
                                onClick={() => handleComment()}
                                className="text-xs font-semibold text-[#4E71DA]"
                                >
                                Delete
                              </button>
                            </div> */}
                          </div>
                        </div>
                        {/* {comments
                            ?.map((c, index) => (
                              <div key={index} className="">
                                <AppTextarea
                                  placeholder="Comment...."
                                  defaultValue={c.text}
                                  onChange={(e) => {
                                    const updatedComments = [...comments];
                                    updatedComments[index].text =
                                      e.target.value;
                                    setComments([...updatedComments]);
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
                            ))
                            .reverse()} */}
                        <div className="">
                          <TipTapEditor
                            editorcontent={editor2Content}
                            onEditorContentChange={onEditorChange2}
                          />
                        </div>
                        <div className="flex w-full py-5 items-start justify-end   gap-10">
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
                              <div
                                key={index}
                                className="flex gap-3 items-center"
                              >
                                <span className="text-[12.5px]  text-black w-full overflow-x-hidden">
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
                      </>
                    )}
                  </div>

                  <div className="w-full  sticky -bottom-2 h-full min-w-full bg-white pt-5 py-2 z-50 flex flex-col justify-end">
                    <div className=" flex w-full gap-2 justify-end items-end">
                      <APPButton
                        classname="flex items-center w-20  justify-center capitalize rounded-xl bg-red-600 text-white"
                        type="button"
                        text={"Delete"}
                        loading={loading}
                        onClick={() => handleDelete()}
                        forwardimage
                      />
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
