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
import Modal from "./Modal";
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
import useEditMdoal from "@/hooks/useEditModal";
import { useCarrerSense } from "@/context/CareerSense";

interface Comments {
  id: number;
  text?: string;

  items: Comments[];
}

 

interface createSocialProof {
  Images: string[] | null | undefined;
  Open: boolean;
  refetchSocialProofs: () => void;
}

interface updateSocialProof {
  _id?: string | null;
  ProofTitle: string;
  PostBrief: string;
  PostDescription: string;
  Tags: string;
  Platform: string;
  PostLink: string;
  Comment: Comments;
  Lesson: string;
  Images: string[] | null | undefined 
}
type FormData = {
  prooftitle: string;
  post_brief: string;
  editor1Content: string;
  addtag: string;
  platform: string;
  postlink: string;
  comment: Comments;

  editor2Content: string;
  images?: string[] | null;
};
type Props = {};

const AppSocialProofModal: React.FC<createSocialProof> = ({
  refetchSocialProofs,
  Open,
  Images,
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);

  // new comment section
  const editModal = useEditMdoal();
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

  // const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [editor1Content, setEditor1Content] = useState("");
  const [editor2Content, setEditor2Content] = useState("");
  // const [proofId, setProofId] = useState<string | "">("");
  const {
    selectedCareerSenseId,
    setSelectedCareerSenseId,
    // fetchSocialProofById,

    openEditModal,

    setOpenEditModal,
  } = useCarrerSense();

  const [uploadedImages, setUploadedImages] = useState<
    (string | ImagekitResType)[]
  >([]);

  // const [uploadedImages, setUploadedImages] = useState<Array<File>| string>([]);

  const fetchSocialProofById = async (selectedSocialProofId: any) => {
    const response = await axios.get(
      `/api/social-proof/${selectedCareerSenseId}`
    );

    if (response) {
      let {
        ProofTitle,
        PostBrief,
        Tags,

        PostDescription,
        Platform,
        PostLink,
        Comment,
        Lesson,
        Images,
      } = response.data;
       
      let formdata = {
        post_brief: PostBrief,

        prooftitle: ProofTitle,

        addtag: Tags,
        comment: Comment,

        platform: Platform,
        postlink: PostLink,

        
      };
      
      setEditor1Content(PostDescription);
      setEditor2Content(Lesson);
      // const commentArray = Array.isArray(formdata.comment)
      //   ? formdata.comment
      //   : [formdata.comment];
      setComments(Comment);
      // Set comments state with API response
      // setComments(
      // commentArray.map((comment, index) => ({ id: index + 1, text: comment }))
      // );
      setUploadedImages(Images);
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

    queryKey: ["socialProofById", selectedCareerSenseId], // Pass the selectedSocialProofId as part of the query key
    queryFn: () => fetchSocialProofById(selectedCareerSenseId),
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
 
  const [loading, setLoading] = useState(false);
 
  const onEditorChange1 = (content: string) => {
    // console.log("editor1 ", content);
    setEditor1Content(content);
  };

  const onEditorChange2 = (content: string) => {
    // console.log("editor2 ", content);
    setEditor2Content(content);
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
    setSelectedCareerSenseId(null);
    setOpenEditModal((prev) => prev === true && false);
    // console.log(openEditModal);
  };
  // const UpdateSocialProof = useMutation({
  //   mutationFn: (FormData: updateSocialProof) =>
  //     axios.patch(`/api/social-proof/${selectedSocialProofId}`, FormData),
  //   onSettled: () =>
  //     queryClient.invalidateQueries({ queryKey: ["socialProof"] }),
  // });
  // console.log(selectedCareerSenseId)
  const UpdateSocialProof = useMutation({
    mutationFn: (FormData: updateSocialProof) =>
      axios.patch(`/api/social-proof/${selectedCareerSenseId}`, FormData),
      onError:(error)=> toast.error(error.message),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["socialProof"] }),
  });
 

  // delete
  const handleDelete = (selectedSocialProofId?: string) => {
    if (confirm("Are you sure you want to delete this Post?")) {
      deleteSocialProofMutation.mutate();
    }
  };

  const deleteSocialProofMutation = useMutation({
    mutationFn: () =>
      axios.delete(`/api/social-proof/${selectedCareerSenseId}`),
    onSettled: () => {
      refetchSocialProofs();
       
        queryClient.invalidateQueries({ queryKey: ["socialProof"] });
    },

    onSuccess: () => {
      toast.success("Proof deleted successfully");
      editModal.onClose()
      refetchSocialProofs()
      // Invalidate and refetch the query to update the list

      // Redirect to the home page
    },
    onError: (error) => {
    
      toast.error("Error deleting Proof");
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      editModal.onClose();
    }
  };
 
const onSubmit: SubmitHandler<FormData> = async (data, events) => {
  events?.preventDefault();
  setLoading(true);
    // Access form data using the correct property names
    
    const {
      prooftitle,
      post_brief,
      addtag,
      platform,
      postlink,
      comment,
      images,
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
     
    const formData: updateSocialProof = {
      _id: selectedCareerSenseId,
      ProofTitle: prooftitle,
      PostBrief:post_brief,
      Tags: addtag,
      PostDescription: editor1Content,
      Platform: platform,
      PostLink: postlink,
      Comment: comments,
      Lesson: editor2Content,
      Images: imagess,
    };
     
    try {
  //  console.log(formData)
      UpdateSocialProof.mutate(formData);
      toast.success("Post Successfully Created");
      editModal.onClose();
      setLoading(false);
      // onClose();
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
    refetchSocialProof();
  }, [Open, refetchSocialProof]);

  return (
    <div>
      <Modal
        title="Edit CareerSense Proof"
        description=""
        isOpen={editModal.isOpen}
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
              <TipTapEditor editorcontent={editor1Content} onEditorContentChange={onEditorChange1} />
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
                comments={comments}
              />
            </div>
            <div className="">
              <label className="text-[13px] ">Lesson</label>
              <TipTapEditor editorcontent={editor2Content} onEditorContentChange={onEditorChange2}  />
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
                <div key={index} className="flex gap-3 justify-center items-center">
                  <span className="text-[12.5px] w-full line-clamp-1 overflow-x-hidden">
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
                <span className="text-red-500">{errors.images.message}</span>
              )}
            </div>
          </div>
          {/* <div className="w-full  sticky bottom-0 h-full min-w-full bg-white pt-5 py-2 z-50 flex flex-col justify-end"> */}
          <div className=" flex w-full justify-end gap-2 items-end">
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
          {/* </div> */}
        </form>
      </Modal>
    </div>
  );
};

export default AppSocialProofModal;
