// 'use client'
// import React ,{useEffect} from "react";
// import { EditorContent, useEditor, Editor } from '@tiptap/react';
// import StarterKit from "@tiptap/starter-kit";

// interface Props {
//   editorContent: string;
// }

// const TipTapContent: React.FC<Props> = ({ editorContent }) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     editable:false
//   }); 
  
//   useEffect(() => {
//         if (editorContent && editor) {
//           try {
//             const trimmedContent = editorContent.replace(/\//g, '');
//             const jsonContentFromDatabase = JSON.parse(trimmedContent);
//             editor.commands.setContent(jsonContentFromDatabase);
            
//           } catch (error) {
//             console.error("Error setting editor content:", error);
//             // Handle the error, e.g., log it or set a default content
//           }
//         }
//       }, [editor, editorContent]);
    
//   return (
//     <div className="max-w-screen-2xl h-fit rounded-l-xl overflow-hidden overflow-y-auto overflow-x-hidden border-2 outline-none transition duration-30">
//       <div className="prose px-3 " aria-readonly>
//         {editor && <EditorContent    editor={editor} content={editorContent} />}
//       </div>
//     </div>
//   );
// };

// export default TipTapContent;

'use client'
import React ,{useEffect} from "react";
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";
import { twMerge } from "tailwind-merge";
interface Props {
  editorContent: string;
  className?:string
}

const TipTapContent: React.FC<Props> = ({ editorContent,className }) => {
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
    <div className={twMerge(`max-w-screen-2xl prose px-3 h-fit rounded-l-xl overflow-hidden overflow-y-auto overflow-x-hidden border-2 outline-none transition duration-30`,className)}>
           <div className="prose px-3  " aria-readonly>
       
        {editor && <EditorContent    editor={editor} content={editorContent} />}
       </div>
    </div>
  );
};

export default TipTapContent;