"use client";
import React, { createContext, ReactNode, useState } from "react";

type MenuContextType = {
  open: boolean;
  toggle: () => void;
};

export const MenuContext = createContext<MenuContextType>({
  open: false,
  toggle: () => {},
});

const MenuContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const contextValue: MenuContextType = {
    open,
    toggle,
  };

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};

export default MenuContextProvider;
