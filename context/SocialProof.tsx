"use client";
import { fetchSocialProof } from "@/lib/action";
import { ISocialProof } from "@/utils/types";
import { useDisclosure } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ObjectId } from "mongoose";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
interface createSocialProof {
  ProofTitle?: string;
  AddTags?: string;
  Post?: string;
  Platform?: string;
  PostLink?: string;
  Comment?: string[] | string;
  Reality?: string;
  Images: string[] | null | undefined;
  Open: boolean;
}
interface SocialProofContextProps {
  selectedSocialProofId: string | null;
  setSelectedSocialProofId: React.Dispatch<React.SetStateAction<string | null>>;
  SocialProofNames: ISocialProof[];
  fetchSocialProofData: () => void;
  setSocialProofId: React.Dispatch<
    React.SetStateAction<createSocialProof | undefined>
  >;
  fetchSocialProofById: () => void;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  openEditModal: boolean;
  SocialProofId: createSocialProof | undefined;
  onClose: () => void;
}

const SocialProofContext = createContext<SocialProofContextProps | undefined>(
  undefined
);

export const SocialProofProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedSocialProofId, setSelectedSocialProofId] = useState<
    string | null
  >(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [SocialProofNames, setSocialProofNames] = useState<ISocialProof[]>([]);
  const [SocialProofId, setSocialProofId] = useState<
    createSocialProof | undefined
  >();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const { data: SocialProofNamess, isLoading, isError } = useQuery({
    queryKey: ["SocialProofnames"],
    queryFn: fetchSocialProof,
  });
  const fetchSocialProofData = async () => {
    try {
      const data = await fetchSocialProof();
      setSocialProofNames(data.data.socialproofs);

      // Update the state with fetched companies
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };
  const fetchSocialProofById = async () => {
    try {
      setSocialProofId((prev) => undefined);
      // console.log(SocialProofId);
      const response = await axios

        .get(`/api/social-proof/${selectedSocialProofId}`)
        .then((response: any) => {
          // console.log(response.data);
          setSocialProofId(response.data);
        });

      // Update the state with fetched companies
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };
  //  const fetchSocialProofById = async () => {

  //   };
  // Fetch companies when the component mounts
  useEffect(() => {
    fetchSocialProofData(); // Call the fetchData function when the component mounts
  }, [setSocialProofNames, SocialProofNames]);

  return (
    <SocialProofContext.Provider
      value={{
        selectedSocialProofId,
        setSelectedSocialProofId,
        setSocialProofId,
        SocialProofNames,
        fetchSocialProofById,

        openEditModal,
        setOpenEditModal,
        SocialProofId,
        fetchSocialProofData,

        onClose,
      }}
    >
      {children}
    </SocialProofContext.Provider>
  );
};

export const useSocialProof = (): SocialProofContextProps => {
  const context = useContext(SocialProofContext);
  if (!context) {
    throw new Error("useSocialProof must be used within a SocialProofProvider");
  }
  return context;
};
