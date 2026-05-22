"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, User, ChevronLeft } from "lucide-react";
import { useChildHistory } from "@/hooks/use-child-history";
import HistoryTab from "@/components/child/HistoryTab";
import WeekHistory from "@/components/child/WeekHistory";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"completions" | "redemptions">("completions");
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([0])); // 默认展开本周
  const { completions, redemptions, isLoading, error } = useChildHistory(4);

  const toggleWeek = (index: number) => {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleLogout = async () => {
    // 清除会话并跳转到登录页
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 顶部导航 */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">个人中心</h1>
            <div className="w-9" />
          </div>
        </header>

        {/* 骨架屏 */}
        <div className="p-4 space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-white rounded-2xl" />
            <div className="h-12 bg-white rounded-2xl" />
            <div className="h-32 bg-white rounded-2xl" />
            <div className="h-32 bg-white rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 顶部导航 */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">个人中心</h1>
            <div className="w-9" />
          </div>
        </header>

        <div className="p-8 text-center text-gray-500">
          <p className="mb-2">加载失败，请刷新页面</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#FF6B35] text-white rounded-xl text-sm font-medium"
          >
            刷新
          </button>
        </div>
      </div>
    );
  }

  const weekData = activeTab === "completions" ? completions : redemptions;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">个人中心</h1>
          <div className="w-9" />
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 用户信息卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FF8A50] rounded-full flex items-center justify-center mb-3 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">小朋友</h2>
              <p className="text-sm text-gray-500 mt-1">继续保持哦！</p>
            </div>
          </div>
        </motion.div>

        {/* Tab 切换 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <HistoryTab activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.div>

        {/* 历史记录列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {weekData.length > 0 ? (
            weekData.map((week, index) => (
              <WeekHistory
                key={week.weekRange.start}
                weekData={week}
                type={activeTab}
                isExpanded={expandedWeeks.has(index)}
                onToggle={() => toggleWeek(index)}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100">
              <p className="text-sm">暂无历史记录</p>
            </div>
          )}
        </motion.div>

        {/* 退出登录按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-4 pb-8"
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-gray-200 rounded-2xl text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-800 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            退出登录
          </button>
        </motion.div>
      </div>
    </div>
  );
}
