"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Smile, User, Trash2 } from "lucide-react";
import type { Member } from "@/types";

interface MemberListItemProps {
  member: Member;
  onDelete?: (id: string) => void;
}

export function MemberListItem({ member, onDelete }: MemberListItemProps) {
  const isChild = member.role === "CHILD";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between py-2.5 border-b border-[#E5E7EB] last:border-b-0"
    >
      {/* 成员信息 */}
      <div className="flex items-center gap-2.5">
        {/* 头像 */}
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            isChild
              ? "bg-gradient-to-br from-[#FFF0E8] to-[#FFE8DC]"
              : "bg-gradient-to-br from-[#E8F0FE] to-[#F0F4FF]"
          )}
        >
          {isChild ? (
            <Smile className="w-[18px] h-[18px] text-[#FF6B35]" />
          ) : (
            <User className="w-[18px] h-[18px] text-[#5B7FFF]" />
          )}
        </div>

        {/* 用户名 */}
        <div className="text-sm text-[#1F2937]">
          {member.username}
          {member.isMe && (
            <span className="text-xs text-[#9CA3AF] ml-1">(你)</span>
          )}
        </div>
      </div>

      {/* 删除按钮 */}
      <button
        onClick={() => onDelete?.(member.id)}
        className={cn(
          "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs",
          "border border-[#E5E7EB] bg-white text-[#6B7280]",
          "transition-all duration-150 ease-out",
          "hover:border-[#EF4444] hover:text-[#EF4444]",
          member.isMe && "invisible"
        )}
      >
        <Trash2 className="w-3.5 h-3.5" />
        删除
      </button>
    </motion.div>
  );
}
