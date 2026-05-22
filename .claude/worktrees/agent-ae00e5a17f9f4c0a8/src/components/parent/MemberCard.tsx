"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Smile, Star, User } from "lucide-react";
import { useLongPress } from "@/hooks/use-long-press";
import type { Member } from "@/types";

interface MemberCardProps {
  member: Member;
  onDelete?: (id: string) => void;
  showPoints?: boolean;
}

export function MemberCard({ member, onDelete, showPoints = false }: MemberCardProps) {
  const { handlers } = useLongPress({
    onLongPress: () => {
      if (onDelete && !member.isMe) {
        onDelete(member.id);
      }
    },
    delay: 500,
  });

  // 如果是自己或没有删除功能，不应用长按处理
  const shouldApplyLongPress = !member.isMe && onDelete;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      {...(shouldApplyLongPress ? handlers : {})}
      className={cn(
        "relative bg-card rounded-xl p-4 border shadow-card transition-all",
        member.isMe
          ? "border-primary/30 bg-gradient-to-br from-primary-light/5 to-primary/5"
          : "border-border hover:shadow-md active:scale-[0.98]"
      )}
    >
      {/* 头像 */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center mb-3",
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

      {/* 用户名 */}
      <div className="text-base font-semibold text-text mb-1">{member.username}</div>

      {/* 角色 */}
      <div className="text-sm text-text-secondary mb-2">
        {member.role === "CHILD" ? "孩子" : "家长"}
        {member.isMe && "（我）"}
      </div>

      {/* 积分（仅孩子显示） */}
      {showPoints && member.role === "CHILD" && (
        <div className="flex items-center gap-2 text-sm">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-primary font-semibold">{member.currentPoints} 积分</span>
        </div>
      )}
    </motion.div>
  );
}