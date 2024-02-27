"use client";
import { Comments } from "@/utils/constant";
import Action from "./Action";
import { comment } from "postcss";
import { useState } from "react";

 
 
interface AppCommentProps {
  comments:Comments ;
//   handleInsertNode?: (commentId: number, item: any) => void;
//   handleDeleteNode?: (commentsId: number) => void;
}

const AppCommentNoReply: React.FC<AppCommentProps> = ({
//   handleInsertNode,
  comments,
//   handleDeleteNode,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [commentBody, setCommentBody] = useState("");
 
  const handleAdd = () => {
    // handleInsertNode(comments.id, commentBody);
    setCommentBody("");
    // let newComment = {
    //   id: Date.now().toString(),
    //   text: commentBody,
    //   replies: [],
    // };
    // handleAddComments(comments.id, newComment);
    setShowInput(false);
  };
  const onAddComment = () => {
    setShowInput(true);

    // handleInsertNode(comments.id, commentBody)
  };

  const handleCommentDelete = (commentId: number) => {
    // Implement delete logic here
    // handleDeleteNode(comments.id);
  };

  return (
    <div>
        {comments && 
      <div
      className={`${
          comments.id === 1 ? "inputContainer" : "commentContainer"
        }`}
        >
        {comments.id === 1 ? (
            <div className="flex flex-col items-end w-full">
            {/* <input
              type="text"
              className="placeholder:text-[#666666] w-full h-full rounded-md border-[1px] border-gray-300 p-3"
              value={commentBody}
              autoFocus
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="add comment"
              /> */}
            {/* <Action
              handleClick={handleAdd}
              className="flex flex-end text-sm text-blue-600 mt-1  justify-end cursor-pointer"
              type="Add Comment"
            /> */}
          </div>
        ) : (
            <>
            
            <div className="w-full font-manrope h-full bg-white  px-[30px] py-6">
         
            <span className="">
              {comments.name}
              
            </span>
            </div>
            {/* <div className="flex mt-[5px]">
              <Action
                handleClick={onAddComment}
                className="reply"
                type="REPLY"
                />
              <Action
                handleClick={handleCommentDelete}
                className="reply"
                type="DELETE"
                />
            </div> */}
                {/* <Action handleClick={() => {}} className="reply" type="EDIT" /> */}
          </>
        )}
      </div>
    }

      <div className="pl-[25px] border-l-2 border-l-gray-300  my-10 text-start">
        
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              placeholder="add reply.."
              onChange={(e) => setCommentBody(e.target.value)}
            />
            <Action className="reply" type="REPLY" handleClick={handleAdd} />
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                // if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}
        {comments?.items?.map((cmt) => {
     
          return (
            <>
                <div
                className={`absolute -top-8 left-4 aspect-square w-[24px] border-l-2 border-b-2 rounded-bl-xl border-black h-[90px]`}
              ></div>
            <AppCommentNoReply
              key={cmt.id}
              
              comments={cmt}
            />
      
              </>
          );
        })}
      </div>

    </div>
  );
};

export default AppCommentNoReply;