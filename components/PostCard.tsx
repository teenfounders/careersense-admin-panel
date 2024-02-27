import React from "react";
import bookmark from "@/assets/bookmark1.svg";
import comment from "@/assets/commentimage.svg";
import reddit from "@/assets/reddit-icon 1 (1).png";
// import postcardimage from "@/assets/postcardimage.png";
import { Comments } from "@/utils/constant";
// import Comment from '@/components/Comment';
import imagedata from "../public/fullpostimage.png";
// import AppComment from "./AddComment";
import Image, { StaticImageData } from "next/image";
// ... other imports
import { IoIosInformationCircleOutline } from "react-icons/io";
import Link from "next/link";
import { useCarrerSense } from "@/context/CareerSense";
import useEditMdoal from '@/hooks/useEditModal';

type Props = {
   
  title?: string;
  tags?: string;
  comment?: Comments;
  post_brief?: string;
  image?: string[];
  post_link?:string;
  id?: string | any;
  image2?: string | StaticImageData;
};

const PostCard = (props: Props) => {
const {setSelectedCareerSenseId,openEditModal,selectedCareerSenseId }= useCarrerSense();
const editmodal = useEditMdoal();
  // console.log(props)
  const handleEdit = (id:string|any)=>{
    console.log('clicekd',editmodal.isOpen)
    editmodal.onOpen()
    console.log(selectedCareerSenseId)
    setSelectedCareerSenseId(id)
    // try {
    //   editmodal.onOpen();
    //   console.log('inside')
    // } catch (error) {
    //   console.error("Error fetching social proof by ID:", error);
    // }
  }
  
  return (
    <div className="bg-white border-2 flex flex-col items-start justify-between gap-y-4 tracking-tight border-gray-300 rounded-lg px-[30px] py-6 w-full  relative">
      {/* <div className="font-['Manrope'] g  font-[500] text-2xl text-[#141417] "> */}
      <div className="font-['Manrope'] flex justify-between w-full font-[500] text-2xl text-[#141417] ">
        <div className="">{props.title}</div>

        <div className="flex space-x-4 items-center  justify-center">
          <Link className="text-lg font-semibold" href={`/social-proofs/${props.id}`}>
             View
          </Link>
          <button type="button" onClick={()=> handleEdit(props.id)} className="text-lg hover:bg-slate-500/20 px-[6px] rounded-md cursor-pointer font-semibold" >
             Update
          </button>
          {props.image2 && (
            <Image
              src={reddit}
              width={100}
              height={100}
              className="w-8 object-cover"
              alt="image"
            />
          )}
        </div>
      </div>
      <h3 className="text-[#4E88D8] font-manrope text-xl font-[500]">
        {props.tags}
      </h3>
      <div className="w-full h-full flex flex-col gap-3 relative">
        <p className="text-[#3F3F42] text-[18px] leading-[1.6] font-[500] line-clamp-2 ">
          {props.post_brief}
        </p>

        {props.image && (
          <>
            {props.image.map((image: string, id: any) => (
      <div key={id} className="relative">
        <Image
          src={image}
          width={300}
          height={300}
          className="h-[200px] object-cover rounded-lg w-full"
          alt={`Image ${id}`}
        />
      </div>
    ))}
          </>
        )}
        {/* className="" */}
      </div>
      <div className="flex gap-4 items-start w-full h-full relative justify-start">
        {/* <Image
          src={''}
          width={30}
          className="w-fit h-fit object-cover"
          height={40}
          alt="comment"
        />
        <span className="max-w-[620px] px-2 py-1    border-[1px] border-[#D7D7D7] rounded-sm h-[32px] relative flex gap-1 items-center ">
          <Image
            src={''}
            width={30}
            className="w-fit h-fit object-cover"
            height={40}
            alt="comment"
          />
          <span className="text-base text-[#707680] ">
            {Object(props.comment).items.length  || 0}
          </span>
        </span> */}
      </div>
    </div>
  );
};

export default PostCard;
