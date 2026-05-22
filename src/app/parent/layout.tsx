"use client";

import BottomNav from "@/components/shared/BottomNav";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 pb-[56px]" data-role="parent">
      {children}
      <BottomNav role="parent" />
    </div>
  );
}