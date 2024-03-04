import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root  open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
          bg-neural-900/90
          backdrop-blur-sm
          fixed inset-0
          z-50
          "
        >
          <Dialog.Content
            className="
        fixed
        drop-shadow-md
        border 

        border-white
        top-[50%]
        left-[50%]
        
        h-screen
        md:h-auto
        md:max-h-[85vh]
        w-full
        md:w-[90vw]
        md:max-w-[750px]
        translate-x-[-50%]
    
        translate-y-[-50%]
        rounded-md
        overflow-y-auto
        bg-white
        p-[25px]
        
        focus:outline-none
        "
          >
            <Dialog.Title
              className="
          text-xl
          text-start
          font-bold
        
          mb-4"
            >
              {title}
            </Dialog.Title>
            
            <div>{children}</div>
            <Dialog.Close asChild>
              <button
                className="
              text-neutral-700
              hover:text-black
              top-[10px]
              absolute
              right-[10px]
              inline-flex
              h-[25px]
              w-[25px]
              appearance-none
              items-center
              rounded-full
              focus:outline-none
              "
              >
                <IoMdClose />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;