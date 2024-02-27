"use client";
import Action from "@/components/Action";
import { comment } from "postcss";
import { useState } from "react";

interface Comment {
  id: number;
  name?: string;
  items: Comment[];
}

interface AppCommentProps {
  comments: Comment;
  handleInsertNode: (commentId: number, item: any) => void;
  handleDeleteNode: (commentsId: number) => void;
}

const AppComment: React.FC<AppCommentProps> = ({
  handleInsertNode,
  comments,
  handleDeleteNode,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [commentBody, setCommentBody] = useState("");

  const handleAdd = () => {
    handleInsertNode(comments.id, commentBody);
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
    handleDeleteNode(comments.id);
  };

  return (
    <div>
      <div
        className={`${
          comments.id === 1 ? "inputContainer" : "commentContainer"
        }`}
      >
        {comments.id === 1 ? (
          <div className="flex flex-col items-end w-full">
            <textarea
             
              className="placeholder:text-[#666666] w-full text-[15px] h-full rounded-md border-[1px] border-gray-300 p-3"
              value={commentBody}
              autoFocus
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="add comment"
            />
            <Action
              handleClick={handleAdd}
              className="flex flex-end text-sm text-blue-600 mt-1  justify-end cursor-pointer"
              type="Add Comment"
            />
          </div>
        ) : (
          <>
            <span className="text-[15px]" style={{ wordWrap: "break-word" }}>
              {comments.name}
            </span>
            <div className="flex gap-5 mt-[5px]">
              <Action
                handleClick={onAddComment}
                className="reply !text-blue-600"
                type="REPLY"
              />
              {/* <Action handleClick={() => {}} className="reply" type="EDIT" /> */}
              <Action
                handleClick={handleCommentDelete}
                className="reply !text-red-600"
                type="DELETE"
              />
            </div>
          </>
        )}
      </div>

      <div className="pl-[25px]">
        {showInput && (
          <div className="inputContainer">
            <textarea
              
              className="inputContainer__input text-[15px] "
              autoFocus
              placeholder="add reply.."
              onChange={(e) => setCommentBody(e.target.value)}
            />
            <div className="flex gap-5">

            <Action className="reply !text-blue-600" type="REPLY" handleClick={handleAdd} />
            <Action
              className="reply !text-red-500"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                // if (!comment?.items?.length) setExpand(false);
              }}
              />
              </div>
          </div>
        )}
        {comments?.items?.map((cmt) => {
          return (
            <AppComment
              key={cmt.id}
              handleInsertNode={handleInsertNode}
              // handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comments={cmt}
            />
          );
        })}
      </div>

      {/* <div className="">
        <h3 className="placeholder:text-[#666666] w-full h-full rounded-md border-[1px] border-gray-300 p-3">
          {comments.text}
        </h3>
        {showInput && (
          <input
            type="text"
            autoFocus
            onChange={(e) => setCommentBody(e.target.value)}
          />
        )}
        {showInput ? (
          <div>
            <button onClick={handleAdd}>Add</button>
            <button onClick={() => setShowInput(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setShowInput((prev) => !prev)}>Reply</button>
            <button onClick={() => handleCommentDelete(comments.id)}>
              Delete
            </button>
          </div>
        )}
      </div>
      <div style={{ paddingLeft: "25px" }}>
        {comments?.replies?.map((ele, index) => (
          <AppComment key={index} comments={ele} />
        ))}
      </div> */}
    </div>
  );
};

export default AppComment;
