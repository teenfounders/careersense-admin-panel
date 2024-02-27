// 'use client'
// import React, { useEffect, useState } from "react";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import TipTapMenuBar from "./TipTapMenuBar";

// type Props = {
//   onEditorContentChange: (content: string) => void;
//   editorcontent?: string;
// };

// const TipTapEditor = ({ onEditorContentChange, editorcontent }: Props) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//   });

//   useEffect(() => {
//     if (editorcontent && editor) {
//       try {
//         const jsonContentFromDatabase = JSON.parse(editorcontent);
//         editor.commands.setContent(jsonContentFromDatabase);
//       } catch (error) {
//         console.error("Error setting editor content:", error);
//         // Handle the error, e.g., log it or set a default content
//       }
//     }
//   }, [editor, editorcontent]);

//   const [isFocused, setIsFocused] = useState(false);

//   const handleBlur = () => {
//     if (editor) {
//       const editorContent = editor.getHTML();
//       const jsonString = JSON.stringify(editorContent);
//       onEditorContentChange(jsonString);
//     }
//   };

//   return (
//     <div
//       className={`max-w-screen-2xl h-[270px] rounded-l-xl overflow-hidden no-scrollbar overflow-y-auto overflow-x-hidden border-2 outline-none focus:border-blue-500 transition duration-300 ${
//         isFocused ? "border-black rounded-xl" : "border-gray-300"
//       }`}
//       onBlur={() => setIsFocused(false)}
//       onFocus={() => setIsFocused(true)}
//     >
//       <div className="flex sticky z-40 top-0">
//         {editor && <TipTapMenuBar editor={editor} />}
//       </div>
//       <div className="prose px-3  ">
//         {editor && (
//           <EditorContent
//             editor={editor}
//             className="prose-h-2xl min-h-15 prose-xs leading-[22px] text-[#484848] break-words font-normal text-sm"
//             onBlur={handleBlur}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TipTapEditor;
"use client";
// import React, { useEffect, useState } from "react";
// import { EditorConsumer, EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import TipTapMenuBar from "./TipTapMenuBar";

// type Props = {
//   onEditorContentChange: (content: string) => void;
//   editorcontent?: string;
// };

// const TipTapEditor = ({ onEditorContentChange, editorcontent }: Props) => {
//   const [editorState, setEditorState] = useState("");
//   const editor = useEditor({
//     autofocus: true,
//     extensions: [StarterKit],
//     content: editorState,
//     onUpdate: ({ editor }) => {
//       setEditorState(editor.getHTML());
//     },
//   });

// useEffect(() => {
//   // const setContentFromServer = () => {
//   try {
//     if (editorcontent) {
//       let jsonContentFromDatabase = editorcontent;
//       const jsonContent: string = JSON.parse(jsonContentFromDatabase);
//       editor?.commands.setContent(jsonContent);
//     }
//   } catch (error) {
//     console.error("Error setting editor content:", error);
//   }
//   // };

//   if (editor) {
//     // setContentFromServer();
//     const editorContent = editor.getHTML();

//     const jsonString = JSON.stringify(editorContent);

//     onEditorContentChange(jsonString);
//   }
// }, [editor, onEditorContentChange, editorcontent]);

//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <div
//       className={`max-w-screen-2xl h-[270px] rounded-l-xl overflow-hidden overflow-y-auto overflow-x-hidden border-2 outline-none focus:border-blue-500 transition duration-300 ${
//         isFocused ? "border-black rounded-xl" : "border-gray-300"
//       }`}
//       onBlur={() => setIsFocused((prev) => !prev)}
//       onFocus={() => setIsFocused((prev) => !prev)}
//     >
//       <div className="flex sticky z-40 top-0">
//         {editor && <TipTapMenuBar editor={editor} />}
//       </div>
//       <div className="prose px-3">
//         <EditorContent
//           editor={editor}
//           className="prose-h-2xl min-h-15 prose-xs leading-[22px] text-[#484848] break-words font-normal text-sm "
//         />
//       </div>
//     </div>
//   );
// };

// export default TipTapEditor;
import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";

type Props = {
  onEditorContentChange: (content: string) => void;
  editorcontent?: string;
};

const TipTapEditor = ({ onEditorContentChange, editorcontent }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
  });

  useEffect(() => {
    if (editorcontent && editor) {
      try {
        // const trimmedContent = editorcontent.replace(/\//g, '');
        const jsonContentFromDatabase = JSON.parse(editorcontent);
        editor.commands.setContent(jsonContentFromDatabase);
      } catch (error) {
        console.error("Error setting editor content:", error);
        // Handle the error, e.g., log it or set a default content
      }
    }
  }, [editor, editorcontent]);

  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    if (editor) {
      const editorContent = editor.getHTML();
      const jsonString = JSON.stringify(editorContent);
      onEditorContentChange(jsonString);
    }
  };

  return (
    <div
    className={`max-w-screen-2xl h-[270px] rounded-l-xl overflow-hidden overflow-y-auto overflow-x-hidden border-2 outline-none focus:border-blue-500 transition duration-300 ${
      isFocused ? "border-black rounded-xl" : "border-gray-300"
    }`}
    onBlur={() => setIsFocused(false)}
    onFocus={() => setIsFocused(true)}
  >
    <div className="flex sticky z-40 top-0">
      {editor && <TipTapMenuBar editor={editor} />}
    </div>
    <div className="prose px-3">
      {editor && (
        <EditorContent
          editor={editor}
          className="prose-h-2xl min-h-15 prose-xs leading-[22px] text-[#484848] break-words font-normal text-sm"
          onBlur={handleBlur}
        />
      )}
    </div>
  </div>
    // <div
    //   className={`max-w-screen-2xl h-[270px] rounded-l-xl overflow-hidden overflow-y-auto overflow-x-hidden border-2 outline-none focus:border-blue-500 transition duration-300 ${
    //     isFocused ? "border-black rounded-xl" : "border-gray-300"
    //   }`}
    //   onBlur={() => setIsFocused(false)}
    //   onFocus={() => setIsFocused(true)}
    // >
    //   <div className="flex sticky z-40 top-0">
    //     {editor && <TipTapMenuBar editor={editor} />}
    //   </div>
    //   <div className="prose px-3">
    //     {editor && (
    //       <EditorContent
    //         editor={editor}
    //         className="prose-h-2xl min-h-15 prose-xs leading-[22px] text-[#484848] break-words font-normal text-sm"
    //         onBlur={handleBlur}
    //       />
    //     )}
    //   </div>
    // </div>
  );
};

export default TipTapEditor;