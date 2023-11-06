"use client";
import APPButton from "@/components/AppButton";
import AppSearchLeftInput from "@/components/AppSearchLeftInput";
import { dummyItems } from "@/components/Sidebar";
import { jobcardContent } from "@/utils/postdata";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
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
import { register } from "module";
import { SubmitHandler, useForm } from "react-hook-form";
interface Comment {
  id: number;
  text: string;
}
type Props = {};
type FormData = {
  prooftitle: string;
  createpost: string;
  addtag: string;
  comment: string[] | string;
  platform: string;
  postlink: string;
  reality: string;
  editor1Content: string;
  editor2Content: string;
};

const SocialProofs = (props: Props) => {
  const [uploadedImages, setUploadedImages] = useState<Array<File>>([]);
  const [selectedItem, setSelectedItem] = useState<string>(""); // State to manage selected item in sidebar

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string>("");
  const [editor1Content, setEditor1Content] = useState("");
  const [editor2Content, setEditor2Content] = useState("");

  //set the data back from the database to the shwo the user
  const [editor1, setEditor1] = useState("");

  const onEditorChange1 = (content: string) => {
    console.log("editor1 ", content);
    setEditor1Content(content);
  };
  const onEditorChange2 = (content: string) => {
    setEditor2Content(content);
  };
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
  const handleCommentDelete = (id: number) => {
    if (comments) {
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data, events) => {
    events?.preventDefault();
    // const mainComment = data.comment;
    // Use the correct state variable holding the main comment textarea value

    let additionalComments: string[] = [];
    if (comments && comments.length > 0) {
      additionalComments = comments.map((comment) => comment.text);
      console.log(additionalComments);
    }

    // Combine the main comment and additional comments into a single array
    const allComments = [mainComment, ...additionalComments]; // Filter out undefined or falsy values

    const formData = {
      prooftitle: data.prooftitle,
      createpost: data.createpost,
      addtag: data.addtag,
      comment: allComments,
      platform: data.platform,
      postlink: data.platform,
      reality: data.reality,

      editor1Content: editor1Content,
      editor2Content: editor2Content,
    };
    console.log(formData);

    onClose();
  };

  const uploadAvatar = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files) {
      const newImages: File[] = Array.from(files);
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  const deleteImage = (index: number): void => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };

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
          <Button onPress={onOpen}>new proof</Button>

          <Modal
            isOpen={isOpen}
            size={"2xl"}
            onOpenChange={onOpenChange}
            scrollBehavior={scrollBehavior}
            className="w-[600px]"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Social Proof
                  </ModalHeader>
                  <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col gap-[30px]  ">
                        {" "}
                        <div>
                          <AppInput
                            type={"text"}
                            label={""}
                            placeholder="Proof Title"
                            {...register("prooftitle")}
                            classname="w-full"
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
                            classname="w-full"
                            placeholder="Add tags"
                          />
                        </div>
                        <div className="flex min-will gap-2 mb-1  ">
                          <div className="w-[33%]">
                            <AppInput
                              type={"text"}
                              label={""}
                              {...register("platform")}
                              classname=" w-full"
                              placeholder="Platform"
                            />
                          </div>
                          <div className="w-[66%]">
                            <AppInput
                              type={"text"}
                              label={""}
                              {...register("postlink")}
                              classname="w-full"
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
                        <div className="w-full flex flex-col">
                          <div className="">
                            <AppTextarea
                              placeholder="Comment...."
                              {...register("comment")}
                              value={mainComment}
                              onChange={(e) => setMainComment(e.target.value)}
                              className="placeholder:text-[#666666] "
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
                                  className="placeholder:text-[#666666] "
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
                        </div>
                        <div className="">
                          <TipTapEditor
                            onEditorContentChange={onEditorChange2}
                          />
                        </div>
                        <div className="flex w-full items-start gap-10">
                          <label className="px-3 flex gap-1 py-2 text-[12.5px] text-[#666666] font-medium bg-transparent border-[1px] border-gray-300 rounded-md cursor-pointer">
                            <span>Add</span>
                            <span>Logo</span>
                            <input
                              type="file"
                              name="avatar" // Provide a valid name attribute
                              onChange={uploadAvatar}
                              className="hidden"
                              accept=".jpg, .jpeg, .png"
                              multiple
                            />
                          </label>
                          <div className="flex flex-col gap-3 w-full">
                            {uploadedImages.map((image, index) => (
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
                          </div>
                        </div>
                      </div>
                      <div className="w-full m-3 flex justify-end">
                        <APPButton
                          classname="flex items-center w-20  justify-center capitalize rounded-xl bg-blue-600 text-white"
                          type="submit"
                          text={"Save"}
                          loading={loading}
                          forwardimage
                        />
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
                YOUR TOP JOB MATCHES ON UNTAPPED
              </span>
            </div>
            <div className="grid h-screen grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-auto gap-4 justify-stretch items-stretch"></div>
          </div>
        </div>
      </main>
    </main>
  );
};

export default SocialProofs;
