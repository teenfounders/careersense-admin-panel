// "use client";
// import React, { useRef, useState } from "react";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import TipTapMenuBar from "./TipTapMenuBar";
// type Props = {
//   onEditorContentChange: (content: string) => void;
//   editorcontent?: string;
// };

// const TipTapEditor = ({ onEditorContentChange,editorcontent }: Props) => {
//   const [editorState, setEditorState] = React.useState("");
//   const editor = useEditor({
//     autofocus: true,
//     extensions: [StarterKit],
//     content: editorState,
//     onUpdate: ({ editor }) => {
//       setEditorState(editor.getHTML());
//     },
//   });
//   React.useEffect(() => {
//     if (editor) {
//       const jsonContent = editor.getJSON();
//       const jsonString = JSON.stringify(jsonContent);
//       onEditorContentChange(jsonString);
//     }
//     if (editorcontent) {
//       setEditorState(JSON.parse(editorcontent))
//     }

//   }, [editor, onEditorContentChange,editorcontent]);

//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <div
//       className={`max-w-screen-2xl h-[150px] rounded-l-xl overflow-hidden overflow-y-auto overflow-x-hidden border-2 outline-none focus:border-blue-500 transition duration-300 ${
//         isFocused ? "border-black rounded-xl" : "border-gray-300"
//       }`}
//       // Set isFocused to true when the editor is clicked
//       onBlur={() => setIsFocused((prev) => !prev)}
//       onFocus={() => setIsFocused((prev) => !prev)}
//     >
//       {/* <div className=" max-w-screen-2xl h-[200px] rounded-l-md overflow-hidden overflow-y-auto overflow-x-hidden border-2 outline-focus"> */}
//       <div className="flex sticky z-40 top-0 ">
//         {editor && <TipTapMenuBar editor={editor} />}
//       </div>
//       <div className="prose px-3  ">
//         <EditorContent
//           editor={editor}
//           className="prose-h-2xl min-h-10 prose-xs leading-5"
//         />
//       </div>
//     </div>
//   );
// };

// export default TipTapEditor;

// // add this to the database in the form of json.string and when get the response from the database
// //pasrs the json and set to the editor with with parse string to get back the content of the string as user configured```//

// // @dev
// // const jsonStringFromServer = '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Hello, World!"}]}]}';

// // // Parse the JSON string into a JavaScript object
// // const jsonContent = JSON.parse(jsonStringFromServer);

// // // Set the parsed JSON object as the content of the editor
// // editor.commands.setContent(jsonContent);
// // In this example, jsonStringFromServer is the JSON string you received from the server. You can parse this string using JSON.parse() to obtain a JavaScript object (jsonContent). Then, you can use the setContent() method provided by Tiptap's editor to set the content of the editor to the parsed JSON object.

// // Make sure to handle any errors that might occur during parsing, as JSON.parse() can throw an error if the input string is not valid JSON. You can use a try-catch block to handle such errors:

// // javascript
// // Copy code
// // try {
// //   const jsonContent = JSON.parse(jsonStringFromServer);
// //   editor.commands.setContent(jsonContent);
// // } catch (error) {
// //   console.error("Error parsing JSON:", error);
// // }```
"use client";
import React, { useEffect, useState } from "react";
import { EditorConsumer, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";

type Props = {
  onEditorContentChange: (content: string) => void;
  editorcontent?: string;
};

const TipTapEditor = ({ onEditorContentChange, editorcontent }: Props) => {
  const [editorState, setEditorState] = useState("");
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  console.log(editorState);
  useEffect(() => {
    // const setContentFromServer = () => {
    try {
      if (editorcontent) {
        let jsonContentFromDatabase = editorcontent;
        const jsonContent: string = JSON.parse(jsonContentFromDatabase);
        editor?.commands.setContent(jsonContent);
        console.log(jsonContentFromDatabase);
      }
    } catch (error) {
      console.error("Error setting editor content:", error);
    }
    // };

    if (editor) {
      // setContentFromServer();
      const editorContent = editor.getHTML();
      console.log(editorContent);
      const jsonString = JSON.stringify(editorContent);
      console.log(jsonString);
      onEditorContentChange(jsonString);
    }
  }, [editor, onEditorContentChange, editorcontent]);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`max-w-screen-2xl h-[150px] rounded-l-xl overflow-hidden overflow-y-auto overflow-x-hidden border-2 outline-none focus:border-blue-500 transition duration-300 ${
        isFocused ? "border-black rounded-xl" : "border-gray-300"
      }`}
      onBlur={() => setIsFocused((prev) => !prev)}
      onFocus={() => setIsFocused((prev) => !prev)}
    >
      <div className="flex sticky z-40 top-0">
        {editor && <TipTapMenuBar editor={editor} />}
      </div>
      <div className="prose px-3">
        <EditorContent
          editor={editor}
          className="prose-h-2xl min-h-10 prose-xs leading-5"
        />
      </div>
    </div>
  );
};

export default TipTapEditor;
