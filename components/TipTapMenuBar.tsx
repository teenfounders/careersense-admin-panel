import { Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Redo,
  Undo,
} from "lucide-react";

const TipTapMenuBar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex flex-wrap gap-4 rounded-t-md  px-3 justify-start items-center border-b-[1px] bg-black h-[44px] w-full">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "is-active bg-gray-400/40  h-5/6 rounded-md "
            : ""
        }
      >
        <Bold className="w-5 text-white h-6" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "is-active bg-gray-400/40  h-5/6 rounded-md"
            : ""
        }
      >
        <Italic className="w-5 text-white h-6" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "is-active bg-gray-400/40  h-5/6 rounded-md"
            : ""
        }
      >
        <Heading1 className="w-5 text-white h-6" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "is-active bg-gray-400/40  h-5/6 rounded-md"
            : ""
        }
      >
        <Heading2 className="w-5 text-white h-6" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "is-active bg-gray-400/40  h-5/6 rounded-md"
            : ""
        }
      >
        <List className="w-5 text-white h-6" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "is-active bg-gray-400/40  h-5/6 rounded-md"
            : ""
        }
      >
        <ListOrdered className="w-5 text-white h-6" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={
          editor.isActive("undo")
            ? "is-active bg-gray-400/40  h-5/6 rounded-md"
            : ""
        }
      >
        <Undo className="w-5 text-white h-6" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={
          editor.isActive("redo")
            ? "is-active bg-gray-400/40  h-5/6 rounded-md"
            : ""
        }
      >
        <Redo className="w-5 text-white h-6" />
      </button>
    </div>
  );
};

export default TipTapMenuBar;
