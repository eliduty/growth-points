"use client";

import { createContext, useContext, useState, ReactNode, ReactElement } from "react";

interface TopNavbarConfig {
  title?: string;
  action?: ReactElement | null;
}

interface TopNavbarContextType {
  config: TopNavbarConfig;
  setConfig: (config: TopNavbarConfig) => void;
}

const TopNavbarContext = createContext<TopNavbarContextType | undefined>(undefined);

export function TopNavbarProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<TopNavbarConfig>({});

  return (
    <TopNavbarContext.Provider value={{ config, setConfig }}>
      {children}
    </TopNavbarContext.Provider>
  );
}

export function useTopNavbar() {
  const context = useContext(TopNavbarContext);
  if (context === undefined) {
    throw new Error("useTopNavbar must be used within a TopNavbarProvider");
  }
  return context;
}