"use client";
import APPButton from "@/components/AppButton";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
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

import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSocialProof } from "@/context/SocialProof";
import router from "next/router";
import AppSocialProofModal from "@/components/AppSocialProofModal";

interface Comment {
  id: number;
  text: string;
}
interface createSocialProof {
  ProofTitle: string;
  AddTags: string;
  Post: string;
  Platform: string;
  PostLink: string;
  Comment: string[] | string;
  Reality: string;
  Images: string[] | null;
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

const SocialProofs = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<
    (string | ImagekitResType)[]
  >([]);

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
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
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

  const [scrollBehavior, setScrollBehavior] = React.useState<
    ModalProps["scrollBehavior"]
  >("inside");

  const [mainComment, setMainComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
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
  const handleCommentDelete = (index: number) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
    // if (comments) {
    //   const updatedComments = comments.filter((comment) => comment.id !== id);
    //   setComments(updatedComments);
    // }
  };
  const handleCommentEdit = (index: number, newText: string) => {
    // Update the 'comments' state with the edited comment
    const updatedComments = [...comments];
    updatedComments[index].text = newText;
    setComments(updatedComments);
  };
  const fetchSocialProof = async () => {
    const response = await axios.get(`/api/social-proof`);
    return response.data; // Return the data property
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
      // console.log(additionalComments);
    }

    // Combine the main comment and additional comments into a single array
    const allComments = [mainComment, ...additionalComments];

    let imagess: string[] = uploadedImages.map((img: any) => img?.url);
    // console.log(imagess);
    // console.log(editor1Content, "this is e", editor2Content);
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
      CreateSocialProof.mutate(formData);
      // If the mutation is successful, you can refetch the data
      // await refetchSocialProofs();

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
  // const getSocialProofbyId = async () => {
  //   const response = await axios.get(`/api/social-proof/${getSocialProofbyId}`);
  //   return response.data; // Return the data property
  // };
  // const {
  //   data: socialProofsbyid,
  //   refetch: refetchSocialProofsbyid,
  //   isLoading: socilaproofsbyidloading,
  //   isError: socialproofserror,
  // } = useQuery({
  //   queryKey: ["getsocialproof"],
  //   queryFn: getSocialProofbyId,
  //   enabled: false,
  // });

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
  // useEffect(() => {
  //   const fetchSocialProofById = async () => {
  //     try {
  //       setLoading(true);
  //       if (selectedSocialProofId) {
  //         const response = await axios.get(
  //           `/api/social-proof/${selectedSocialProofId}`
  //         );
  //         setSocialProofData(response.data);
  //         console.log(response.data);
  //       }
  //     } catch (error) {
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSocialProofById();
  // }, [selectedSocialProofId]);

  const CreateSocialProof = useMutation({
    mutationFn: (FormData: createSocialProof) =>
      axios.post("/api/social-proof", FormData),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["socialProof"] }),
  });
  const {
    data: socialProofs,
    refetch: refetchSocialProofs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["socialProof"],
    queryFn: fetchSocialProof,
  });

  if (isError) {
    return <div>Error fetching social proofs</div>;
  }

  return (
    <main className="bg-[#fafafa] flex flex-col grow relative w-full  h-screen overflow-y-auto">
      {/* <header className="sticky z-20 top-0 shadow-md min-w-full bg-white border-b-[1px] border-[#dadada] min-h-[86px]  mb-0"> */}
      <header className="sticky z-20 top-0 shadow-md min-w-full justify-center items-center  flex bg-[#ffffff] border-b-[1px] border-[#dadada] min-h-[86px]  mb-0">
        <ul className="flex flex-wrap absolute right-4 justify-right items-center max-w-5xl">
          {/* <Link href={"/social-proofs/new-proof"}>
            {" "}
            <APPButton
              types={"button"}
              classname="px-10"
              text={"New Proof"}
            />{" "}
          </Link> */}
          <Button onPress={onOpen} color="primary">
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
                  <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col gap-[10px]  ">
                        {" "}
                        <div>
                          <AppInput
                            type="text"
                            label=""
                            placeholder="Proof Title"
                            {...register("prooftitle")} // Make sure to include this line
                            classname="w-full text-sm placeholder:text-sm h-[40px] tracking-[-0.015em]"
                          />
                        </div>
                        <div className="w-full ">
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
                            classname="w-full text-sm placeholder:text-sm h-[40px] "
                            placeholder="Add tags"
                          />
                        </div>
                        <div className="flex min-will gap-2 mb-1  ">
                          <div className="w-[33%]">
                            <AppInput
                              type={"text"}
                              label={""}
                              {...register("platform")}
                              classname=" w-full text-sm placeholder:text-sm h-[40px] "
                              placeholder="Platform"
                            />
                          </div>
                          <div className="w-[66%]">
                            <AppInput
                              type={"text"}
                              label={""}
                              {...register("postlink")}
                              classname="w-full text-sm placeholder:text-sm h-[40px] "
                              placeholder="Post Link"
                            />
                          </div>
                        </div>
                        {/* <div className="w-full flex flex-col ">
                          <div className="">
                            <AppTextarea
                              placeholder="Comment...."
                              {...register("comment")}
                              className="placeholder:text-[#666666] "
                            />
                            <div className="flex justify-end gap-2 items-center w-full">
                              <button
                                type="button"
                                onClick={() => handleComment()}
                                className="text-xs font-semibold text-[#4E71DA] "
                              >
                                Add Comment
                              </button>
                            </div>
                          </div>

                          {comment.map((c) => (
                            <div key={c.id} className="">
                              <AppTextarea
                                placeholder="Comment...."
                                value={c.text}
                                onChange={(e) => {
                                  const updatedComments = comment.map(
                                    (commentItem) =>
                                      commentItem.id === c.id
                                        ? {
                                            ...commentItem,
                                            text: e.target.value,
                                          }
                                        : commentItem
                                  );
                                  setComment(updatedComments);
                                }}
                                className="placeholder:text-[#666666] "
                              />
                              <div className="flex justify-end gap-2 items-center w-full">
                                <button
                                  type="button"
                                  onClick={() => handleCommentDelete(c.id)}
                                  className="text-xs font-semibold text-[#E51010] "
                                >
                                  Delete Comment
                                </button>
                              </div>
                            </div>
                          ))}
                        </div> */}
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
                          {comments
                            ?.map((c, index) => (
                              <div key={index} className="">
                                <textarea
                                  placeholder="Comment...."
                                  value={c.text}
                                  onChange={(e) =>
                                    handleCommentEdit(index, e.target.value)
                                  }
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
                            .reverse()}
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
                        </div>
                        {/* <div className="w-full bg-red-300 min-w-full flex flex-col">
                          <div className="">
                            <AppTextarea
                              placeholder="Comment...."
                              {...register("comment")}
                              value={mainComment}
                              onChange={(e) => setMainComment(e.target.value)}
                              className="placeholder:text-[#666666] w-full "
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

                          {comments &&
                            comments.map((c) => (
                              <div key={c.id} className="">
                                <AppTextarea
                                  placeholder="Comment...."
                                  value={c.text}
                                  disabled
                                  onChange={(e) =>
                                    setMainComment(e.target.value)
                                  }
                                  className="placeholder:text-[#666666] w-full rounded-md h-full border-[1px] border-gray-300 p-3 "
                                />
                                <div className="flex justify-end gap-2 items-center w-full">
                                  <button
                                    type="button"
                                    onClick={() => handleCommentDelete(c.id)}
                                    className="text-xs font-semibold text-[#E51010]"
                                  >
                                    Delete Comment
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div> */}
                        <div className="">
                          <TipTapEditor
                            onEditorContentChange={onEditorChange2}
                          />
                        </div>
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
                            <div
                              key={index}
                              className="flex gap-3 items-center"
                            >
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
        </ul>
      </header>
      <main className="block  ">
        <div className="my-5 mx-auto w-full  max-w-5xl">
          <div className="mb-4 w-full"></div>
          <div className="p-4 mb-4 bg-white shadow-md border-[1px] border-[#dadada]  rounded-md overflow-hidden">
            <div className="w-full flex  justify-between mb-4">
              <span className="overflow-hidden text-sm text-[#666] font-medium">
                Social Proof
              </span>
            </div>
            <div className="  min-h-[80vh]  flex flex-col w-full gap-4 justify-stretch items-stretch">
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
                            {/* <span className="font-medium hover:text- text-md text-[#4E71DA]"> */}
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
            </div>
          </div>
        </div>
        <div className="">
          {/* {SocialProofId && ( */}
          <AppSocialProofModal
            Open={openEditModal}
            refetchSocialProofs={refetchSocialProofs}
            Images={[]}
          />
          {/* )} */}
        </div>
      </main>
    </main>
  );
};

export default SocialProofs;
// "use client";
// import APPButton from "@/components/AppButton";

// import React, { ChangeEvent, useEffect, useRef, useState } from "react";
// import uploadFileToImageKit, { ImagekitResType } from "@/utils/imagekit";
// import {
//   Modal,
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
// import TipTapEditor from "@/components/TipTapEditor";
// import AppInput from "@/components/AppInput";
// import AppTextarea from "@/components/AppTextarea";

// import { SubmitHandler, useForm } from "react-hook-form";
// import axios from "axios";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useSocialProof } from "@/context/SocialProof";
// import router from "next/router";
// import AppSocialProofModal from "@/components/AppSocialProofModal";

// interface Comment {
//   id: number;
//   text: string;
// }
// interface createSocialProof {
//   ProofTitle: string;
//   AddTags: string;
//   Post: string;
//   Platform: string;
//   PostLink: string;
//   Comment: string[] | string;
//   Reality: string;
//   Images: string[] | null;
// }
// type FormData = {
//   prooftitle: string;

//   addtag: string;
//   comment: string[] | string;
//   platform: string;
//   postlink: string;
//   reality: string;
//   editor1Content: string;
//   images?: string[] | null;
//   editor2Content: string;
// };

// const SocialProofs = () => {
//   const firstInputRef = useRef<HTMLInputElement>(null);
//   const [uploadedImages, setUploadedImages] = useState<
//     (string | ImagekitResType)[]
//   >([]);

//   // const [uploadedImages, setUploadedImages] = useState<Array<File>| string>([]);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm<FormData>();

//   const [uploadedImage, setUploadedImage] = useState<ImagekitResType | null>(
//     null
//   );
//   const queryClient = useQueryClient();

//   const [selectedItem, setSelectedItem] = useState<string>(""); // State to manage selected item in sidebar
//   const {
//     SocialProofNames,
//     openEditModal,
//     setOpenEditModal,
//     selectedSocialProofId,
//     setSelectedSocialProofId,
//     fetchSocialProofById,
//     SocialProofId,
//     fetchSocialProofData,
//   } = useSocialProof();
//   const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
//   const [loading, setLoading] = useState(false);
//   const [value, setValue] = useState<string>("");
//   const [editor1Content, setEditor1Content] = useState("");
//   const [editor2Content, setEditor2Content] = useState("");

//   //set the data back from the database to the shwo the user
//   const [editor1, setEditor1] = useState("");

//   const onEditorChange1 = (content: string) => {
//     console.log("editor1 ", content);
//     setEditor1Content(content);
//   };

//   const onEditorChange2 = (content: string) => {
//     console.log("editor2 ", content);
//     setEditor2Content(content);
//   };
//   // const [openEditModal, setOpenEditModal] = useState(false);

//   const [scrollBehavior, setScrollBehavior] = React.useState<
//     ModalProps["scrollBehavior"]
//   >("inside");

//   const [mainComment, setMainComment] = useState<string>("");
//   const [comments, setComments] = useState<Comment[]>([]);
//   const handleComment = () => {
//     const newComment: Comment = {
//       id: comments.length + 1,
//       text: mainComment,
//     };

//     // Create a new array with the new comment object
//     setComments((prevComments) => [...prevComments, newComment]);

//     // Clear the input field
//     setMainComment("");
//   };
//   const handleCommentDelete = (id: number) => {
//     if (comments) {
//       const updatedComments = comments.filter((comment) => comment.id !== id);
//       setComments(updatedComments);
//     }
//   };
//   const fetchSocialProof = async () => {
//     const response = await axios.get(`/api/social-proof`);
//     return response.data; // Return the data property
//   };
//   const {
//     data: socialProofs,
//     refetch: refetchSocialProofs,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["socialProof"],
//     queryFn: fetchSocialProof,
//   });

//   if (isError) {
//     return <div>Error fetching social proofs</div>;
//   }

//   const CreateSocialProof = useMutation({
//     mutationFn: (FormData: createSocialProof) =>
//       axios.post("/api/social-proof", FormData),
//     onSettled: () =>
//       queryClient.invalidateQueries({ queryKey: ["socialProof"] }),
//   });

//   const onSubmit: SubmitHandler<FormData> = async (data, events) => {
//     events?.preventDefault();
//     setLoading(true);
//     // Access form data using the correct property names
//     console.table(data);
//     const {
//       prooftitle,

//       addtag,

//       platform,
//       postlink,

//       // editor1Content,
//       // editor2Content,
//     } = data;

//     let additionalComments: string[] = [];
//     if (comments && comments.length > 0) {
//       additionalComments = comments.map((comment) => comment.text);
//       console.log(additionalComments);
//     }

//     // Combine the main comment and additional comments into a single array
//     const allComments = [mainComment, ...additionalComments];

//     let imagess: string[] = uploadedImages.map((img: any) => img?.url);
//     console.log(imagess);
//     console.log(editor1Content, "this is e", editor2Content);
//     const formData = {
//       ProofTitle: prooftitle,
//       AddTags: addtag,
//       Post: editor1Content,
//       Platform: platform,
//       PostLink: postlink,
//       Comment: allComments,
//       Reality: editor2Content,
//       Images: imagess,
//     };
//     try {
//       CreateSocialProof.mutate(formData);
//       // If the mutation is successful, you can refetch the data
//       // await refetchSocialProofs();

//       setLoading(false);
//       onClose();
//       reset();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setLoading(false);
//     }
//     // axios
//     //   .post(`/api/social-proof`, formData)
//     //   .then((response) => {
//     //     console.log("POST Response:", response);
//     //     // Close the modal after successful submission
//     //   })

//     //   .catch((error) => {
//     //     console.error("Error submitting form:", error);
//     //     // Handle error state or display error message to the user
//     //   });

//     // Assuming you have a `reset` function from the `useForm` hook
//   };
//   // const getSocialProofbyId = async () => {
//   //   const response = await axios.get(`/api/social-proof/${getSocialProofbyId}`);
//   //   return response.data; // Return the data property
//   // };
//   // const {
//   //   data: socialProofsbyid,
//   //   refetch: refetchSocialProofsbyid,
//   //   isLoading: socilaproofsbyidloading,
//   //   isError: socialproofserror,
//   // } = useQuery({
//   //   queryKey: ["getsocialproof"],
//   //   queryFn: getSocialProofbyId,
//   //   enabled: false,
//   // });

//   const deleteImage = (index: number): void => {
//     const updatedImages = [...uploadedImages];
//     updatedImages.splice(index, 1);
//     setUploadedImages(updatedImages);
//   };
//   const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
//       try {
//         // Assume uploadedImage contains the API response
//         const uploadedImage = await uploadFileToImageKit({
//           file,
//           folder: "socialproof_Logo",
//           uploadUrl: process.env.IMAGEKIT_API_UPLOAD_URL!, // Pass the ImageKit upload URL here
//         });

//         // Construct the full image URL
//         // const imageUrl = `${uploadedImage.urlEndpoint}/${uploadedImage.folder}/${file.name}`;

//         // console.log("Image uploaded successfully. Image URL:", imageUrl);

//         setUploadedImages((prevImages) => [...prevImages, uploadedImage]);
//         console.log("this is actual url", uploadedImage);
//         setUploadedImage(uploadedImage);
//         // Handle the imageUrl as needed in your application
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         // Handle the error, show a message to the user, etc.
//       }
//     }
//   };

//   // ... (existing code)
//   const {
//     data: socialProofsofId,
//     refetch: refetchSocialProofsbyid,
//     isLoading: socialproofmodalloading,
//     isError: socialproofmodalerror,
//   } = useQuery({
//     queryKey: ["socialProofbyId"],
//     queryFn: fetchSocialProofById,
//     enabled: false,
//   });

//   const handleSocialProofClick = async (socialproofId: string) => {
//     try {
//       // Set the selected social proof ID
//       setSelectedSocialProofId(socialproofId);

//       // Check if the modal is open and the selected social proof ID is set
//       // if (socialproofId) {
//       //   // If not already open, fetch the data
//       //   refetchSocialProofsbyid();
//       //   // Toggle the modal state
//       // } else {
//       //   // If already open, close the modal
//       setOpenEditModal((prev) => !prev);
//       // }
//     } catch (error) {
//       console.error("Error fetching social proof by ID:", error);
//     }
//   };
//   // useEffect(() => {
//   //   const fetchSocialProofById = async () => {
//   //     try {
//   //       setLoading(true);
//   //       if (selectedSocialProofId) {
//   //         const response = await axios.get(
//   //           `/api/social-proof/${selectedSocialProofId}`
//   //         );
//   //         setSocialProofData(response.data);
//   //         console.log(response.data);
//   //       }
//   //     } catch (error) {
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchSocialProofById();
//   // }, [selectedSocialProofId]);
//   useEffect(() => {
//     console.log("Updated editor2 content: ", editor2Content);
//     console.log("Updated editor2 content: ", editor1Content);
//   }, [editor2Content, editor1Content]);

//   return (
//     <main className="bg-[#fafafa] flex flex-col grow relative w-full  h-screen overflow-y-auto">
//       {/* <header className="sticky z-20 top-0 shadow-md min-w-full bg-white border-b-[1px] border-[#dadada] min-h-[86px]  mb-0"> */}
//       <header className="sticky z-20 top-0 shadow-md min-w-full justify-center items-center  flex bg-[#ffffff] border-b-[1px] border-[#dadada] min-h-[86px]  mb-0">
//         <ul className="flex flex-wrap absolute right-4 justify-right items-center max-w-5xl">
//           {/* <Link href={"/social-proofs/new-proof"}>
//             {" "}
//             <APPButton
//               types={"button"}
//               classname="px-10"
//               text={"New Proof"}
//             />{" "}
//           </Link> */}
//           <Button onPress={onOpen}>new proof</Button>

//           <Modal
//             isOpen={isOpen}
//             size={"3xl"}
//             onOpenChange={onOpenChange}
//             scrollBehavior={scrollBehavior}
//           >
//             <ModalContent>
//               {(onClose) => (
//                 <>
//                   <ModalHeader className="flex flex-col gap-1">
//                     Social Proof
//                   </ModalHeader>
//                   <ModalBody>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                       <div className="flex flex-col gap-[10px]  ">
//                         {" "}
//                         <div>
//                           <AppInput
//                             type="text"
//                             label=""
//                             placeholder="Proof Title"
//                             {...register("prooftitle")} // Make sure to include this line
//                             classname="w-full text-sm placeholder:text-sm h-[40px] tracking-[-0.015em]"
//                           />
//                         </div>
//                         <div className="w-full ">
//                           <TipTapEditor
//                             onEditorContentChange={onEditorChange1}
//                             editorcontent={editor1}
//                           />
//                         </div>
//                         <div>
//                           <AppInput
//                             type={"text"}
//                             label={""}
//                             {...register("addtag")}
//                             classname="w-full text-sm placeholder:text-sm h-[40px] "
//                             placeholder="Add tags"
//                           />
//                         </div>
//                         <div className="flex min-will gap-2 mb-1  ">
//                           <div className="w-[33%]">
//                             <AppInput
//                               type={"text"}
//                               label={""}
//                               {...register("platform")}
//                               classname=" w-full text-sm placeholder:text-sm h-[40px] "
//                               placeholder="Platform"
//                             />
//                           </div>
//                           <div className="w-[66%]">
//                             <AppInput
//                               type={"text"}
//                               label={""}
//                               {...register("postlink")}
//                               classname="w-full text-sm placeholder:text-sm h-[40px] "
//                               placeholder="Post Link"
//                             />
//                           </div>
//                         </div>
//                         {/* <div className="w-full flex flex-col ">
//                           <div className="">
//                             <AppTextarea
//                               placeholder="Comment...."
//                               {...register("comment")}
//                               className="placeholder:text-[#666666] "
//                             />
//                             <div className="flex justify-end gap-2 items-center w-full">
//                               <button
//                                 type="button"
//                                 onClick={() => handleComment()}
//                                 className="text-xs font-semibold text-[#4E71DA] "
//                               >
//                                 Add Comment
//                               </button>
//                             </div>
//                           </div>

//                           {comment.map((c) => (
//                             <div key={c.id} className="">
//                               <AppTextarea
//                                 placeholder="Comment...."
//                                 value={c.text}
//                                 onChange={(e) => {
//                                   const updatedComments = comment.map(
//                                     (commentItem) =>
//                                       commentItem.id === c.id
//                                         ? {
//                                             ...commentItem,
//                                             text: e.target.value,
//                                           }
//                                         : commentItem
//                                   );
//                                   setComment(updatedComments);
//                                 }}
//                                 className="placeholder:text-[#666666] "
//                               />
//                               <div className="flex justify-end gap-2 items-center w-full">
//                                 <button
//                                   type="button"
//                                   onClick={() => handleCommentDelete(c.id)}
//                                   className="text-xs font-semibold text-[#E51010] "
//                                 >
//                                   Delete Comment
//                                 </button>
//                               </div>
//                             </div>
//                           ))}
//                         </div> */}
//                         <div className="w-full flex flex-col">
//                           <div className="">
//                             <AppTextarea
//                               placeholder="Comment...."
//                               {...register("comment")}
//                               value={mainComment}
//                               onChange={(e) => setMainComment(e.target.value)}
//                               className="placeholder:text-[#666666] "
//                             />
//                             <div className="flex justify-end gap-2 items-center w-full">
//                               <button
//                                 type="button"
//                                 onClick={() => handleComment()}
//                                 className="text-xs font-semibold text-[#4E71DA]"
//                               >
//                                 Add Comment
//                               </button>
//                             </div>
//                           </div>

//                           {comments &&
//                             comments.map((c) => (
//                               <div key={c.id} className="">
//                                 <AppTextarea
//                                   placeholder="Comment...."
//                                   value={c.text}
//                                   disabled
//                                   onChange={(e) =>
//                                     setMainComment(e.target.value)
//                                   }
//                                   className="placeholder:text-[#666666] "
//                                 />
//                                 <div className="flex justify-end gap-2 items-center w-full">
//                                   <button
//                                     type="button"
//                                     onClick={() => handleCommentDelete(c.id)}
//                                     className="text-xs font-semibold text-[#E51010]"
//                                   >
//                                     Delete Comment
//                                   </button>
//                                 </div>
//                               </div>
//                             ))}
//                         </div>
//                         <div className="">
//                           <TipTapEditor
//                             onEditorContentChange={onEditorChange2}
//                           />
//                         </div>
//                       </div>
//                       <div className="flex w-full py-5 items-end justify-end   gap-10">
//                         <label className="px-3 flex gap-1 py-2 text-[12.5px] text-[#666666] font-medium bg-transparent border-[1px] border-gray-300 rounded-md cursor-pointer">
//                           <span>Add</span>
//                           <span>Image</span>
//                           <input
//                             type="file"
//                             onChange={uploadAvatar}
//                             className="hidden"
//                             accept=".jpg, .jpeg, .png"
//                           />
//                         </label>
//                         <div className="flex flex-col gap-3 w-full">
//                           {uploadedImages.map((image: any, index) => (
//                             <div
//                               key={index}
//                               className="flex gap-3 items-center"
//                             >
//                               <span className="text-[12.5px] w-full overflow-x-hidden">
//                                 {image.name}
//                               </span>
//                               <button
//                                 className="text-red-500 text-[12.5px]"
//                                 onClick={() => deleteImage(index)}
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           ))}
//                           {errors.images && (
//                             <span className="text-red-500">
//                               {errors.images.message}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                       <div className="w-full  sticky -bottom-2 h-full min-w-full bg-white pt-5 py-2 z-50 flex flex-col justify-end">
//                         <div className=" flex w-full justify-end items-end">
//                           <APPButton
//                             classname="flex items-center w-20  justify-center capitalize rounded-xl bg-blue-600 text-white"
//                             type="submit"
//                             text={"Save"}
//                             loading={loading}
//                             forwardimage
//                           />
//                         </div>
//                       </div>
//                     </form>
//                   </ModalBody>
//                 </>
//               )}
//             </ModalContent>
//           </Modal>
//         </ul>
//       </header>
//       <main className="block  ">
//         <div className="my-5 mx-auto w-full  max-w-5xl">
//           <div className="mb-4 w-full"></div>
//           <div className="p-4 mb-4 bg-white shadow-md border-[1px] border-[#dadada]  rounded-md overflow-hidden">
//             <div className="w-full flex  justify-between mb-4">
//               <span className="overflow-hidden text-sm text-[#666] font-medium">
//                 Social Proof
//               </span>
//             </div>
//             <div className="  min-h-[80vh]  flex flex-col w-full gap-4 justify-stretch items-stretch">
//               {socialProofs && (
//                 <>
//                   {socialProofs.socialproofs
//                     .map((socialproof: any, idx: any) => (
//                       <div key={idx} className="text-[#4766cc]">
//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleSocialProofClick(socialproof._id || "")
//                           }
//                         >
//                           <span className="font-medium font-sans hover:text- text-md text-blue-500">
//                             {/* <span className="font-medium hover:text- text-md text-[#4E71DA]"> */}
//                             {socialproof.ProofTitle}
//                           </span>
//                         </button>
//                       </div>
//                     ))
//                     .reverse()}
//                   {socialProofs.isFetching && (
//                     <div>Updating in the background...</div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="">
//           {/* {SocialProofId && ( */}
//           <AppSocialProofModal Open={openEditModal} Images={[]} />
//           {/* )} */}
//         </div>
//       </main>
//     </main>
//   );
// };

// export default SocialProofs;
