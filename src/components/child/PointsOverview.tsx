"use client";

import { motion } from "framer-motion";

interface PointsOverviewProps {
  current: number;
  total: number;
  weekly: number;
}

export default function PointsOverview({ current, total, weekly }: PointsOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-[24px] px-7 py-8 mb-5 text-center text-white
        bg-gradient-to-br from-[#FF6B35] to-[#FF8A50]
        shadow-[0_8px_24px_rgba(255,107,53,0.25),0_4px_8px_rgba(255,107,53,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]"
    >
      {/* 旋转动画背景 */}
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          animation: 'spin 20s linear infinite',
        }}
      />

      {/* 装饰星星 */}
      <div className="absolute top-3 left-4 opacity-15">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>
      <div className="absolute bottom-3 right-4 opacity-15">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>

      {/* 当前积分标签 */}
      <p className="relative text-sm opacity-90 mb-2">当前积分</p>

      {/* 当前积分 */}
      <motion.p
        key={current}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3 }}
        className="relative text-[56px] font-bold leading-tight mb-5 drop-shadow-lg"
      >
        {current}
      </motion.p>

      {/* 累计和本周 */}
      <div className="relative flex justify-center gap-8 text-sm opacity-85">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
          </svg>
          累计 <span className="font-semibold">{total}</span>
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          本周 <span className="font-semibold">{weekly}</span>
        </span>
      </div>
    </motion.div>
  );
}
