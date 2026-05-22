"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Smile, User, Star, Trash2 } from "lucide-react";
import type { Member } from "@/types";

interface MemberListItemProps {
  member: Member;
  onDelete?: (id: string) => void;
  showPoints?: boolean;
}

export function MemberListItem({ member, onDelete, showPoints = false }: MemberListItemProps) {
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
      className={cn(
        "flex items-center justify-between p-3 rounded-xl border transition-all",
        member.isMe
          ? "border-primary/30 bg-gradient-to-r from-primary-light/5 to-primary/5"
          : "border-border bg-card hover:border-primary/20"
      )}
    >
      {/* 左侧：头像和用户信息 */}
      <div className="flex items-center gap-3">
        {/* 头像 */}
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
            member.role === "CHILD"
              ? "bg-gradient-to-br from-primary-light/20 to-primary/10"
              : "bg-gradient-to-br from-secondary-light/20 to-secondary/10"
          )}
        >
          {member.role === "CHILD" ? (
            <Smile className="w-5 h-5 text-primary" />
          ) : (
            <User className="w-5 h-5 text-secondary" />
          )}
        </div>

        {/* 用户信息 */}
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-semibold text-text">{member.username}</span>
            {member.isMe && (
              <span className="text-xs text-primary">(我)</span>
            )}
          </div>
          <div className="text-sm text-text-secondary">
            {member.role === "CHILD" ? "孩子" : "家长"}
          </div>
        </div>
      </div>

      {/* 右侧：积分或删除按钮 */}
      <div className="flex items-center gap-2">
        {showPoints && member.role === "CHILD" && (
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-primary font-semibold">{member.currentPoints}</span>
          </div>
        )}

        {/* 删除按钮（非自己时显示） */}
        {onDelete && !member.isMe && (
          <button
            onClick={handleDelete}
            className="p-2 text-text-secondary hover:text-error transition-colors rounded-lg hover:bg-error/5"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
