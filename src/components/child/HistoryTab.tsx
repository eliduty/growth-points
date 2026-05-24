"use client";

import { CheckCircle2, Gift } from "lucide-react";

interface HistoryTabProps {
  activeTab: "completions" | "redemptions";
  onTabChange: (tab: "completions" | "redemptions") => void;
}

export default function HistoryTab({ activeTab, onTabChange }: HistoryTabProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onTabChange("completions")}
        className={`
          flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 relative flex items-center justify-center gap-2
          ${
            activeTab === "completions"
              ? "bg-[#FF6B35] text-white shadow-[0_2px_8px_rgba(255,107,53,0.3)]"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }
        `}
      >
        <CheckCircle2 className="w-4 h-4" />
        任务历史
        {activeTab === "completions" && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-white rounded-full" />
        )}
      </button>
      <button
        onClick={() => onTabChange("redemptions")}
        className={`
          flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 relative flex items-center justify-center gap-2
          ${
            activeTab === "redemptions"
              ? "bg-[#4ECDC4] text-white shadow-[0_2px_8px_rgba(78,205,196,0.3)]"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }
        `}
      >
        <Gift className="w-4 h-4" />
        礼物历史
        {activeTab === "redemptions" && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-white rounded-full" />
        )}
      </button>
    </div>
  );
}
