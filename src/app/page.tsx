"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      {/* 标题 */}
      <h1 className="text-2xl font-bold text-text-primary mb-12 text-center">
        家庭积分兑换系统
      </h1>

      {/* 入口选择按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        {/* 我是家长按钮 */}
        <button
          onClick={() => router.push("/parent/login")}
          className="flex-1 py-6 px-8 rounded-button text-white text-lg font-medium btn-press transition-all duration-200 hover:shadow-lg active:scale-95"
          style={{ backgroundColor: "#5B7FFF" }}
        >
          我是家长
        </button>

        {/* 我是孩子按钮 */}
        <button
          onClick={() => router.push("/child/login")}
          className="flex-1 py-6 px-8 rounded-button text-white text-lg font-medium btn-press transition-all duration-200 hover:shadow-lg active:scale-95"
          style={{ backgroundColor: "#FF6B35" }}
        >
          我是孩子
        </button>
      </div>
    </div>
  );
}