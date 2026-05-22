"use client";

import BottomNav from "@/components/shared/BottomNav";

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-yellow-50 pb-[56px]" data-role="child">
      {children}
      <BottomNav role="child" />
    </div>
  );
}