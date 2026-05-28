"use client";

import { createContext, useContext, useState, ReactNode, ReactElement, useEffect } from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  // 当 pathname 变化时，自动清空 config（让页面重新设置）
  useEffect(() => {
    setConfig({});
  }, [pathname]);

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