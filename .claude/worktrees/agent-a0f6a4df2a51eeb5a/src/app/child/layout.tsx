"use client";

import BottomNav from "@/components/shared/BottomNav";

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-nav" style={{ background: "var(--bg-gradient)" }}>
      {children}
      <BottomNav role="child" />
    </div>
  );
}
