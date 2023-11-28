// import React, { ChangeEvent, TextareaHTMLAttributes } from "react";
// import Image from "next/image";
// import { twMerge } from "tailwind-merge";
// interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
//   label?: string;
//   error?: string;
//   classname?: string;
//   placeholder?: string;
//   onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
// }
// import requiredImg from "@/assets/svgexport-5.svg";
// const Textarea: React.FC<TextareaProps> = ({
//   label,
//   error,
//   onChange,
//   placeholder,
//   classname,
// }) => {
//   return (
//     <div className="">
//       {label && (
//         <label className="block text-sm font-semibold text-gray-600">
//           {label}
//         </label>
//       )}
//       <textarea
//         placeholder={placeholder}
//         className={twMerge(
//           "text-base w-full  font-normal py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-black focus:border-2 transition ease-in",
//           classname
//         )}
//         onChange={onChange}
//       />
//       {error && (
//         <p className="text-sm flex gap-2 flex-start item-center justify-start text-red-500 mt-1">
//           <Image
//             src={requiredImg}
//             width={10}
//             height={1}
//             className="w-5 bg-red-800 rounded-full"
//             alt="requried"
//           />
//           <span>{label} is required</span>
//         </p>
//       )}{" "}
//     </div>
//   );
// };

// export default Textarea;
"use client";
import React, {
  ChangeEvent,
  TextareaHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import requiredImg from "@/assets/svgexport-5.svg";
import { FieldErrors } from "react-hook-form";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  classname?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = (
  { label, error, onChange, placeholder, classname, ...props },
  ref
) => {
  return (
    <div className="">
      {label && (
        <label className="block text-sm font-semibold text-gray-600">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        className={twMerge(
          "text-base w-full font-normal py-2 px-4 border-[1px] border-gray-300 rounded focus:outline-none focus:border-black focus:border-2 transition ease-in",
          classname
        )}
        ref={ref}
        onChange={onChange}
        {...props}
      />
      {error && (
        <p className="text-sm flex gap-2 flex-start item-center justify-start text-red-500 mt-1">
          <Image
            src={requiredImg}
            width={10}
            height={1}
            className="w-5 bg-red-800 rounded-full"
            alt="required"
          />
          <span>{label} is required</span>
        </p>
      )}
    </div>
  );
};

export default forwardRef(Textarea);
