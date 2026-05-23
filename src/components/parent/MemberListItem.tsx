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
  const handleDelete = () => {
    if (onDelete && !member.isMe) {
      onDelete(member.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between py-2.5 border-b border-border last:border-b-0"
    >
      {/* 左侧：头像和用户名 */}
      <div className="flex items-center gap-2.5">
        {/* 头像 - 32x32px 圆角矩形 */}
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
            member.role === "CHILD"
              ? "bg-gradient-to-br from-[#FFF0E8] to-[#FFE8DC]"
              : "bg-gradient-to-br from-[#E8F0FE] to-[#F0F4FF]"
          )}
        >
          {member.role === "CHILD" ? (
            <Smile className="w-[18px] h-[18px] stroke-[#FF6B35] fill-none" strokeWidth={1.5} />
          ) : (
            <User className="w-[18px] h-[18px] stroke-[#5B7FFF] fill-none" strokeWidth={1.5} />
          )}
        </div>

        {/* 用户名 */}
        <div className="flex items-center gap-1">
          <span className="text-sm text-text">{member.username}</span>
          {member.isMe && (
            <span className="text-xs text-muted">(你)</span>
          )}
        </div>
      </div>

      {/* 右侧：删除按钮 - primary 样式 */}
      {onDelete && !member.isMe && (
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-white font-medium bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] shadow-[0_2px_8px_rgba(91,127,255,0.15)] hover:shadow-[0_4px_12px_rgba(91,127,255,0.2)] hover:-translate-y-[0.5px] transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
          <span>删除</span>
        </button>
      )}
    </motion.div>
  );
}
