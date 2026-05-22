"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/shared/BottomNav";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/parent/login";

  return (
    <div className="min-h-screen pb-nav" style={{ background: "var(--bg-gradient)" }}>
      {children}
      {!isLoginPage && <BottomNav role="parent" />}
    </div>
  );
}
