'use client'
import React ,{useEffect} from "react";
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";

interface Props {
  editorContent: string;
}

const TipTapContent: React.FC<Props> = ({ editorContent }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editable:false
  }); 
  
  useEffect(() => {
        if (editorContent && editor) {
          try {
            const trimmedContent = editorContent.replace(/\//g, '');
            const jsonContentFromDatabase = JSON.parse(trimmedContent);
            editor.commands.setContent(jsonContentFromDatabase);
            
          } catch (error) {
            console.error("Error setting editor content:", error);
            // Handle the error, e.g., log it or set a default content
          }
        }
      }, [editor, editorContent]);
    
  return (
    <div className="max-w-screen-2xl h-fit rounded-l-xl overflow-hidden overflow-y-auto overflow-x-hidden border-2 outline-none transition duration-30">
      <div className="prose px-3 " aria-readonly>
        {editor && <EditorContent    editor={editor} content={editorContent} />}
      </div>
    </div>
  );
};

export default TipTapContent;
// 'use client'
// import React, { useEffect, useState } from "react";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import TipTapMenuBar from "./TipTapMenuBar";

// type Props = {
//   onEditorContentChange: (content: string) => void;
//   editorcontent?: string;
// };

// const TipTapContent = ({ onEditorContentChange, editorcontent }: Props) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//   });

//   useEffect(() => {
//     if (editorcontent && editor) {
//       try {
//         const jsonContentFromDatabase = JSON.stringify(editorcontent);
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
//       className={`max-w-screen-2xl h-fit rounded-l-xl overflow-hidden overflow-y-auto overflow-x-hidden border-2 outline-none focus:border-blue-500 transition duration-300 ${
//         isFocused ? "border-black rounded-xl" : "border-gray-300"
//       }`}
//       onBlur={() => setIsFocused(false)}
//       onFocus={() => setIsFocused(true)}
//     >
      
//       <div className="prose px-3">
//         {editor && (
//           <EditorContent
//             editor={editor}
//             className="prose-h-sm min-h-min prose-xs leading-[22px] text-[#484848] break-words font-normal text-sm"
//             onBlur={handleBlur}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TipTapContent;
