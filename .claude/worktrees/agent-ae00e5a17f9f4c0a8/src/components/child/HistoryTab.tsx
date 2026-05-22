"use client";

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
          flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200
          ${
            activeTab === "completions"
              ? "bg-[#FF6B35] text-white shadow-[0_2px_8px_rgba(255,107,53,0.3)]"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }
        `}
      >
        任务历史
      </button>
      <button
        onClick={() => onTabChange("redemptions")}
        className={`
          flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200
          ${
            activeTab === "redemptions"
              ? "bg-[#4ECDC4] text-white shadow-[0_2px_8px_rgba(78,205,196,0.3)]"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }
        `}
      >
        礼物历史
      </button>
    </div>
  );
}
