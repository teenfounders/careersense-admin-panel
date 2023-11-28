"use client";
import { fetchCompanyNames } from "@/lib/action";
import { ICompany } from "@/utils/types";
import { useDisclosure } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { ObjectId } from "mongoose";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface CompanyContextProps {
  selectedCompanyId: string | null;
  setSelectedCompanyId: React.Dispatch<React.SetStateAction<string | null>>;
  companyNames: ICompany[];
  fetchData: () => void;
  onClose: () => void;
}

const CompanyContext = createContext<CompanyContextProps | undefined>(
  undefined
);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null
  );
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [companyNames, setCompanyNames] = useState<ICompany[]>([]);

  const {
    data: companyNamess,
    isLoading,
    isError,
    refetch: companyname,
  } = useQuery({
    queryKey: ["companynames"],
    queryFn: fetchCompanyNames,
  });
  const fetchData = async () => {
    try {
      console.log("first requred");
      const data = await companyname();
      console.log(data);
      console.log(data.data.companies); // Call your data fetching function
      setCompanyNames(data.data.companies);
      onClose(); // Update the state with fetched companies
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Fetch companies when the component mounts
  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        selectedCompanyId,
        setSelectedCompanyId,
        companyNames,
        fetchData,

        onClose,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextProps => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};
