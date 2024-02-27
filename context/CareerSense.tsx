// "use client";
// import useEditMdoal from "@/hooks/useEditModal";
// import { selectionToInsertionEnd } from "@tiptap/react";
// import React, {
//   createContext,
//   useContext,
//   ReactNode,
//   useState,
//   useEffect,
// } from "react";

// interface SocialProofContextProps {
//   selectedCareerSenseId: string | null;
//   setSelectedCareerSenseId: React.Dispatch<React.SetStateAction<string | null>>;
//   openEditModal: boolean | false;

//   setOpenEditModal: React.Dispatch<React.SetStateAction<boolean | false>>;
// }

// const CareerSenseContext = createContext<SocialProofContextProps | undefined>(
//   undefined
//   );
  
//   export const CareerSenseProvider: React.FC<{ children: ReactNode }> = ({
//       children,
//     }) => {
//     const editmodal= useEditMdoal()
//   const [selectedCareerSenseId, setSelectedCareerSenseId] = useState<
//     string | null
//   >(null);

//   const [openEditModal, setOpenEditModal] = useState<boolean>(false);
 
//   //  const fetchSocialProofById = async () => {

//   //   };
//   // Fetch companies when the component mounts
 
//   return (
//     <CareerSenseContext.Provider
//       value={{
//         selectedCareerSenseId,
//         openEditModal,
//         setOpenEditModal,
//         setSelectedCareerSenseId,
//       }}
//     >
//       {children}
//     </CareerSenseContext.Provider>
//   );
// };

// export const useCarrerSense = (): SocialProofContextProps => {
//   const context = useContext(CareerSenseContext);
//   if (!context) {
//     throw new Error("useSocialProof must be used within a SocialProofProvider");
//   }
//   return context;
// };


"use client";
import useEditModal from "@/hooks/useEditModal"; // Corrected typo
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface SocialProofContextProps {
  selectedCareerSenseId: string | null;
  setSelectedCareerSenseId: React.Dispatch<React.SetStateAction<string | null>>;
  openEditModal: boolean; // Changed default value to false
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CareerSenseContext = createContext<SocialProofContextProps | undefined>(
  undefined
);

export const CareerSenseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const editModal = useEditModal(); // Corrected typo
  const [selectedCareerSenseId, setSelectedCareerSenseId] = useState<string | null>(
    null
  );

  const [openEditModal, setOpenEditModal] = useState<boolean>(false); // Changed default value to false

  return (
    <CareerSenseContext.Provider
      value={{
        selectedCareerSenseId,
        openEditModal,
        setOpenEditModal,
        setSelectedCareerSenseId,
      }}
    >
      {children}
    </CareerSenseContext.Provider>
  );
};

export const useCarrerSense = (): SocialProofContextProps => {
  const context = useContext(CareerSenseContext);
  if (!context) {
    throw new Error("useSocialProof must be used within a SocialProofProvider");
  }
  return context;
};
