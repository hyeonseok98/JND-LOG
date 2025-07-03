"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type SidebarContextType = {
  isOpened: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpened, setIsOpened] = useState(true);
  const toggle = () => setIsOpened((isOpened) => !isOpened);

  return <SidebarContext.Provider value={{ isOpened, toggle }}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Error! useSidebar must be within <SidebarProvider>");
  }
  return context;
}
