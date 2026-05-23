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
      <div className="flex items-center gap-3">
        {/* 头像 */}
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
            member.role === "CHILD"
              ? "bg-gradient-to-br from-[#FFF0E8] to-[#FFE8DC]"
              : "bg-gradient-to-br from-[#E8F0FE] to-[#F0F4FF]"
          )}
        >
          {member.role === "CHILD" ? (
            <Smile className="w-5 h-5 text-orange-500" />
          ) : (
            <User className="w-5 h-5 text-blue-500" />
          )}
        </div>

        {/* 用户名 */}
        <div className="flex items-center gap-1.5">
          <span className="text-base font-medium text-text">{member.username}</span>
          {member.isMe && (
            <span className="text-xs text-primary">(你)</span>
          )}
        </div>
      </div>

      {/* 右侧：删除按钮 */}
      {onDelete && !member.isMe && (
        <button
          onClick={handleDelete}
          className="p-2 text-text-secondary hover:text-error transition-colors rounded-lg hover:bg-error/5"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}
