"use client";

import BottomNav from "@/components/shared/BottomNav";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-nav" data-role="parent" style={{ background: "var(--bg-gradient)" }}>
      {children}
      <BottomNav role="parent" />
    </div>
  );
}
