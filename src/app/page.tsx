"use client";

import { useRouter } from "next/navigation";

// 浮动装饰元素组件
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 星星装饰 */}
      <div className="absolute top-[15%] left-[10%] animate-float-star">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L14.5 9H22L16 14L18 22L12 17.5L6 22L8 14L2 9H9.5L12 2Z"
            fill="#FFD93D"
            stroke="#FFD93D"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="absolute top-[25%] right-[15%] animate-float-star-delayed">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L14.5 9H22L16 14L18 22L12 17.5L6 22L8 14L2 9H9.5L12 2Z"
            fill="#FFE66D"
            stroke="#FFE66D"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="absolute bottom-[30%] left-[20%] animate-float-star-slow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L14.5 9H22L16 14L18 22L12 17.5L6 22L8 14L2 9H9.5L12 2Z"
            fill="#60A5FA"
            stroke="#60A5FA"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* 积分圆点装饰 */}
      <div className="absolute top-[40%] right-[8%] animate-float-dot">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8A50] opacity-60" />
      </div>
      <div className="absolute bottom-[20%] right-[25%] animate-float-dot-delayed">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#34D399] opacity-50" />
      </div>
      <div className="absolute top-[60%] left-[5%] animate-float-dot-slow">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5B7FFF] to-[#7B9FFF] opacity-40" />
      </div>

      {/* 小爱心 */}
      <div className="absolute top-[70%] right-[12%] animate-float-heart">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF6B6B" opacity="0.5">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );
};

// 家长角色卡片
const ParentCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer animate-card-enter-left"
    >
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-2">
        {/* 卡片背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F4FD] via-[#F0F7FF] to-[#F5F9FF] opacity-80" />

        {/* 卡片顶部装饰条 */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#5B7FFF] via-[#7B9FFF] to-[#9BBFFF]" />

        {/* 内容区域 */}
        <div className="relative px-8 py-10 flex flex-col items-center">
          {/* 角色图标 - 温馨的家长形象 */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#5B7FFF] rounded-full opacity-20 blur-xl animate-pulse-slow" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#5B7FFF] to-[#7B9FFF] flex items-center justify-center shadow-lg">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="white">
                {/* 家长头像 */}
                <circle cx="24" cy="18" r="8" fill="white" />
                {/* 家长身体 */}
                <path d="M12 44C12 34 18 28 24 28C30 28 36 34 36 44" fill="white" />
                {/* 心形装饰 */}
                <path d="M24 8C24 8 22 10 22 12C22 14 24 16 24 16C24 16 26 14 26 12C26 10 24 8 24 8Z" fill="#FFE66D" opacity="0.8" />
              </svg>
            </div>
            {/* 小星星装饰 */}
            <div className="absolute -top-2 -right-2 animate-spin-slow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD93D">
                <path d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z" />
              </svg>
            </div>
          </div>

          {/* 角色名称 */}
          <h3 className="text-2xl font-bold text-[#1F2937] mb-2 tracking-wide">
            我是家长
          </h3>

          {/* 角色描述 */}
          <p className="text-sm text-[#6B7280] text-center leading-relaxed max-w-[200px]">
            管理家庭任务，发放积分奖励，见证孩子的成长
          </p>

          {/* 功能标签 */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 rounded-full bg-[#5B7FFF]/10 text-[#5B7FFF] text-xs font-medium">
              任务管理
            </span>
            <span className="px-3 py-1 rounded-full bg-[#34D399]/10 text-[#34D399] text-xs font-medium">
              积分发放
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FFE66D]/10 text-[#FFE66D] text-xs font-medium">
              成长记录
            </span>
          </div>

          {/* 进入箭头 */}
          <div className="mt-8 flex items-center gap-2 text-[#5B7FFF] group-hover:gap-3 transition-all duration-300">
            <span className="text-sm font-medium">点击进入</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// 孩子角色卡片
const ChildCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer animate-card-enter-right"
    >
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-2">
        {/* 卡片背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF4E8] via-[#FFF8F0] to-[#FFFBE8] opacity-80" />

        {/* 卡片顶部装饰条 */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF6B35] via-[#FF8A50] to-[#FFB066]" />

        {/* 内容区域 */}
        <div className="relative px-8 py-10 flex flex-col items-center">
          {/* 角色图标 - 活泼的孩子形象 */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#FF6B35] rounded-full opacity-20 blur-xl animate-pulse-slow" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8A50] flex items-center justify-center shadow-lg">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="white">
                {/* 孩子头像 */}
                <circle cx="24" cy="20" r="7" fill="white" />
                {/* 孩子头发 */}
                <path d="M17 16C17 14 19 11 24 11C29 11 31 14 31 16C31 16 29 13 24 13C19 13 17 16 17 16Z" fill="white" />
                {/* 孩子身体 */}
                <path d="M14 44C14 36 18 30 24 30C30 30 34 36 34 44" fill="white" />
                {/* 开心的表情 */}
                <circle cx="21" cy="19" r="1.5" fill="#FF6B35" />
                <circle cx="27" cy="19" r="1.5" fill="#FF6B35" />
                <path d="M21 23 Q24 26 27 23" stroke="#FF6B35" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            {/* 小星星装饰 */}
            <div className="absolute -top-3 -left-3 animate-bounce-slow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#4ECDC4">
                <path d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z" />
              </svg>
            </div>
          </div>

          {/* 角色名称 */}
          <h3 className="text-2xl font-bold text-[#1F2937] mb-2 tracking-wide">
            我是孩子
          </h3>

          {/* 角色描述 */}
          <p className="text-sm text-[#6B7280] text-center leading-relaxed max-w-[200px]">
            完成日常任务，收集积分星星，兑换心爱的礼物
          </p>

          {/* 功能标签 */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-medium">
              完成任务
            </span>
            <span className="px-3 py-1 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] text-xs font-medium">
              积分兑换
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FFD93D]/10 text-[#FFD93D] text-xs font-medium">
              礼物心愿
            </span>
          </div>

          {/* 进入箭头 */}
          <div className="mt-8 flex items-center gap-2 text-[#FF6B35] group-hover:gap-3 transition-all duration-300">
            <span className="text-sm font-medium">点击进入</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 主背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-[#F0F4FF] to-[#E8F0FE]" />

      {/* 动态背景光效 */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#5B7FFF]/20 to-transparent rounded-full blur-3xl animate-bg-float" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#FF6B35]/15 to-transparent rounded-full blur-3xl animate-bg-float-delayed" />

      {/* 浮动装饰元素 */}
      <FloatingElements />

      {/* 主内容区 */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* 顶部 Logo 区域 */}
        <div className="animate-title-enter mb-8">
          <div className="flex items-center gap-3 mb-4">
            {/* Logo 图标 */}
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5B7FFF] to-[#7B9FFF] flex items-center justify-center shadow-lg">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="white">
                  {/* 家的图标 */}
                  <path d="M14 3L3 12V25H10V18H18V25H25V12L14 3Z" fill="white" />
                  {/* 爱心 */}
                  <circle cx="14" cy="13" r="4" fill="#FFE66D" />
                </svg>
              </div>
              {/* 光晕效果 */}
              <div className="absolute inset-0 rounded-2xl bg-[#5B7FFF] opacity-30 blur-md animate-pulse-slow" />
            </div>
          </div>
        </div>

        {/* 主标题 */}
        <div className="animate-title-enter text-center mb-3">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937] tracking-tight">
            家庭积分兑换
          </h1>
        </div>

        {/* 副标题 */}
        <div className="animate-subtitle-enter text-center mb-12">
          <p className="text-lg text-[#6B7280] max-w-md leading-relaxed">
            用积分激励成长，让日常任务变成快乐挑战
          </p>
          {/* 小装饰线 */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#5B7FFF] to-[#FF6B35]" />
            <div className="w-2 h-2 rounded-full bg-[#FFE66D]" />
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#5B7FFF]" />
          </div>
        </div>

        {/* 身份选择卡片 */}
        <div className="w-full max-w-3xl grid md:grid-cols-2 gap-6 md:gap-8">
          <ParentCard onClick={() => router.push("/parent/login")} />
          <ChildCard onClick={() => router.push("/child/login")} />
        </div>

        {/* 底部说明 */}
        <div className="animate-footer-enter mt-12 text-center">
          <p className="text-xs text-[#9CA3AF]">
            选择你的身份，开始温馨的家庭积分之旅
          </p>
          {/* 小装饰 */}
          <div className="mt-3 flex items-center justify-center gap-1">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="#5B7FFF" opacity="0.5">
              <circle cx="12" cy="12" r="12" />
            </svg>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="#FF6B35" opacity="0.5">
              <circle cx="12" cy="12" r="12" />
            </svg>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="#4ECDC4" opacity="0.5">
              <circle cx="12" cy="12" r="12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}