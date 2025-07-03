"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type SidebarContextType = {
  opened: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const toggle = () => setOpened((isOpened) => !isOpened);

  return <SidebarContext.Provider value={{ opened, toggle }}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Error! useSidebar must be within <SidebarProvider>");
  }
  return context;
}
